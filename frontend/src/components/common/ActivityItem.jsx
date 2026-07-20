import { ChevronRight, AlertCircle } from "lucide-react";

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

  const showOverdue = isOverdue && status !== "Completed";

  return (
    <div
      className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 group ${
        showOverdue
          ? "bg-[#FFF7F7] border-[#FFD6D6] hover:border-[#FFB8B8]"
          : "bg-white border-transparent hover:bg-[#F9F8FD] hover:border-[#EAE6F8]"
      }`}
    >
      {/* Timeline */}
      <div className="relative flex flex-col items-center pt-1 shrink-0">
        <div
          className={`w-2.5 h-2.5 rounded-full ring-4 ring-white z-10 transition-colors ${
            showOverdue
              ? "bg-[#EF4444]"
              : "bg-[#EAE6F8] group-hover:bg-[#4F3FF0]"
          }`}
        />

        {!isLast && (
          <div className="absolute top-5 w-px h-10 bg-[#EFEDF7]" />
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-[15px] text-[#15131C] transition-colors group-hover:text-[#4F3FF0]">
              {title}
            </h3>

            {showOverdue && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-[#FFE5E5] text-[#DC2626]">
                <AlertCircle size={11} />
                Overdue
              </span>
            )}
          </div>

          <div className="mt-1">
            <span
              className={`text-[13px] ${
                showOverdue
                  ? "text-[#DC2626] font-medium"
                  : "text-[#8E8C96]"
              }`}
            >
              📅 {time || "No deadline"}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-lg"
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
            <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 text-[11px] font-semibold">
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
            className="text-[#B0AEB8] group-hover:text-[#4F3FF0] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}