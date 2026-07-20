import { Clock, ListChecks, CalendarClock, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function urgencyStyle(deadline) {
  const d = (deadline || "").toLowerCase();
  if (d.includes("today") || d.includes("tomorrow")) {
    return { border: "#EF4444", bg: "#FEF2F2", text: "#DC2626", label: "Urgent" };
  }
  if (d.includes("friday") || d.includes("this week") || d.includes("thursday")) {
    return { border: "#F59E0B", bg: "#FFFBEB", text: "#D97706", label: "This week" };
  }
  return { border: "#4F3FF0", bg: "#F5F3FF", text: "#4F3FF0", label: "Upcoming" };
}

export default function MeetingHighlights({ highlights = [] }) {
  const deadlines = highlights.filter(
    (item) => item.deadline && item.deadline !== "None"
  );
  const actionItems = highlights.filter((item) => item.track);
  const hasContent = deadlines.length > 0 || actionItems.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-7">
      <div className="flex items-center gap-3.5 mb-8">
        <span className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#4F3FF0] to-[#6F7BFF] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/20 shrink-0">
          <CalendarClock size={19} className="text-white" strokeWidth={2.2} />
        </span>
        <div>
          <h2 className="text-[18px] font-bold text-[#15131C] font-sora tracking-tight">
            Deadlines & Action Items
          </h2>
          <p className="text-[13px] text-[#8E8C96] font-sans">What needs to happen next</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {hasContent ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Deadlines column */}
            {deadlines.length > 0 && (
              <div className="bg-[#FBFAFF] rounded-2xl p-5 border border-[#F1EEFC]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-white border border-[#EEECF8] flex items-center justify-center">
                      <Clock size={12} className="text-[#4F3FF0]" strokeWidth={2.5} />
                    </span>
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#6F6C79] font-sans">
                      Deadlines
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#4F3FF0] bg-white border border-[#EEECF8] rounded-full h-5 w-5 flex items-center justify-center">
                    {deadlines.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {deadlines.map((item, i) => {
                    const c = urgencyStyle(item.deadline);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-2xl p-4 border border-[#EEF0F8] hover:shadow-[0_6px_20px_rgba(79,63,240,0.08)] hover:-translate-y-0.5 transition-all duration-200"
                        style={{ borderLeft: `4px solid ${c.border}` }}
                      >
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md"
                            style={{ color: c.text, backgroundColor: c.bg }}
                          >
                            {c.label}
                          </span>
                          <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[#8E8C96] font-sans shrink-0">
                            <Clock size={11} className="text-[#B0AEB8]" strokeWidth={2.5} />
                            <span className="text-[#B0AEB8] font-normal">Due</span>
                            {item.deadline}
                          </span>
                        </div>
                        <p className="text-[14px] text-[#15131C] font-medium leading-snug font-sans">
                          {item.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action items column */}
            {actionItems.length > 0 && (
              <div className="bg-[#FAFCFC] rounded-2xl p-5 border border-[#EAF6F3]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-white border border-[#DCF3EE] flex items-center justify-center">
                      <ListChecks size={12} className="text-[#0D9488]" strokeWidth={2.5} />
                    </span>
                    <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#6F6C79] font-sans">
                      Action Items
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#0D9488] bg-white border border-[#DCF3EE] rounded-full h-5 w-5 flex items-center justify-center">
                    {actionItems.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {actionItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-center gap-3.5 bg-white rounded-2xl p-4 border border-[#E9F5F2] hover:border-[#B8E6DB] hover:shadow-[0_6px_20px_rgba(13,148,136,0.08)] hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span className="h-7 w-7 rounded-lg bg-[#E6F9F6] flex items-center justify-center shrink-0 text-[11px] font-bold text-[#0D9488] font-sora">
                        {i + 1}
                      </span>
                      <p className="text-[14px] text-[#3A3742] leading-snug flex-1 font-sans">
                        {item.text}
                      </p>
                      <ArrowUpRight
                        size={14}
                        className="text-[#B0AEB8] group-hover:text-[#0D9488] transition-colors shrink-0"
                      />
                    </motion.div>
                  ))}
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
            className="flex flex-col items-center justify-center text-center py-12"
          >
            <div className="h-16 w-16 rounded-2xl bg-[#F7F6FB] flex items-center justify-center mb-4">
              <CalendarClock size={22} className="text-[#B0AEB8]" strokeWidth={1.8} />
            </div>
            <p className="text-[13.5px] text-[#B0AEB8] max-w-[260px] font-sans">
              Deadlines and action items will show up here once a summary is generated.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}