import { useState } from "react";
import { CheckSquare, Sparkles, Plus, Trash2 } from "lucide-react";

export default function TaskInput({ onGenerate, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        title: title.trim(),
        description: description.trim(),
        deadline,
        task_date: "",
      },
    ]);

    setTitle("");
    setDescription("");
    setDeadline("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const submit = (e) => {
    e.preventDefault();

    if (tasks.length === 0 || loading) return;

    onGenerate(tasks);

    setTasks([]);
  };

  return (
    <div className="bg-white dark:bg-[#1C1B24] rounded-3xl border border-[#EEECF8] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-6">

      <div className="flex items-center gap-3 mb-6">
        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center">
          <CheckSquare size={16} className="text-white" />
        </span>

        <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
          Add Tasks
        </h2>
      </div>

      <form onSubmit={submit} className="space-y-5">

        <div>
          <label className="block text-[12.5px] font-semibold text-[#15131C] dark:text-white mb-1.5">
            Title
          </label>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-[#EEECF8] dark:border-white/10 bg-transparent dark:bg-white/[0.03] text-[#15131C] dark:text-white placeholder:text-[#B0AEB8] dark:placeholder:text-[#6F6C79] p-3 outline-none focus:ring-4 focus:ring-[#4F3FF0]/10"
          />
        </div>

        <div>
          <label className="block text-[12.5px] font-semibold text-[#15131C] dark:text-white mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Add more details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-[#EEECF8] dark:border-white/10 bg-transparent dark:bg-white/[0.03] text-[#15131C] dark:text-white placeholder:text-[#B0AEB8] dark:placeholder:text-[#6F6C79] p-3 outline-none resize-none focus:ring-4 focus:ring-[#4F3FF0]/10"
          />
        </div>

        <div>
          <label className="block text-[12.5px] font-semibold text-[#15131C] dark:text-white mb-1.5">
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-xl border border-[#EEECF8] dark:border-white/10 bg-transparent dark:bg-white/[0.03] text-[#15131C] dark:text-white p-3 outline-none focus:ring-4 focus:ring-[#4F3FF0]/10 dark:[color-scheme:dark]"
          />
        </div>

        <button
          type="button"
          onClick={addTask}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#4F3FF0] dark:border-[#8C7CF7] text-[#4F3FF0] dark:text-[#8C7CF7] hover:bg-[#F6F4FF] dark:hover:bg-white/5"
        >
          <Plus size={16} />
          Add Task
        </button>

        {tasks.length > 0 && (
          <div className="space-y-3">

            {tasks.map((task, index) => (
              <div
                key={index}
                className="border border-[#EEECF8] dark:border-white/10 rounded-xl p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-[#15131C] dark:text-white">{task.title}</h3>

                  {task.description && (
                    <p className="text-sm text-gray-500 dark:text-[#A6A3AF] mt-1">
                      {task.description}
                    </p>
                  )}

                  <p className="text-xs text-[#4F3FF0] dark:text-[#8C7CF7] mt-2">
                    {task.deadline || "No deadline"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeTask(index)}
                  className="text-red-500 dark:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

          </div>
        )}

        <button
          type="submit"
          disabled={loading || tasks.length === 0}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Prioritizing...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Prioritize Tasks
            </>
          )}
        </button>

      </form>
    </div>
  );
}