import {
  Flame,
  AlertTriangle,
  Leaf,
  Sparkles,
} from "lucide-react";

const PRIORITY_CONFIG = {
  High: {
    icon: Flame,
    bg: "bg-[#FFF5F5]",
    border: "border-[#FFD9D9]",
    badge: "bg-[#FFE5E5] text-[#E53935]",
  },
  Medium: {
    icon: AlertTriangle,
    bg: "bg-[#FFFBF3]",
    border: "border-[#FFE8B3]",
    badge: "bg-[#FFF1CC] text-[#E6A700]",
  },
  Low: {
    icon: Leaf,
    bg: "bg-[#F4FFF8]",
    border: "border-[#D7F5E4]",
    badge: "bg-[#DDF8EA] text-[#16A34A]",
  },
};

export default function PriorityOutput({ tasks = [] }) {
  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center">
          <Sparkles className="text-white" size={18} />
        </div>

        <div>
          <h2 className="text-[18px] font-semibold text-[#15131C]">
            Priority List
          </h2>

          <p className="text-sm text-[#8E8C96]">
            AI ranked your tasks by importance.
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB]">
          <p className="text-[#A1A1AA] text-sm">
            Your prioritized tasks will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((item, index) => {
            const config =
              PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.Low;

            const Icon = config.icon;

            return (
              <div
                key={index}
                className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${config.bg} ${config.border}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Icon
                        size={18}
                        className="text-[#4F3FF0]"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#15131C]">
                        {item.task}
                      </h3>

                      <p className="text-sm text-[#6B7280] mt-2">
                        {item.reason}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${config.badge}`}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}