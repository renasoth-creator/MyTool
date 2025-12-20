import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const CookiePopup: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const deny = () => {
    localStorage.setItem("cookie-consent", "denied");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-50 max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden border border-orange-100">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-white text-2xl mt-1">🍪</div>
          <div>
            <h4 className="font-bold text-white text-lg">Cookie Consent</h4>
            <p className="text-orange-100 text-sm mt-1">
              We use cookies to enhance your experience and analyze traffic.
            </p>
          </div>
        </div>
        <button
          onClick={deny}
          className="text-white hover:bg-orange-700 p-1 rounded transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          By accepting cookies, you help us improve PDFConvert.tech and provide a better service.
          Your privacy is important to us.
        </p>
      </div>

      {/* Footer with buttons */}
      <div className="px-6 py-4 bg-gray-50 flex gap-3 border-t border-gray-100">
        <button
          onClick={deny}
          className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all text-sm"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-md transition-all text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
