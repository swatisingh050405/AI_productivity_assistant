import { useState } from "react";
import { CalendarDays, Sparkles, X } from "lucide-react";

export default function PlannerForm({ onGenerate, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onGenerate(input);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col">
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder={`Wake up at 7:00 AM
College from 9:00 AM to 4:00 PM
Gym for 1 hour
Complete DBMS assignment
Practice DSA`}
          className="w-full rounded-2xl border border-[#EEECF8] p-4 text-[14px] text-[#15131C] placeholder:text-[#B0AEB8] outline-none resize-none transition-all duration-200 focus:ring-4 focus:ring-[#4F3FF0]/10 focus:border-[#4F3FF0] disabled:bg-[#FAFAFC] min-h-[160px] max-h-[220px]"
        />

        <div className="flex items-center justify-between mt-4">
          <span className="text-[12px] text-[#8E8C96]">
            {input.trim() ? "Ready to generate your schedule" : "Describe your day"}
          </span>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
        </div>
      </form>
    </div>
  );
}