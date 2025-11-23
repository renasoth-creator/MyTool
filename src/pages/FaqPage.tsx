import React from "react";
import Layout from "../components/Layout";

const FaqPage: React.FC = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is PDFConvert.tech free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PDFConvert.tech offers free tools to merge, compress, split, convert and protect PDF files. Some ads may be displayed to support the service."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files stored permanently?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Files are processed only for the duration of the conversion and are automatically removed after a short period."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install any software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation is required. PDFConvert.tech runs entirely in your browser and on our servers."
        }
      },
      {
        "@type": "Question",
        "name": "Can I merge multiple PDFs into one?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Use the Merge PDF tool to combine multiple PDF files into a single document."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use HTTPS encryption and automatic file deletion to help keep your data secure. However, you should avoid uploading highly sensitive information to any online service."
        }
      }
    ]
  };

  return (
    <Layout>
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Is PDFConvert.tech free to use?
            </h2>
            <p className="mt-1">
              Yes, all core tools are free to use. We may show ads to support
              the service and keep it free for everyone.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Are my files stored permanently?
            </h2>
            <p className="mt-1">
              No. Files are processed only to perform the requested operation
              and are automatically removed after a short period.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Do I need to install any software?
            </h2>
            <p className="mt-1">
              No installation is required. You can use all tools directly in
              your browser on desktop or mobile.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Which file types are supported?
            </h2>
            <p className="mt-1">
              We support PDF, JPG/PNG/WebP images and common Office formats
              including DOCX, XLSX, PPTX and HTML.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Is my data secure?
            </h2>
            <p className="mt-1">
              We use HTTPS encryption and automatic cleanup to help protect your
              data. However, as with any online service, avoid uploading highly
              confidential or sensitive documents.
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD for Google FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Layout>
  );
};

export default FaqPage;
