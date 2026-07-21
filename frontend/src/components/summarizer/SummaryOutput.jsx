import { useState } from "react";
import { FileText, Copy, Check, CheckCircle2, ListChecks, Sparkles } from "lucide-react";

const sections = [
  { key: "overview", title: "Overview", icon: FileText, bg: "bg-[#F8F8FF] dark:bg-[#4F3FF0]/[0.08] border-[#ECE9FF] dark:border-white/10" },
  { key: "key_points", title: "Key Points", icon: Sparkles, bg: "bg-[#F5FBFF] dark:bg-sky-400/[0.08] border-[#DDEEFF] dark:border-white/10" },
  { key: "decisions", title: "Decisions", icon: CheckCircle2, bg: "bg-[#FFF9F4] dark:bg-orange-400/[0.08] border-[#FFE7CC] dark:border-white/10" },
  { key: "next_steps", title: "Next Steps", icon: ListChecks, bg: "bg-[#F7FFF8] dark:bg-emerald-400/[0.08] border-[#DDF7E2] dark:border-white/10" },
];

export default function SummaryOutput({ summary, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-white dark:bg-[#1C1B24] rounded-3xl border border-[#EEECF8] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none flex flex-col h-[560px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-[#F3F1FA] dark:border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white dark:bg-white/5 border border-[#EEECF8] dark:border-white/10 flex items-center justify-center shrink-0">
            <FileText size={18} className="text-[#4F3FF0] dark:text-[#8C7CF7]" />
          </div>
          <div>
            <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
              AI Summary
            </h2>
            <p className="text-[13px] text-[#8E8C96] dark:text-[#6F6C79]">
              Generated from your transcript
            </p>
          </div>
        </div>

        {summary && !loading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[12px] font-bold text-[#4F3FF0] dark:text-[#8C7CF7] hover:bg-[#FAFAFC] dark:hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all border border-[#EEECF8] dark:border-white/10 shrink-0"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Body — this is the scrollable part */}
      <div className="flex-1 p-6 overflow-y-auto">
        {!summary ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-[#F7F6FB] dark:bg-white/5 flex items-center justify-center mb-4">
              <FileText size={24} className="text-[#B0AEB8] dark:text-[#6F6C79]" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] text-[#8E8C96] dark:text-[#6F6C79] font-medium">
              {loading ? "Generating summary..." : "Your summary will appear here"}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {sections.map((section) => {
              const Icon = section.icon;
              const value = summary[section.key];
              if (!value) return null;

              return (
                <div key={section.key} className={`rounded-2xl border p-5 ${section.bg}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={16} className="text-[#4F3FF0] dark:text-[#8C7CF7]" strokeWidth={2.2} />
                    <h3 className="text-[13px] font-bold text-[#15131C] dark:text-white uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>

                  {Array.isArray(value) ? (
                    <ul className="space-y-3">
                      {value.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-br from-[#4F3FF0] to-[#7B68FF] shrink-0" />
                          <span className="text-[14px] text-[#4A4658] dark:text-[#D4D2DB] leading-6">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[14px] leading-7 text-[#4A4658] dark:text-[#D4D2DB]">{value}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}