export default function OrbitGlow() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">

      {/* OUTER ORBIT — change SIZE, BORDER, COLOR, OPACITY */}
      <div
        className="
          absolute
          h-32 w-32             /* ← CHANGE SIZE */
          rounded-full
          border-4              /* ← OUTER BORDER THICKNESS */
          border-[#ff7a1a]      /* ← BORDER COLOR */
          opacity-40            /* ← VISIBILITY / FADE */
          animate-blob          /* ← ANIMATION */
        "
      ></div>

      {/* INNER ORBIT — smaller ring */}
      <div
        className="
          absolute
          h-16 w-16             /* ← CHANGE SIZE */
          rounded-full
          border-2              /* ← BORDER THICKNESS */
          border-[#ff7a1a]      /* ← COLOR */
          opacity-60            /* ← VISIBILITY */
          animate-blob
          delay-2000            /* ← START LATER */
        "
      ></div>

      {/* GLOW ORBIT — powerful glowing ring */}
      <div
        className="
          absolute
          h-32 w-32               /* ← glow size */
          rounded-full
          border                  /* ← thin border */
          border-[#ff7a1a]
          shadow-[0_0_25px_8px_rgba(255,122,26,0.4)] /* ← CHANGE GLOW */
          animate-blob
        "
      ></div>

    </div>
  );
}
