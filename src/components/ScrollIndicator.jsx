const ScrollIndicator = () => {
  const text = "SCROLL";

  return (
    <div className="relative flex items-center select-none group">
      {/* THE MOVING UNIT */}
      <div className="flex items-center gap-6 animate-group-glide-right">
        {/* CHROMATIC WRAPPER FOR SHAPES + TEXT */}
        <div className="relative flex items-center gap-6">
          {/* 1. THE RED GHOST (Left Shift) */}
          <div className="absolute inset-0 flex items-center gap-6 pointer-events-none opacity-60 mix-blend-screen text-red-600 translate-x-[-1.5px] filter blur-[0.3px]">
            <div className="h-4 w-12 bg-current" />
            <span className="text-[18px] tracking-[0.5em] font-bold">
              {text}
            </span>
            <Arrows />
          </div>

          {/* 2. THE BLUE GHOST (Right Shift) */}
          <div className="absolute inset-0 flex items-center gap-6 pointer-events-none opacity-60 mix-blend-screen text-blue-600 translate-x-[1.5px] filter blur-[0.3px]">
            <div className="h-4 w-12 bg-current" />
            <span className="text-[18px] tracking-[0.5em] font-bold">
              {text}
            </span>
            <Arrows />
          </div>

          {/* 3. THE MAIN CONTENT (The "White" core) */}
          <div className="relative z-10 flex items-center gap-6">
            <div className="h-4 w-12 bg-white opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            <span className="text-[18px] tracking-[0.5em] font-bold text-white opacity-80">
              {text}
            </span>
            <Arrows />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes group-glide-right {
          0% { transform: translateX(-20vw); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(0vw); opacity: 0; }
        }
        .animate-group-glide-right {
          animation: group-glide-right 3.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
        }
@keyframes jitter {
  0% { transform: translateX(-1.5px) translateY(0); }
  50% { transform: translateX(-1px) translateY(0.5px); }
  100% { transform: translateX(-1.5px) translateY(0); }
}
/* Apply to the Red/Blue Ghost divs */
      `}</style>
    </div>
  );
};

// Helper component to keep the SVG logic clean
const Arrows = () => (
  <div className="flex gap-2">
    {[0, 1, 2].map((i) => (
      <div key={i}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 11 13" fill="none">
          <path
            stroke="currentColor"
            strokeWidth="2.0"
            d="M3.249 1.105 L8.644 6.500 L3.249 11.895"
          />
        </svg>
      </div>
    ))}
  </div>
);

export default ScrollIndicator;
