// GlassCard.jsx
export default function GlassCard({ children }) {
  return (
    <div
      className="
        fixed 
        bottom-6 left-1/2 transform -translate-x-1/2
        w-80 h-48
        bg-white/10
        backdrop-blur-lg
        rounded-2xl
        border border-white/20
        shadow-lg
        p-4
        text-white
      "
    >
      {children}
    </div>
  );
}
