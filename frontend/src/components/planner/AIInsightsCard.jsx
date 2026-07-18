import { CheckCircle2, Sparkles } from "lucide-react";

export default function AIInsightsCard({ insights = [] }) {
  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 bg-[#FAFAFC] border-b border-[#F3F1FA] flex items-center gap-3">
        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/20">
          <Sparkles size={16} className="text-white" />
        </span>

        <h2 className="text-[17px] font-semibold text-[#15131C] font-sora">
          AI Insights
        </h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {insights.length === 0 ? (
          <div className="min-h-[140px] flex items-center justify-center text-center">
            <p className="text-[14px] text-[#8E8C96]">
              Generate a plan to see AI insights.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-2xl border border-[#DDF7E2] bg-[#F7FFF8] p-4"
              >
                <CheckCircle2
                  size={18}
                  className="text-emerald-500 shrink-0 mt-0.5"
                />

                <p className="text-[14px] leading-6 text-[#4A4658]">
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