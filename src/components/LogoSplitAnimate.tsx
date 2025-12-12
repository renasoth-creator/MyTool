// src/components/LogoSplitAnimate.tsx
import { useEffect, useState } from "react";

export default function LogoSplitAnimate() {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Trigger animation on component mount (page load/refresh)
    setAnimationKey(prev => prev + 1);
  }, []);

  return (
    <div key={animationKey} className="relative h-10 w-10">
      {/* Each piece contains part of the logo but starts overlapped so the logo looks whole */}

      {/* TOP LEFT */}
      <div className="logo-piece piece-tl">
        PDF
      </div>

      {/* TOP RIGHT */}
      <div className="logo-piece piece-tr">
        PDF
      </div>

      {/* BOTTOM LEFT */}
      <div className="logo-piece piece-bl">
        PDF
      </div>

      {/* BOTTOM RIGHT */}
      <div className="logo-piece piece-br">
        PDF
      </div>
    </div>
  );
}
