import { useState } from "react";
import { Mic, Sparkles, X } from "lucide-react";

export default function TranscriptInput({ onGenerate, loading }) {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;
    onGenerate(text);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_1px_2px_rgba(21,19,28,0.04)] p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shrink-0 shadow-lg shadow-[#4F3FF0]/20">
            <Mic size={16} className="text-white" strokeWidth={2.2} />
          </span>
          <h2 className="text-[17px] font-semibold text-[#15131C] tracking-tight font-sora">
            Meeting Transcript
          </h2>
        </div>
        {text && (
          <button
            type="button"
            onClick={() => setText("")}
            className="flex items-center gap-1 text-[12.5px] font-medium text-[#B0AEB8] hover:text-[#15131C] transition-colors font-sans"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <textarea
          rows={15}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          className="w-full flex-1 border border-[#EEECF8] rounded-2xl p-4 text-[14px] text-[#15131C] placeholder:text-[#B0AEB8] outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-[#4F3FF0]/20 resize-none font-sans disabled:bg-[#FAFAFC] disabled:text-[#B0AEB8]"
          placeholder="Paste meeting transcript..."
        />

        <div className="flex items-center justify-between mt-4">
          <span className="text-[12.5px] text-[#B0AEB8] font-medium font-sans">
            {wordCount > 0 ? `${wordCount} words` : "No transcript yet"}
          </span>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="flex items-center gap-2 bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] text-white px-5 py-2.5 rounded-xl text-[13.5px] font-semibold shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 font-sans"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={15} strokeWidth={2.2} />
                Generate Summary
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}