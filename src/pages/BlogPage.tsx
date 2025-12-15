import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const blogPosts = [
    {
      id: 1,
      category: "tutorial",
      title: "How to Merge Multiple PDF Files into One",
      excerpt: "Combining PDFs has never been easier. No software needed, no technical skills required—just upload, arrange, and download.",
      content: "Managing multiple PDF files can get messy fast. Whether you're dealing with monthly reports, scanned documents, or project files spread across different folders, merging them into a single file makes everything much more organized and easier to share.\n\nThe good news is that you don't need expensive software like Adobe Acrobat to do this. With PDFConvert.tech's Merge PDF tool, you can combine as many PDFs as you want in just a few clicks. The process is straightforward: upload your files, arrange them in the order you prefer, and download your merged document. It takes seconds and works on any device—Windows, Mac, Linux, even your smartphone.\n\nThis is especially useful if you're a student organizing lecture notes, a professional compiling reports, or anyone who regularly works with multiple document files. Save time, reduce clutter, and keep everything in one place.",

      date: "December 2025"
    },
    {
      id: 2,
      category: "guide",
      title: "Compress PDFs Without Losing Quality",
      excerpt: "Large PDF files slow down email and uploads. Learn how to shrink file sizes while keeping your documents clear and readable.",
      content: "We've all been there—trying to email a PDF only to hit a file size limit, or waiting forever for a file to upload. Large PDFs waste storage space, slow down your internet, and frustrate both you and the people you're sharing files with.\n\nCompressing a PDF sounds technical, but it's actually simple. PDFConvert.tech's Compress PDF tool does the heavy lifting for you. It intelligently reduces file size by optimizing images and removing unnecessary data, all while keeping your document readable and professional-looking. You get to choose the compression level, so you control the balance between file size and quality.\n\nAfter compression, your PDFs are faster to email, easier to store, and better for sharing on websites or cloud services. It's one of those simple tricks that saves time and headaches every single day.",

      date: "December 2025"
    },
    {
      id: 3,
      category: "tutorial",
      title: "Convert Multiple Images Into a Single PDF",
      excerpt: "Got a stack of photos or scanned pages? Turn them into a professional PDF in minutes without any special skills.",
      content: "Imagine you've scanned a stack of paper documents with your phone, or you have a collection of screenshots you need to organize. Individually, they're just images scattered around. But together as a PDF, they become something useful—a document you can share, archive, or print.\n\nThe Image to PDF tool makes this transformation simple. Just upload your images (JPG, PNG, WebP—whatever you have), drag them to arrange the order you want, and convert. Within seconds, you have a professional-looking PDF that combines all your images into one neat file.\n\nThis works great for creating digital copies of handwritten notes, building a photo album, organizing receipts, or converting design mockups into shareable documents. It's the kind of tool that solves a common problem in the simplest way possible.",

      date: "December 2025"
    },
    {
      id: 4,
      category: "guide",
      title: "Convert Office Documents to PDF Perfectly",
      excerpt: "Word, Excel, PowerPoint—convert them all to PDF while keeping your formatting exactly as it should be.",
      content: "Word documents, spreadsheets, and presentations are great for working and editing. But when it's time to share, email, or finalize something, PDF is the universal standard. It preserves your formatting perfectly across every device, prevents accidental changes, and looks professional.\n\nThe challenge used to be that converting these formats required special software and technical know-how. Not anymore. With PDFConvert.tech, you can convert DOCX, XLSX, PPTX, and even HTML files into flawless PDFs directly in your browser.\n\nUpload your file, wait a moment for processing, and download a perfectly formatted PDF. Your resume stays formatted. Your spreadsheet looks right. Your presentation slides appear exactly as intended. It's reliability without the complexity, which is exactly what you need when sharing important documents.",

      date: "December 2025"
    },
    {
      id: 5,
      category: "tutorial",
      title: "Extract Text From PDF Files Easily",
      excerpt: "Need the text from a PDF? Pull it out and use it anywhere—no retyping, no hassle.",
      content: "Sometimes you have a PDF but you really need the text inside it. Maybe you want to edit it, translate it, reuse it in a presentation, or include it in a new document. Manually retyping everything is tedious and error-prone.\n\nThat's where the PDF to Text tool comes in. It reads your PDF and extracts all the text, giving you clean, plain text you can copy anywhere you need it. Paste it into Word, Google Docs, emails, or any other application. It saves hours of manual work, especially with long documents.\n\nThis is invaluable for researchers pulling quotes from papers, content creators repurposing material, or anyone who needs to work with PDF text in a different format. It's quick, accurate, and removes the tedium from document processing.",

      date: "December 2025"
    },
    {
      id: 6,
      category: "tutorial",
      title: "Split Large PDFs Into Smaller Files",
      excerpt: "Extract exactly the pages you need from a large PDF—no more sharing or storing unnecessary documents.",
      content: "Large PDFs can be unwieldy. You might only need a few pages from a 100-page document, or you want to separate different sections into individual files. Manually doing this is tedious and time-consuming.\n\nThe Split PDF tool solves this instantly. Upload your document and choose which pages you want to extract. You can take a single page, a range of pages, or specific pages scattered throughout the document. The tool creates separate PDFs for each section you want, letting you keep what matters and discard the rest.\n\nThis is perfect when you're sharing documents with others (send only the relevant pages), organizing your files (separate projects into different documents), or cleaning up your library (remove unnecessary pages). It's a simple tool that saves real time and keeps your files lean and focused.",
      date: "December 2025"
    },
    {
      id: 7,
      category: "security",
      title: "Protect Your PDFs With Password Encryption",
      excerpt: "Keep sensitive documents safe by adding password protection—only people with the password can open your files.",
      content: "Sharing PDFs online means taking security seriously. Not every file should be accessible to everyone. Contracts, financial documents, personal information, and confidential data need protection.\n\nPassword-protecting a PDF is one of the simplest and most effective security measures you can take. With PDFConvert.tech's Protect PDF tool, you add a password that recipients must enter to open your file. It's like putting a lock on your document—easy to implement, but effective at preventing unauthorized access.\n\nThe encryption is enterprise-grade, using the same standards trusted by banks and large organizations. You can share the file freely, knowing that only people you give the password to can actually open it. It's peace of mind in an easy-to-use tool.",
      date: "December 2025"
    },
    {
      id: 8,
      category: "guide",
      title: "Smart PDF Management for Students and Teachers",
      excerpt: "Organize, compress, and manage the PDFs that pile up during school with these practical strategies.",
      content: "Students and teachers deal with an overwhelming number of PDFs. Lecture notes, reading assignments, exam papers, research articles, study guides—they accumulate quickly and become hard to manage.\n\nThe key is using the right tools to stay organized. PDFConvert.tech helps you tackle the PDF chaos. Merge related notes into single files for each class. Compress bulky research papers so they don't eat up your storage. Convert documents to different formats when needed for compatibility. With these tools, what used to be a scattered mess becomes organized and manageable.\n\nMoreover, it saves time and frustration when working with classmates or submitting assignments. Everyone benefits from clean, organized, properly formatted PDFs. Small workflows improvements add up over a semester.",
      date: "December 2025"
    },
    {
      id: 9,
      category: "guide",
      title: "Email and Upload PDFs Like a Pro",
      excerpt: "Avoid upload errors and email rejections by optimizing your PDFs before sharing.",
      content: "You've experienced it before—trying to email a PDF only to get an error message saying the file is too large. Or uploading to a website that won't accept your file format. It's frustrating and wastes time.\n\nThe solution is preparing your PDFs properly before sharing. The most important step is compression. Large files struggle with email limitations and upload servers. By compressing your PDF first, you dramatically improve your chances of successful delivery.\n\nTake a few seconds to verify the file looks good after compression (it should), then send or upload with confidence. This simple habit eliminates errors, saves bandwidth, and ensures your documents arrive safely where they need to go. It's the kind of small habit that prevents big frustrations.",
      date: "December 2025"
    },
    {
      id: 10,
      category: "security",
      title: "Is Online PDF Conversion Safe? What You Should Know",
      excerpt: "Understand the security considerations of online PDF tools and when it's safe to use them.",
      content: "Before uploading anything to the internet, it's natural to wonder about security. Is my data safe? Will my files be stored somewhere? Can I trust this service?\n\nThese are good questions. PDFConvert.tech takes security seriously. All data transfers use industry-standard HTTPS encryption—the same technology that protects your bank account. Files are automatically deleted after 24 hours and never stored permanently. We don't analyze your content or share your files with anyone.\n\nThat said, use common sense. Don't upload documents containing passwords, government ID numbers, or extremely sensitive information to any online service. For everyday files—resumes, reports, notes, presentations, class work—online PDF tools are safe, convenient, and save you from installing expensive software.\n\nThe bottom line: PDFConvert.tech is designed to be trustworthy for normal document work. Use it without worry for the files you'd feel comfortable emailing to a colleague.",
      date: "December 2025"
    }
  ];

  const categories = [
    { id: "all", label: "All Articles", count: blogPosts.length },
    { id: "tutorial", label: "Tutorials", count: blogPosts.filter(p => p.category === "tutorial").length },
    { id: "guide", label: "Guides", count: blogPosts.filter(p => p.category === "guide").length },
    { id: "security", label: "Security", count: blogPosts.filter(p => p.category === "security").length }
  ];

  const filteredPosts = selectedCategory === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout>
      <Helmet>
        <title>Blog - PDF Tips & Guides | PDFConvert.tech</title>
        <meta name="description" content="Learn tips, guides, and best practices for working with PDFs. Read our comprehensive blog about PDF conversion and management." />
      </Helmet>

      {/* ================================
          HERO HEADER - Professional
      ================================= */}
      <header className="text-center mb-12">
        <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
          Knowledge Base
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Resources</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Expert tips, comprehensive guides, and best practices for managing and converting PDF documents effectively.
        </p>
      </header>

      {/* ================================
          CATEGORY FILTER
      ================================= */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "bg-white border-2 border-orange-200 text-slate-900 hover:border-orange-500"
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ================================
          BLOG POSTS GRID
      ================================= */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl border border-orange-100 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 group"
          >
            {/* Header with Category */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-orange-200 text-orange-700 text-xs font-bold rounded-full">
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </span>
                <span className="text-xs text-gray-500 font-medium">{post.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-xs text-gray-500">

              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ================================
          FEATURED SECTION
      ================================= */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Resources</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Getting Started</h3>
            <p className="text-gray-700 text-sm mb-4">Learn the basics of PDF conversion and management with our beginner-friendly guides.</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Security Best Practices</h3>
            <p className="text-gray-700 text-sm mb-4">Understand how to protect your sensitive documents with password protection and encryption.</p>
            <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-block">
              Learn More
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3">FAQ & Support</h3>
            <p className="text-gray-700 text-sm mb-4">Find answers to common questions and get support from our dedicated team.</p>
            <Link to="/faq" className="text-orange-600 hover:text-orange-700 font-semibold text-sm inline-block">
              View FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* ================================
          NEWSLETTER SECTION
      ================================= */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-orange-100 mb-8">Subscribe to our blog for new articles, tips, and updates about PDF tools and best practices.</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <button className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ================================
          CONTACT CTA
      ================================= */}
      <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Have Questions?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is ready to help with any questions about PDF conversion and management.
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all"
        >
          Get in Touch
        </Link>
      </div>
    </Layout>
  );
};

export default BlogPage;

