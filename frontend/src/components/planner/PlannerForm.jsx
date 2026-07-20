import { useState } from "react";
import { CalendarDays, Sparkles, RotateCcw, X } from "lucide-react";

export default function PlannerForm({
  onGenerate,
  loading,
  hasPlan,
}) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;

    onGenerate(input);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/20">
            <CalendarDays size={16} className="text-white" />
          </span>

          <h2 className="text-[17px] font-semibold text-[#15131C] font-sora">
            Daily Planner
          </h2>
        </div>

        {input && (
          <button
            type="button"
            onClick={() => setInput("")}
            className="flex items-center gap-1 text-[12px] font-medium text-[#8E8C96] hover:text-[#15131C]"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder={`Wake up at 7 AM
College from 9 AM to 4 PM
Gym for 1 hour
Complete DBMS assignment
Practice DSA`}
          className="w-full rounded-2xl border border-[#EEECF8] p-4 text-[14px] outline-none resize-none focus:ring-4 focus:ring-[#4F3FF0]/10 focus:border-[#4F3FF0] min-h-[170px]"
        />

        <div className="flex justify-between items-center">

          <span className="text-[12px] text-[#8E8C96]">
            {hasPlan
              ? "Add more instructions and regenerate if needed."
              : "Describe your day."}
          </span>

          <div className="flex gap-3">

            {hasPlan && (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EEECF8] text-[#4F3FF0] font-semibold hover:bg-[#F8F8FF]"
              >
                <RotateCcw size={15} />
                Regenerate
              </button>
            )}

            {!hasPlan && (
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#4F3FF0]/20"
              >
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Generate Plan
                  </>
                )}
              </button>
            )}

          </div>

        </div>

      </form>

    </div>
  );
}