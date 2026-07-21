import { CheckCircle2, Sparkles } from "lucide-react";

export default function AIInsightsCard({ insights = [] }) {
  return (
    <div className="bg-white dark:bg-[#1C1B24] rounded-3xl border border-[#EEECF8] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-[#FAFAFC] dark:bg-white/[0.03] border-b border-[#F3F1FA] dark:border-white/10 flex items-center gap-3">
        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/20">
          <Sparkles size={16} className="text-white" />
        </span>

        <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
          AI Insights
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {insights.length === 0 ? (
          <div className="min-h-[140px] flex items-center justify-center text-center">
            <p className="text-[14px] text-[#8E8C96] dark:text-[#6F6C79]">
              Generate a plan to see AI insights.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl border border-[#DDF7E2] dark:border-emerald-400/20 bg-[#F7FFF8] dark:bg-emerald-400/10 p-4"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5"
                />

                <p className="text-[14px] leading-6 text-[#4A4658] dark:text-[#D4D2DB]">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}