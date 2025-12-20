/**
 * PDF Editor Backend Router - CommonJS Version with AWS SDK v3
 * Copy this file to your Express.js backend as: routes/pdfEditor.js
 *
 * Installation:
 * npm install pdf-lib @aws-sdk/client-s3 multer
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Configure AWS S3 Client (v3)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// CORS configuration
const corsOptions = {
  origin: [
    'https://pdfconvert.tech',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

router.use(cors(corsOptions));
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb' }));

/**
 * POST /pdf-editor/upload
 * Upload PDF file and generate signed URL for frontend access
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(`Uploading file: ${req.file.originalname}`);

    // Read file from temporary storage
    const fileContent = fs.readFileSync(req.file.path);

    // Generate unique S3 key
    const timestamp = Date.now();
    const fileName = `${timestamp}_${req.file.originalname}`;
    const s3Key = `pdf-editor/uploads/${fileName}`;

    // Upload to S3 using SDK v3
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: 'application/pdf',
      ServerSideEncryption: 'AES256',
    });

    await s3Client.send(uploadCommand);
    console.log(`File uploaded to S3: ${s3Key}`);

    // Generate signed URL valid for 24 hours (86400 seconds)
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
    });

    const signedUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 86400 });

    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      url: signedUrl,
      key: s3Key,
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error('Upload error:', error);

    // Clean up temp file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /pdf-editor/save
 * Apply annotations to PDF and save to S3
 */
router.post('/save', async (req, res) => {
  const { pdfUrl, fileName, annotations } = req.body;

  try {
    if (!pdfUrl || !annotations) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Processing PDF with ${annotations.length} annotations`);

    // Download PDF from signed URL
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Load PDF with pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();

    // Apply annotations to each page
    for (const annotation of annotations) {
      if (annotation.page < 1 || annotation.page > pages.length) {
        console.warn(`Skipping annotation for invalid page: ${annotation.page}`);
        continue;
      }

      const page = pages[annotation.page - 1];
      const { width, height } = page.getSize();

      // Convert hex color to RGB
      const color = hexToRgb(annotation.color || '#000000');

      switch (annotation.type) {
        case 'text':
          if (annotation.content) {
            page.drawText(annotation.content, {
              x: annotation.x,
              y: height - annotation.y - 14, // Adjust for text height
              size: 14,
              color: rgb(color.r, color.g, color.b),
            });
          }
          break;

        case 'highlight':
          page.drawRectangle({
            x: annotation.x,
            y: height - annotation.y - (annotation.height || 30),
            width: annotation.width || 100,
            height: annotation.height || 30,
            borderColor: rgb(color.r, color.g, color.b),
            borderWidth: 1,
            opacity: 0.3,
          });
          break;

        case 'circle':
          const radius =
            Math.sqrt((annotation.width || 50) ** 2 + (annotation.height || 50) ** 2) / 2;
          page.drawEllipse({
            x: annotation.x,
            y: height - annotation.y,
            xScale: radius,
            yScale: radius,
            borderColor: rgb(color.r, color.g, color.b),
            borderWidth: 2,
          });
          break;

        case 'line':
          page.drawLine({
            start: { x: annotation.x, y: height - annotation.y },
            end: {
              x: annotation.width || annotation.x,
              y: height - (annotation.height || annotation.y),
            },
            thickness: 2,
            color: rgb(color.r, color.g, color.b),
          });
          break;

        case 'freehand':
          if (annotation.path && annotation.path.length > 1) {
            for (let i = 0; i < annotation.path.length - 1; i++) {
              page.drawLine({
                start: {
                  x: annotation.path[i].x,
                  y: height - annotation.path[i].y,
                },
                end: {
                  x: annotation.path[i + 1].x,
                  y: height - annotation.path[i + 1].y,
                },
                thickness: 2,
                color: rgb(color.r, color.g, color.b),
              });
            }
          }
          break;
      }
    }

    // Save edited PDF to buffer
    const editedPdfBytes = await pdfDoc.save();
    const editedPdfBuffer = Buffer.from(editedPdfBytes);

    // Upload edited PDF to S3 using SDK v3
    const timestamp = Date.now();
    const editedFileName = `edited_${timestamp}_${fileName || 'document.pdf'}`;
    const s3Key = `pdf-editor/edited/${editedFileName}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      Body: editedPdfBuffer,
      ContentType: 'application/pdf',
      ServerSideEncryption: 'AES256',
    });

    await s3Client.send(uploadCommand);
    console.log(`Edited PDF uploaded to S3: ${s3Key}`);

    // Generate signed download URL (valid for 1 hour)
    const getCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
    });

    const downloadUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });

    res.json({
      success: true,
      downloadUrl,
      key: s3Key,
      fileName: editedFileName,
    });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({
      error: 'Failed to save PDF',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Helper: Convert hex color string to RGB object
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255,
    };
  }
  return { r: 0, g: 0, b: 0 };
}

module.exports = router;

