import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

const FaqPage: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is PDFConvert.tech free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, PDFConvert.tech offers free tools to merge, compress, split, convert and protect PDF files. No hidden charges or premium subscriptions required."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files stored permanently?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Files are processed only for the duration of the conversion and are automatically removed from our servers after 24 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install any software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation is required. PDFConvert.tech runs entirely in your browser and on our secure servers. Works on any device."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support PDF, JPG, PNG, WebP images, and Office formats including DOCX, XLSX, PPTX, and HTML files."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use 256-bit SSL encryption for all transfers and automatically delete files after 24 hours. Your privacy is our priority."
        }
      },
      {
        "@type": "Question",
        "name": "Can I process multiple files at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Tools like Merge PDF, Image to PDF, and others support processing multiple files in a single operation."
        }
      },
      {
        "@type": "Question",
        "name": "Are there file size limits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support files up to 100MB for most tools. Larger files may be processed depending on your internet connection."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer API access?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We're currently exploring API options for businesses. Contact us at contact@pdfconvert.tech for partnership inquiries."
        }
      }
    ]
  };

  const faqs = [
    {
      question: "Is PDFConvert.tech free to use?",
      answer: "Yes, PDFConvert.tech is completely free. All tools are accessible without any signup requirements, hidden charges, or premium subscriptions. We may display ads to support the service and keep it free for everyone worldwide."
    },
    {
      question: "Are my files stored permanently?",
      answer: "No. Your files are processed only for the duration of the conversion operation and are automatically deleted from our servers after 24 hours. We do not store, analyze, or use your files for any other purpose."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation is required. PDFConvert.tech runs entirely in your web browser, making it accessible on any device with internet access—desktop, tablet, or smartphone. No downloads or installations needed."
    },
    {
      question: "What file formats are supported?",
      answer: "We support a wide range of formats including PDF, JPG, PNG, WebP images, and Office formats such as DOCX, XLSX, PPTX, and HTML. Check individual tool pages for specific format support."
    },
    {
      question: "Is my data secure?",
      answer: "Your security is our priority. We use 256-bit SSL encryption for all data transfers, automatically delete files after 24 hours, and never share your files with third parties. However, avoid uploading highly sensitive documents to any online service."
    },
    {
      question: "Can I process multiple files at once?",
      answer: "Yes. Many tools support batch processing. The Merge PDF tool allows combining multiple files, Image to PDF supports multiple images, and other tools can handle batch operations for increased efficiency."
    },
    {
      question: "Are there file size limits?",
      answer: "Most tools support files up to 100MB. Larger files may be processed depending on your internet connection and server capacity. For very large files, consider splitting them first before processing."
    },
    {
      question: "Do you offer API access?",
      answer: "We're currently exploring API options for businesses and developers. If you're interested in API integration or partnership opportunities, please contact us at contact@pdfconvert.tech."
    },
    {
      question: "How long does conversion take?",
      answer: "Most conversions complete within seconds to a few minutes, depending on file size and complexity. Large files may take longer. You'll see real-time progress updates during processing."
    },
    {
      question: "Can I use PDFConvert.tech offline?",
      answer: "No, PDFConvert.tech requires an internet connection as files are processed on our secure servers. This ensures maximum compatibility and security for your conversions."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | PDFConvert.tech</title>
        <meta name="description" content="Find answers to common questions about PDFConvert.tech, our tools, security, and file processing." />
      </Helmet>

      {/* ================================
          HERO HEADER - Enhanced
      ================================= */}
      <header className="text-center mb-12">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-orange-600 hover:text-orange-700 font-semibold mb-4 inline-block">
          ← Back to Home
        </Link>

        <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
          Common Questions
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Questions</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Find answers to common questions about PDFConvert.tech, our tools, security, and how we protect your files.
        </p>
      </header>

      {/* ================================
          FAQ ACCORDION SECTION
      ================================= */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-orange-50/50 transition-colors"
              >
                <h3 className="text-lg font-bold text-slate-900 flex-1">
                  {faq.question}
                </h3>
                <span
                  className={`flex-shrink-0 ml-4 text-2xl text-orange-500 transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {expandedIndex === index && (
                <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-orange-100">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================================
          INFORMATION CARDS SECTION
      ================================= */}
      <div className="space-y-8 mt-16">
        {/* General Information */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">General Information</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-slate-900 mb-3">Supported Tools</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We offer 20+ tools for PDF manipulation including merge, split, compress, convert, extract, watermark, and more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-slate-900 mb-3">Availability</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                PDFConvert.tech is available 24/7. Our service is designed to be reliable, fast, and always accessible to you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold text-slate-900 mb-3">Browser Compatibility</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. No special plugins required.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100">
              <h3 className="font-bold text-slate-900 mb-3">Processing Speed</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Most operations complete in seconds. File size and complexity may affect processing time. Real-time progress shown.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Security & Privacy</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-bold text-slate-900 mb-3">Encryption</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All data transfers use 256-bit SSL encryption, the same level used by banks for secure transactions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-bold text-slate-900 mb-3">Auto-Deletion</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All files are automatically deleted after 24 hours. We don't store or archive your personal files.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
              <h3 className="font-bold text-slate-900 mb-3">Privacy Policy</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Read our comprehensive <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-semibold">Privacy Policy</Link> for complete details.
              </p>
            </div>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              If you couldn't find the answer to your question, please don't hesitate to reach out to our support team. We're here to help.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-orange-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Related Pages</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Link to="/privacy" className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl p-6 transition-all border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-2">Privacy Policy</h3>
              <p className="text-sm text-gray-600">Learn how we protect your personal data and privacy</p>
            </Link>

            <Link to="/terms" className="bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl p-6 transition-all border border-purple-100">
              <h3 className="font-semibold text-slate-900 mb-2">Terms of Service</h3>
              <p className="text-sm text-gray-600">Review our terms and conditions for using the service</p>
            </Link>

            <Link to="/contact" className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl p-6 transition-all border border-green-100">
              <h3 className="font-semibold text-slate-900 mb-2">Contact Us</h3>
              <p className="text-sm text-gray-600">Get in touch with our support team for assistance</p>
            </Link>
          </div>
        </div>
      </div>

      {/* JSON-LD for Google FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Layout>
  );
};

export default FaqPage;

