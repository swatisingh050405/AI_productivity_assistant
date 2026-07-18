import { useState } from "react";
import { FileText, Copy, Check, CheckCircle2, ListChecks, Clock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseSummarySections } from "../../utils/parseSummary";

const SECTION_ICONS = {
  summary: FileText,
  "key decisions": CheckCircle2,
  "action items": ListChecks,
  deadlines: Clock,
};
const SECTION_COLORS = {
  summary: "bg-[#F8F8FF] border-[#ECE9FF]",
  "key decisions": "bg-[#F5FBFF] border-[#DDEEFF]",
  "action items": "bg-[#F7FFF8] border-[#DDF7E2]",
  deadlines: "bg-[#FFF9F4] border-[#FFE7CC]",
};

function iconFor(heading) {
  const key = heading?.toLowerCase() || "summary";
  return SECTION_ICONS[key] || Sparkles;
}

export default function SummaryOutput({ summary, loading }) {
  const [copied, setCopied] = useState(false);
  const sections = parseSummarySections(summary);

  const handleCopy = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full overflow-hidden">
        
      {/* Header */}
      <div className="px-6 py-4 bg-[#FAFAFC] border-b border-[#F3F1FA] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#EEECF8]">
            <FileText size={16} className="text-[#4F3FF0]" strokeWidth={2.2} />
          </span>
          <h2 className="text-[17px] font-semibold text-[#15131C] tracking-tight font-sora">
            AI Summary
          </h2>
        </div>
        {summary && !loading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[12px] font-bold text-[#4F3FF0] hover:bg-white px-3 py-1.5 rounded-lg transition-all border border-[#EEECF8] shadow-sm"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto min-h-[360px] bg-white">
        <AnimatePresence mode="wait">
          {sections.length > 0 || loading ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {sections.map((section, i) => {
                const Icon = iconFor(section.heading);
                 const color =
                    SECTION_COLORS[section.heading?.toLowerCase()] ||
                    "bg-[#FAF9FE] border-[#F1EEF9]";
                return (
              
                <div
                    key={i}
                    className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${color}`}
                >
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#ECE9F7]">
                      <Icon size={16} className="text-[#4F3FF0]" strokeWidth={2.2} />
                      <h3 className="text-[13px] font-bold text-[#15131C] uppercase tracking-wide">
                        {section.heading}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {section.items.map((item, j) => (
                        <div key={j} className="flex gap-3 items-start">
                          <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#4F3FF0] to-[#7B68FF] shrink-0" />
                          <p className="text-[14px] leading-6 text-[#4A4658]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex items-center gap-2 text-[#4F3FF0] text-[13px] font-medium animate-pulse pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F3FF0]" />
                  Generating summary...
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <div className="h-16 w-16 rounded-2xl bg-[#F7F6FB] flex items-center justify-center mb-4">
                <FileText size={24} className="text-[#B0AEB8]" strokeWidth={1.5} />
              </div>
              <p className="text-[14px] text-[#8E8C96] font-medium">
                {loading ? "Analyzing transcript..." : "Your summary will appear here"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}