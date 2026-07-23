import { ChevronRight, AlertCircle } from "lucide-react";

export default function ActivityItem({
  id,
  title,
  time,
  source,
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
      className={`relative flex items-start gap-4 py-4 px-4 rounded-2xl transition-all duration-300 hover:bg-[#F9F8FD] border group ${
        showOverdue
          ? "border-[#FFD9D9] bg-[#FFFAFA]"
          : "border-transparent hover:border-[#EAE6F8]"
      }`}
    >
      {/* Timeline */}
      <div className="relative flex flex-col items-center pt-1.5 shrink-0">
        <div
          className={`w-2.5 h-2.5 rounded-full ring-4 ring-white z-10 ${
            showOverdue
              ? "bg-[#EF4444]"
              : "bg-[#EAE6F8] group-hover:bg-[#4F3FF0]"
          }`}
        />

        {!isLast && (
          <div className="absolute top-5 w-px h-9 bg-[#EFEDF7]" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[14.5px] text-[#15131C] group-hover:text-[#4F3FF0]">
              {title}
            </h3>
            {showOverdue && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#E53935] bg-[#FFE5E5] px-2 py-0.5 rounded-md">
                <AlertCircle size={11} />
                Overdue
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <p
              className={`text-[13px] ${
                showOverdue ? "text-[#E53935] font-medium" : "text-[#8E8C96]"
              }`}
            >
              📅 {time || "No deadline"}
            </p>

            {source && (
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F3F2F8] text-[#6F6C79]">
                {source}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider"
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
            <span className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-green-100 text-green-700">
              Completed
            </span>
          ) : (
            <button
              onClick={() => onComplete(id)}
              className="px-3 py-1 rounded-lg bg-[#4F3FF0] text-white text-[11px] font-semibold hover:bg-[#4338CA] transition"
            >
              Complete
            </button>
          )}

          <div className="p-1 rounded-full group-hover:bg-white">
            <ChevronRight
              size={16}
              className="text-[#B0AEB8] group-hover:text-[#4F3FF0]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}