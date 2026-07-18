import { ChevronRight } from "lucide-react";

export default function ActivityItem({ title, time, tag, tagColor, tagBg, isLast = false }) {
  return (
    <div className="relative flex items-start gap-4 py-4 px-4 rounded-2xl transition-all duration-300 hover:bg-[#F9F8FD] border border-transparent hover:border-[#EAE6F8] group cursor-pointer">
      <div className="relative flex flex-col items-center pt-1.5 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#EAE6F8] group-hover:bg-[#4F3FF0] transition-colors duration-300 ring-4 ring-white z-10" />
        {!isLast && <div className="w-px h-9 bg-[#EFEDF7] absolute top-5" />}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="min-w-0">
          <h3 className="font-semibold text-[14.5px] text-[#15131C] group-hover:text-[#4F3FF0] transition-colors duration-200 truncate">
            {title}
          </h3>
          <p className="text-[13px] text-[#8E8C96] mt-0.5">{time}</p>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span
            className="text-[11px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider"
            style={{ color: tagColor, backgroundColor: tagBg }}
          >
            {tag}
          </span>
          <div className="p-1 rounded-full bg-transparent group-hover:bg-white border border-transparent group-hover:border-[#EAE6F8] transition-all">
            <ChevronRight size={16} className="text-[#B0AEB8] group-hover:text-[#4F3FF0]" />
          </div>
        </div>
      </div>
    </div>
  );
}