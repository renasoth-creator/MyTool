// src/components/OrbitGlow.tsx

export default function OrbitGlow() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">

      {/* Outer Circle — With Border */}
      <div
        className="absolute h-32 w-32 rounded-full border-4 border-[#ff7a1a] opacity-40 animate-blob"
      ></div>

      {/* Inner Circle — With Border */}
      <div
        className="absolute h-16 w-16 rounded-full border-2 border-[#ff7a1a] opacity-60 animate-blob delay-2000"
      ></div>
      <div className="absolute h-32 w-32 rounded-full border border-[#ff7a1a] shadow-[0_0_25px_8px_rgba(255,122,26,0.4)] animate-blob"></div>


    </div>
  );
}
