export default function TipCard({ title = "Work in short bursts", tip = "Break your tasks into smaller chunks and take short breaks to maintain focus." }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-3xl border border-[#EEECF8] shadow-[0_1px_2px_rgba(21,19,28,0.04)] p-6">
      <svg className="absolute -bottom-2 -right-2 w-24 h-24 text-[#F0EEFC]" viewBox="0 0 96 96" fill="none">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={8 + col * 20} cy={8 + row * 20} r="2.4" fill="currentColor" />
          ))
        )}
      </svg>

      <div className="relative flex items-center gap-2 mb-3.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4F3FF0]" />
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#B0AEB8]">Focus Tip</p>
      </div>

      <h2 className="relative text-[16px] font-semibold text-[#15131C] tracking-tight mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
        {title}
      </h2>
      <p className="relative leading-relaxed text-[14px] text-[#6F6C79] max-w-[85%]">
        {tip}
      </p>
    </div>
  );
}