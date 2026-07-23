import { ChevronRight, AlertCircle, Calendar } from "lucide-react";

export default function ActivityItem({
  id,
  title,
  time,
  tag,
  status,
  isOverdue = false,
  onComplete,
  isLast = false,
}) {
  const priorityStyles = {
    High: {
      color: "#E53935",
      backgroundColor: "#FFE5E5",
    },
    Medium: {
      color: "#D97706",
      backgroundColor: "#FFF3E6",
    },
    Low: {
      color: "#16A34A",
      backgroundColor: "#DCFCE7",
    },
  };

  const priorityStylesDark = {
    High: {
      color: "#FCA5A5",
      backgroundColor: "rgba(239,68,68,0.15)",
    },
    Medium: {
      color: "#FCD34D",
      backgroundColor: "rgba(251,191,36,0.15)",
    },
    Low: {
      color: "#86EFAC",
      backgroundColor: "rgba(34,197,94,0.15)",
    },
  };

  const showOverdue = isOverdue && status !== "Completed";

  return (
    <div
      className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 group ${
        showOverdue
          ? "bg-[#FFF7F7] dark:bg-red-400/[0.06] border-[#FFD6D6] dark:border-red-400/25 hover:border-[#FFB8B8] dark:hover:border-red-400/40"
          : "bg-white dark:bg-[#1C1B24] border-transparent hover:bg-[#F9F8FD] dark:hover:bg-white/5 hover:border-[#EAE6F8] dark:hover:border-white/10"
      }`}
    >
      {/* Timeline */}
      <div className="relative flex flex-col items-center pt-1 shrink-0">
        <div
          className={`w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-[#1C1B24] z-10 transition-colors ${
            showOverdue
              ? "bg-[#EF4444]"
              : "bg-[#EAE6F8] dark:bg-white/15 group-hover:bg-[#4F3FF0]"
          }`}
        />

        {!isLast && (
          <div className="absolute top-5 w-px h-10 bg-[#EFEDF7] dark:bg-white/10" />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-[15px] text-[#15131C] dark:text-white transition-colors group-hover:text-[#4F3FF0] dark:group-hover:text-[#8C7CF7]">
              {title}
            </h3>

            {showOverdue && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-[#FFE5E5] dark:bg-red-400/15 text-[#DC2626] dark:text-red-400">
                <AlertCircle size={11} />
                Overdue
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1.5">
            <Calendar
              size={13}
              className={showOverdue ? "text-[#DC2626] dark:text-red-400" : "text-[#B0AEB8] dark:text-[#6F6C79]"}
            />
            <span
              className={`text-[13px] ${
                showOverdue
                  ? "text-[#DC2626] dark:text-red-400 font-medium"
                  : "text-[#8E8C96] dark:text-[#A6A3AF]"
              }`}
            >
              {time || "No deadline"}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-lg hidden dark:inline-block"
            style={
              priorityStylesDark[tag] || {
                color: "#A6A3AF",
                backgroundColor: "rgba(255,255,255,0.05)",
              }
            }
          >
            {tag}
          </span>
          <span
            className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-lg dark:hidden"
            style={
              priorityStyles[tag] || {
                color: "#6F6C79",
                backgroundColor: "#F3F2F8",
              }
            }
          >
            {tag}
          </span>

          {status === "Completed" ? (
            <span className="px-3 py-1 rounded-lg bg-green-100 dark:bg-emerald-400/15 text-green-700 dark:text-emerald-400 text-[11px] font-semibold">
              ✓ Completed
            </span>
          ) : (
            <button
              onClick={() => onComplete(id)}
              className="px-3 py-1 rounded-lg bg-[#4F3FF0] text-white text-[11px] font-semibold hover:bg-[#4338CA] transition-colors"
            >
              Complete
            </button>
          )}

          <ChevronRight
            size={17}
            className="text-[#B0AEB8] dark:text-[#6F6C79] group-hover:text-[#4F3FF0] dark:group-hover:text-[#8C7CF7] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}