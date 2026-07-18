import { Clock, ListChecks, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseSummarySections, splitAssignee } from "../../utils/parseSummary";

const TAG_COLORS = [
  { text: "#4F3FF0", bg: "#EEF0FC" },
  { text: "#D97706", bg: "#FFF3E6" },
  { text: "#0D9488", bg: "#E6F9F6" },
  { text: "#DB2777", bg: "#FDEAF3" },
];

function colorFor(name) {
  if (!name) return TAG_COLORS[0];
  const idx = name.charCodeAt(0) % TAG_COLORS.length;
  return TAG_COLORS[idx];
}

export default function MeetingHighlights({ summary }) {
  const sections = parseSummarySections(summary);

  const deadlines = sections.find((s) => /deadline/i.test(s.heading))?.items || [];
  const actionItems = sections.find((s) => /action item/i.test(s.heading))?.items || [];

  const hasContent = deadlines.length > 0 || actionItems.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_1px_2px_rgba(21,19,28,0.04)] p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shrink-0 shadow-lg shadow-[#4F3FF0]/20">
          <CalendarClock size={16} className="text-white" strokeWidth={2.2} />
        </span>
        <h2 className="text-[17px] font-semibold text-[#15131C] tracking-tight font-sora">
          Deadlines & Action Items
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {hasContent ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Deadlines */}
            {deadlines.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={13} className="text-[#4F3FF0]" strokeWidth={2.3} />
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#B0AEB8] font-sans">
                    Deadlines
                  </p>
                </div>
                <div className="space-y-2">
                  {deadlines.map((item, i) => {
                    const { who, text } = splitAssignee(item);
                    const color = colorFor(who);
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#EEF0F8] hover:shadow-sm transition-all"
                      >
                        {who && (
                          <span
                            className="text-[10.5px] font-bold px-2 py-1 rounded-md shrink-0 font-sans"
                            style={{ color: color.text, backgroundColor: color.bg }}
                          >
                            {who}
                          </span>
                        )}
                        <p className="text-[13px] text-[#3A3742] leading-6 font-sora">{text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Items */}
            {actionItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks size={13} className="text-[#4F3FF0]" strokeWidth={2.3} />
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#B0AEB8] font-sans">
                    Action Items
                  </p>
                </div>
                <div className="space-y-2">
                  {actionItems.map((item, i) => {
                    const { who, text } = splitAssignee(item);
                    const color = colorFor(who);
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAFAFC] border border-[#F3F1FA]"
                      >
                        {who && (
                          <span
                           className="text-[11px] font-semibold px-3 py-1 rounded-fullshrink-0 font-sora"
                            style={{ color: color.text, backgroundColor: color.bg }}
                          >
                            {who}
                          </span>
                        )}
                        <p className="text-[13px] text-[#3A3742] leading-relaxed font-sora">{text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <span className="h-14 w-14 rounded-2xl bg-[#F7F6FB] shadow-sm  ">
              <CalendarClock size={18} className="text-[#B0AEB8]" strokeWidth={1.8} />
            </span>
            <p className="text-[13.5px] text-[#B0AEB8] font-sora max-w-[260px]">
              Deadlines and action items will show up here once a summary is generated.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}