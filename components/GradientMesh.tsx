export function GradientMesh() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary orb — indigo */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: -280,
          left: -180,
          background: "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
          opacity: 0.14,
          filter: "blur(80px)",
          animation: "drift1 32s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Secondary orb — violet */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: 80,
          right: -120,
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          opacity: 0.09,
          filter: "blur(80px)",
          animation: "drift2 38s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Tertiary orb — sky accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          bottom: -80,
          left: "35%",
          background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
          opacity: 0.06,
          filter: "blur(80px)",
          animation: "drift3 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}
