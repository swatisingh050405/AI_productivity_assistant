import { Flame, AlertTriangle, Leaf, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PRIORITY_CONFIG = {
  High: {
    icon: Flame,
    dot: "bg-[#EF4444]",
    headerText: "text-[#DC2626]",
    cardBg: "bg-white",
    cardBorder: "border-[#FFD9D9]",
    columnBg: "bg-[#FFF8F8]",
  },
  Medium: {
    icon: AlertTriangle,
    dot: "bg-[#F59E0B]",
    headerText: "text-[#D97706]",
    cardBg: "bg-white",
    cardBorder: "border-[#FFE8B3]",
    columnBg: "bg-[#FFFCF4]",
  },
  Low: {
    icon: Leaf,
    dot: "bg-[#22C55E]",
    headerText: "text-[#16A34A]",
    cardBg: "bg-white",
    cardBorder: "border-[#D7F5E4]",
    columnBg: "bg-[#F6FFFA]",
  },
};

const COLUMN_ORDER = ["High", "Medium", "Low"];
const COLUMN_MAX_HEIGHT = "560px";

function TaskCard({ item }) {
  const config = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.Low;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 ${config.cardBg} ${config.cardBorder} hover:shadow-[0_6px_16px_rgba(21,19,28,0.06)] transition-shadow duration-200`}
    >
      <h3 className="text-[13.5px] font-semibold text-[#15131C] leading-snug font-sans">
        {item.task}
      </h3>
      {item.reason && (
        <p className="text-[12px] text-[#8E8C96] leading-relaxed mt-1.5 font-sans line-clamp-2">
          {item.reason}
        </p>
      )}
    </motion.div>
  );
}

export default function PriorityOutput({ tasks = [] }) {
  const grouped = COLUMN_ORDER.map((level) => ({
    level,
    items: tasks.filter((t) => t.priority === level),
  }));

  const topTask = tasks.find((t) => t.priority === "High") || tasks[0];

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shrink-0">
          <Sparkles className="text-white" size={18} />
        </div>
        <div>
          <h2 className="text-[18px] font-semibold text-[#15131C] font-sora">Priority List</h2>
          <p className="text-[13px] text-[#8E8C96] font-sans">AI ranked your tasks by importance.</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB]">
          <p className="text-[#A1A1AA] text-sm font-sans">
            Your prioritized tasks will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {grouped.map(({ level, items }) => {
              const config = PRIORITY_CONFIG[level];
              return (
                <div
                  key={level}
                  className={`rounded-2xl p-4 ${config.columnBg} flex flex-col`}
                  style={{ maxHeight: COLUMN_MAX_HEIGHT }}
                >
                  <div className="flex items-center gap-2 mb-4 shrink-0">
                    <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                    <p className={`text-[12px] font-bold uppercase tracking-wide ${config.headerText} font-sans`}>
                      {level} Priority
                    </p>
                    <span className="ml-auto text-[11px] font-semibold text-[#8E8C96] bg-white rounded-full h-5 w-5 flex items-center justify-center border border-black/5">
                      {items.length}
                    </span>
                  </div>

                  <div className="space-y-3 overflow-y-auto pr-1 -mr-1">
                    {items.length > 0 ? (
                      items.map((item, i) => <TaskCard key={i} item={item} />)
                    ) : (
                      <p className="text-[12px] text-[#B0AEB8] italic font-sans px-1">
                        No {level.toLowerCase()} priority tasks.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {topTask && (
            <div className="mt-6 pt-5 border-t border-[#F3F1FA] flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-[12.5px] font-bold uppercase tracking-wide text-[#4F3FF0] font-sans mb-1">
                  AI Recommendation
                </p>
                <p className="text-[13.5px] text-[#3A3742] leading-relaxed font-sans">
                  Focus on completing <span className="font-semibold text-[#15131C]">"{topTask.task}"</span> first.
                  {topTask.reason ? ` ${topTask.reason}` : " This is time-sensitive and important."}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}