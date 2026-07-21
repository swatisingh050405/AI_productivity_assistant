import { Clock, Coffee, ListTodo, Target } from "lucide-react";

const cards = [
  {
    key: "focus_time",
    label: "Focus Time",
    icon: Clock,
    color: "bg-[#F8F8FF] dark:bg-[#4F3FF0]/10 border-[#ECE9FF] dark:border-[#4F3FF0]/20",
  },
  {
    key: "break_time",
    label: "Break Time",
    icon: Coffee,
    color: "bg-[#FFF9F4] dark:bg-orange-400/10 border-[#FFE7CC] dark:border-orange-400/20",
  },
  {
    key: "total_tasks",
    label: "Total Tasks",
    icon: ListTodo,
    color: "bg-[#F7FFF8] dark:bg-emerald-400/10 border-[#DDF7E2] dark:border-emerald-400/20",
  },
  {
    key: "productivity_score",
    label: "Productivity Score",
    icon: Target,
    color: "bg-[#F5FBFF] dark:bg-sky-400/10 border-[#DDEEFF] dark:border-sky-400/20",
  },
];

export default function DailySummaryCard({ summary = {} }) {
  return (
    <div className="bg-white dark:bg-[#1C1B24] rounded-3xl border border-[#EEECF8] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden">
      <div className="px-6 py-4 bg-[#FAFAFC] dark:bg-white/[0.03] border-b border-[#F3F1FA] dark:border-white/10">
        <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
          Daily Summary
        </h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {cards.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className={`rounded-2xl border p-5 ${item.color}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon
                  size={16}
                  className="text-[#4F3FF0] dark:text-[#8C7CF7]"
                />
                <span className="text-[13px] font-semibold text-[#6F6C79] dark:text-[#A6A3AF]">
                  {item.label}
                </span>
              </div>

              <p className="text-[22px] font-bold text-[#15131C] dark:text-white">
                {summary[item.key] || "--"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}