// src/components/OrbitCircles.tsx
export default function OrbitCircles() {
  return (
    <div className="relative w-28 h-28">
      <div className="absolute inset-0 rounded-full border-2 border-orange-900/40 animate-ping" />
      <div className="absolute inset-2 rounded-full border border-orange-300/30 animate-spin-slow" />
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-400/20 blur-xl" />
    </div>
  );
}
