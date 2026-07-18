import { Clock, Coffee, ListTodo, Target } from "lucide-react";

const cards = [
  {
    key: "focus_time",
    label: "Focus Time",
    icon: Clock,
    color: "bg-[#F8F8FF] border-[#ECE9FF]",
  },
  {
    key: "break_time",
    label: "Break Time",
    icon: Coffee,
    color: "bg-[#FFF9F4] border-[#FFE7CC]",
  },
  {
    key: "total_tasks",
    label: "Total Tasks",
    icon: ListTodo,
    color: "bg-[#F7FFF8] border-[#DDF7E2]",
  },
  {
    key: "productivity_score",
    label: "Productivity Score",
    icon: Target,
    color: "bg-[#F5FBFF] border-[#DDEEFF]",
  },
];

export default function DailySummaryCard({ summary = {} }) {
  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="px-6 py-4 bg-[#FAFAFC] border-b border-[#F3F1FA]">
        <h2 className="text-[17px] font-semibold text-[#15131C] font-sora">
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
                  className="text-[#4F3FF0]"
                />
                <span className="text-[13px] font-semibold text-[#6F6C79]">
                  {item.label}
                </span>
              </div>

              <p className="text-[22px] font-bold text-[#15131C]">
                {summary[item.key] || "--"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}