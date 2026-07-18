import { CalendarClock } from "lucide-react";

export default function PlannerOutput({ output }) {
  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/20">
          <CalendarClock size={16} className="text-white" />
        </span>
        <h2 className="text-[17px] font-semibold text-[#15131C] font-sora">
          AI Schedule
        </h2>
      </div>

      {output.length === 0 ? (
        <div className="min-h-[240px] flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-2xl bg-[#F7F6FB] flex items-center justify-center mb-4">
            <CalendarClock size={24} className="text-[#B0AEB8]" />
          </div>
          <p className="text-[14px] text-[#8E8C96]">
            Your AI schedule will appear here.
          </p>
        </div>
      ) : (
        <div className="relative ml-3">
          {/* Timeline */}
          <div className="absolute left-[72px] top-3 bottom-3 w-[2px] bg-[#ECE9F7]" />

          <div className="space-y-5">
            {output.map((item, index) => (
              <div key={index} className="flex items-start gap-5 relative">
                {/* Time */}
                <div className="w-[58px] pt-2">
                  <span className="text-[12px] font-semibold text-[#6F6C79]">
                    {item.start_time}
                  </span>
                </div>

                {/* Dot */}
                <div className="mt-3 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#4F3FF0] to-[#7B68FF] border-[3px] border-white shadow-md z-10 shrink-0" />

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-[#F1EEF9] bg-[#FAFAFC] p-5 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#15131C]">
                        {item.task_name}
                      </h3>
                      <p className="text-[13px] leading-6 text-[#6F6C79] mt-2">
                        {item.description}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-[#F3F1FF] text-[#4F3FF0] text-[11px] font-semibold whitespace-nowrap">
                      ⏱ {item.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}