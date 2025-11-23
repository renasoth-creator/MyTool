import React, { useState, useEffect } from "react";

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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-sm rounded-xl bg-white shadow-xl p-4 border border-slate-200">
      <h4 className="font-semibold text-slate-900">We use cookies</h4>
      <p className="text-sm text-slate-600 mt-1">
        We use cookies to improve your experience, analyze traffic, and show
        relevant ads. Choose whether to accept.
      </p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={accept}
          className="px-4 py-2 bg-sky-500 text-white rounded-md"
        >
          Accept
        </button>
        <button
          onClick={deny}
          className="px-4 py-2 border border-slate-300 rounded-md"
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
