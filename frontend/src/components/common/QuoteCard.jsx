export default function QuoteCard({ text, author }) {
  return (
    <div className="relative bg-white rounded-3xl border border-[#EEECF8] shadow-[0_1px_2px_rgba(21,19,28,0.04)] p-6 pl-7 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-[#4F3FF0]/[0.05] blur-3xl" />
      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-[#4F3FF0] to-[#4F9EF5]" />

      <p className="relative text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#B0AEB8] mb-3">
        Daily Motivation
      </p>
      <p className="relative text-[16px] text-[#15131C] leading-relaxed font-serif">
        {text}
      </p>
      <div className="relative flex items-center gap-2 mt-4">
        <span className="h-px w-5 bg-[#D8D5E8]" />
        <p className="text-[12.5px] text-[#8E8C96] font-medium">{author}</p>
      </div>
    </div>
  );
}