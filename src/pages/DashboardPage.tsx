import React from "react";
import Layout from "../components/Layout";
import ToolCard from "../components/ToolCard";
import { tools } from "../config/pdfToolsConfig";


const DashboardPage: React.FC = () => {

     return (
      <Layout>

      {/* ================================
          HERO HEADER - Enhanced SEO
      ================================= */}
      <header className="text-center mb-16">
        <div className="inline-block mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
           Free PDF Tools - No Login Required
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          PDF Converter <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Tools</span> Suite
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Fast, secure, and 100% free. Convert, merge, compress, and transform your PDFs instantly. Files auto-delete after 24 hours.
        </p>

        {/* Trust Badges - Semantic structure */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2" title="256-bit SSL Encryption for secure file transfer">
            <span className="text-lg">●</span>
            <span>256-bit Encrypted</span>
          </div>
          <div className="flex items-center gap-2" title="Lightning-fast file processing on secure servers">
            <span className="text-lg">●</span>
            <span>Instant Processing</span>
          </div>
          <div className="flex items-center gap-2" title="Your files are never watermarked">
            <span className="text-lg">✓</span>
            <span>No Watermarks</span>
          </div>
        </div>

        {/* Additional Trust Information */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl mx-auto">
          <p className="text-sm text-blue-900">
            <strong>Privacy Guaranteed:</strong> Your files are never stored permanently on our servers. All uploaded documents are automatically and permanently deleted within 24 hours. No data tracking. No personal information collected.
          </p>
        </div>

        {/* Donate Section */}
        <div className="mt-8 p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-300 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-3xl flex-shrink-0">❤️</div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-amber-900 text-lg mb-2">Support Our Project</h3>
              <p className="text-amber-800 text-sm mb-4">
                Love PDFConvert.tech? Consider supporting our work to help us improve and add new features.
              </p>
              <button
                onClick={() => window.open('https://paypal.me/renas93', '_blank')}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm"
              >
                Donate via PayPal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================================
          TOOLS GRID - SEO Optimized
      ================================= */}
      <section className="mt-10" id="tools-grid">
        <h2 className="sr-only">Popular PDF Conversion Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          
         </div>

      </section>



      {/*================================
            HOW IT WORKS - Semantic Section
        =================================*/}
<section className="mt-20 w-full" aria-labelledby="how-it-works">
  <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 p-12 shadow-md border border-orange-100">

    <h2 id="how-it-works" className="text-4xl font-bold text-slate-900 text-center mb-4">
      How It Works
    </h2>
    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
      Get your files converted in just three simple steps. Fast, secure, and hassle-free.
    </p>

    <div className="grid gap-8 md:grid-cols-3" role="region" aria-label="Three step process">

      {/* Step 1 */}
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg" aria-label="Step 1">
          1
        </div>
        <div className="pt-4">
          <div className="text-5xl mb-4 font-bold">1</div>
          <h3 className="font-bold text-slate-900 text-lg mb-3">Upload Your File</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Choose a PDF, Office file, or image directly from your device. Supports all common formats.
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center" aria-hidden="true">
        <div className="text-3xl text-orange-400">→</div>
      </div>

      {/* Step 2 */}
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg" aria-label="Step 2">
          2
        </div>
        <div className="pt-4">
          <div className="text-5xl mb-4 font-bold">2</div>
          <h3 className="font-bold text-slate-900 text-lg mb-3">Instant Processing</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our secure servers process your file instantly with military-grade encryption.
          </p>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center" aria-hidden="true">
        <div className="text-3xl text-orange-400">→</div>
      </div>

      {/* Step 3 */}
      <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-orange-100 hover:shadow-lg transition-all duration-300">
        <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg" aria-label="Step 3">
          3
        </div>
        <div className="pt-4">
          <div className="text-5xl mb-4 font-bold">3</div>
          <h3 className="font-bold text-slate-900 text-lg mb-3">Download & Done</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your finished file is ready instantly. No signup required, no watermarks.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ================================
    FEATURES SECTION - SEO Optimized
================================= */}
<section className="mt-20 w-full" aria-labelledby="features-heading">
  <div className="space-y-8">

    {/* Features Grid */}
    <div>
      <h2 id="features-heading" className="text-4xl font-bold text-slate-900 mb-12 text-center">
        Why Choose PDFConvert.tech?
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Key features and benefits">

        {/* Feature 1 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">■</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">Encrypted & Secure</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Industry-standard 256-bit SSL encryption protects all data transfers between your device and our servers. Files are never stored permanently on our systems and are automatically deleted within 24 hours. Your privacy and security are our top priorities. We do not track user behavior or collect personal information.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">▶</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">Lightning Fast</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Most file conversions complete in just seconds. Our optimized servers are distributed globally to minimize processing time regardless of your location. Whether you're converting a single page or a 100-page document, our advanced algorithms handle the task instantly. Process multiple files simultaneously without any slowdown.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">◆</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">Works Everywhere</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Access PDFConvert.tech from any device - Windows, macOS, Linux, iPhone, or Android. No software installation required. Works on any modern web browser without plugins or extensions. Use it at home, at work, or on the go. Mobile-optimized interface ensures excellent experience on all screen sizes.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-2xl p-6 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
          <div className="text-4xl mb-4">●</div>
          <h3 className="font-bold text-slate-900 text-lg mb-2">100% Free</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            No watermarks added to converted files. No hidden fees or premium subscriptions. No account creation required. Completely free to use with unlimited conversions. We support the service through non-intrusive advertising, not by charging users for basic functionality.
          </p>
        </div>

      </div>
    </div>

    {/* WHAT MAKES US DIFFERENT SECTION */}
    <section className="mt-20 w-full" aria-labelledby="difference-heading">
      <div className="max-w-4xl mx-auto px-6">
        <h2 id="difference-heading" className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Why Choose PDFConvert.tech
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">True Zero-Cost Platform</h3>
                <p className="text-gray-600 text-sm">
                  Unlike other services, we never charge for conversions, never require subscriptions, and never add watermarks to your documents. Completely free with no restrictions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Automatic Data Deletion</h3>
                <p className="text-gray-600 text-sm">
                  Your files are permanently deleted from our servers within 24 hours automatically. We never store your documents long-term or sell user data to third parties.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">No Registration Required</h3>
                <p className="text-gray-600 text-sm">
                  Start converting immediately without creating an account, providing email, or entering personal information. Complete anonymity if desired.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Unlimited Conversions</h3>
                <p className="text-gray-600 text-sm">
                  Convert as many files as you want, as often as you want. No daily limits, no file size restrictions (on most tools), and no rate limiting.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Professional Quality Output</h3>
                <p className="text-gray-600 text-sm">
                  Our conversion algorithms maintain document quality, formatting, images, and layouts exactly as they appear in the original files.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">6</div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Constantly Updated</h3>
                <p className="text-gray-600 text-sm">
                  We regularly add new tools, improve existing features, and enhance our platform based on user feedback and technology advances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Popular Tools Section */}
    <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white shadow-lg">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Popular Tools
        </h2>
        <p className="text-orange-100 mb-8">
          PDFConvert.tech provides the most comprehensive PDF tools suite. Choose from 20+ tools to transform your documents instantly.
        </p>

        <div className="grid gap-4 md:grid-cols-2" role="region" aria-label="Tool categories">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-1" aria-hidden="true">✨</span>
            <div>
              <h3 className="font-semibold mb-1">Merge & Split</h3>
              <p className="text-sm text-orange-100">Combine multiple PDFs or extract specific pages</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1">⇄</span>
            <div>
              <h3 className="font-semibold mb-1">Convert Formats</h3>
              <p className="text-sm text-orange-100">PDF ↔ Word, Excel, PowerPoint, HTML, Images</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1">◆</span>
            <div>
              <h3 className="font-semibold mb-1">Compress & Optimize</h3>
              <p className="text-sm text-orange-100">Reduce file size while maintaining quality</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1">□</span>
            <div>
              <h3 className="font-semibold mb-1">Extract & Text</h3>
              <p className="text-sm text-orange-100">Extract text, images, and metadata from PDFs</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1">●</span>
            <div>
              <h3 className="font-semibold mb-1">Security</h3>
              <p className="text-sm text-orange-100">Password protect, watermark, and remove pages</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl mt-1">■</span>
            <div>
              <h3 className="font-semibold mb-1">Advanced OCR</h3>
              <p className="text-sm text-orange-100">Recognize text from scanned PDFs</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-orange-400 text-center">
          <p className="text-lg font-semibold">
            Start converting your files now absolutely free
          </p>
        </div>
      </div>
    </div>

  </div>
      </section>

      {/* UPDATED DATE SECTION */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          Last updated: December 15, 2025
        </p>
      </div>

    </Layout>
  );
};

export default DashboardPage;

