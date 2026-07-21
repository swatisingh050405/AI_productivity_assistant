import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

export default function TranscriptInput({ onGenerate, loading }) {
  const [transcript, setTranscript] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;
    onGenerate(transcript);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#1C1B24] rounded-3xl border border-[#EEECF8] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-6 flex flex-col h-[560px]"
    >
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shrink-0">
          <FileText size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
            Meeting Transcript
          </h2>
          <p className="text-[13px] text-[#8E8C96] dark:text-[#6F6C79]">
            Paste your meeting transcript below.
          </p>
        </div>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste your meeting transcript here..."
        className="w-full flex-1 rounded-2xl border border-[#E5E7EB] dark:border-white/10 bg-transparent dark:bg-white/[0.03] p-4 resize-none outline-none focus:ring-2 focus:ring-[#4F3FF0] text-[15px] text-[#15131C] dark:text-white placeholder:text-[#B0AEB8] dark:placeholder:text-[#6F6C79] overflow-y-auto"
      />

      <div className="flex justify-end mt-4 shrink-0">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-[#4F3FF0]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          <Sparkles size={18} />
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>
    </form>
  );
}