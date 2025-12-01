// src/components/LogoSplitAnimate.tsx

export default function LogoSplitAnimate() {
  return (
    <div className="relative h-10 w-10">
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
