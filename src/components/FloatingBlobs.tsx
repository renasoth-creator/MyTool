export default function FloatingBlobs() {
  return (
    <div className="relative w-40 h-40 pointer-events-none select-none">
      {/* Blob 1 */}
      <div
        className="
          absolute inset-0 rounded-full 
          bg-gradient-to-br from-orange-400 to-red-500
          opacity-40 blur-2xl
          animate-blob 
        "
      />

      {/* Blob 2 */}
      <div
        className="
          absolute inset-0 rounded-full 
          bg-gradient-to-br from-yellow-400 to-orange-500
          opacity-30 blur-2xl
          animate-blob animation-delay-2000
        "
      />

      {/* Blob 3 */}
      <div
        className="
          absolute inset-0 rounded-full 
          bg-gradient-to-br from-red-400 to-orange-400
          opacity-30 blur-2xl
          animate-blob animation-delay-4000
        "
      />
    </div>
  );
}
