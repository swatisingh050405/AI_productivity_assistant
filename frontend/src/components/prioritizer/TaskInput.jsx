import { useState } from "react";
import { CheckSquare, Sparkles, X } from "lucide-react";

export default function TaskInput({ onGenerate, loading }) {
  const [tasks, setTasks] = useState("");

  const taskCount = tasks.trim()
    ? tasks.split("\n").filter((t) => t.trim()).length
    : 0;

  const submit = (e) => {
    e.preventDefault();

    if (!tasks.trim() || loading) return;

    onGenerate(tasks);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/20">
            <CheckSquare size={16} className="text-white" />
          </span>

          <h2 className="text-[17px] font-semibold text-[#15131C]">
            Task List
          </h2>
        </div>

        {tasks && (
          <button
            type="button"
            onClick={() => setTasks("")}
            className="flex items-center gap-1 text-[12px] text-[#8E8C96] hover:text-[#15131C]"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={submit} className="flex flex-col flex-1">
        <textarea
          rows={12}
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          disabled={loading}
          placeholder={`Finish Assignment
Study DBMS
Go to Gym
Complete Project`}
          className="flex-1 w-full rounded-2xl border border-[#EEECF8] p-4 text-[14px] outline-none resize-none transition-all duration-200 focus:ring-4 focus:ring-[#4F3FF0]/10 focus:border-[#4F3FF0] disabled:bg-[#FAFAFC]"
        />

        <div className="flex items-center justify-between mt-4">
          <span className="text-[12px] text-[#8E8C96]">
            {taskCount > 0
              ? `${taskCount} tasks ready`
              : "Enter one task per line"}
          </span>

          <button
            type="submit"
            disabled={loading || !tasks.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all disabled:opacity-40"
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Prioritizing...
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Prioritize Tasks
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}