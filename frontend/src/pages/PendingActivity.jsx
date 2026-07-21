import { useEffect, useState } from "react";
import { Clock, AlertCircle, CheckCircle2, Flame, AlertTriangle, Leaf } from "lucide-react";
import { motion } from "framer-motion";

import { getPendingTasks, completeTask } from "../services/taskService";

const PRIORITY_CONFIG = {
  High: { icon: Flame, color: "#DC2626", bg: "#FFE5E5" },
  Medium: { icon: AlertTriangle, color: "#D97706", bg: "#FFF3E6" },
  Low: { icon: Leaf, color: "#16A34A", bg: "#DCFCE7" },
};

function daysOverdue(dateStr) {
  if (!dateStr) return 0;
  const today = new Date(new Date().toDateString());
  const due = new Date(dateStr);
  const diff = Math.floor((today - due) / 86400000);
  return Math.max(diff, 0);
}

function overdueLabel(days) {
  if (days === 0) return "Due today";
  if (days === 1) return "1 day overdue";
  return `${days} days overdue`;
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#ECEAF5] dark:border-white/10 bg-white dark:bg-[#1C1B24] p-4 mb-3 animate-pulse">
      <div className="h-4 w-2/3 rounded-md bg-[#F3F1FA] dark:bg-white/10 mb-2" />
      <div className="h-3 w-1/3 rounded-md bg-[#F3F1FA] dark:bg-white/10" />
    </div>
  );
}

export default function PendingActivity() {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState({
    overdue: [],
    recent: [],
  });

  useEffect(() => {
    loadActivities();

    const refresh = () => loadActivities();

    window.addEventListener("tasksUpdated", refresh);

    return () => {
      window.removeEventListener("tasksUpdated", refresh);
    };
  }, []);

  async function loadActivities() {
    try {
      setLoading(true);

      const data = await getPendingTasks();

      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleComplete = async (id) => {
    setActivities((prev) => ({
      overdue: prev.overdue.filter((t) => t.id !== id),
      recent: prev.recent.filter((t) => t.id !== id),
    }));

    try {
      await completeTask(id);
      window.dispatchEvent(new Event("tasksUpdated"));
    } catch (err) {
      console.error(err);
      loadActivities();
    }
  };

  const renderCard = (task, severe = false) => {
    const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.Low;
    const PriorityIcon = priority.icon;
    const days = daysOverdue(task.task_date || task.deadline);

    return (
      <motion.div
        key={task.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-4 mb-3 bg-white dark:bg-[#1C1B24] hover:shadow-[0_6px_18px_rgba(21,19,28,0.06)] dark:hover:shadow-none dark:hover:bg-white/5 transition-all duration-200 ${
          severe
            ? "border-[#FFD9D9] dark:border-red-400/25"
            : "border-[#FFE8B3] dark:border-amber-400/20"
        }`}
        style={{ borderLeft: `4px solid ${severe ? "#EF4444" : "#F59E0B"}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-[14.5px] text-[#15131C] dark:text-white truncate">
              {task.title}
            </h3>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className="flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                style={{ color: priority.color, backgroundColor: priority.bg }}
              >
                <PriorityIcon size={11} />
                {task.priority}
              </span>

              {task.source && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F3F2F8] dark:bg-white/5 text-[#6F6C79] dark:text-[#A6A3AF]">
                  {task.source}
                </span>
              )}

              <span
                className={`text-[11px] font-bold ${
                  severe ? "text-[#DC2626] dark:text-red-400" : "text-[#D97706] dark:text-amber-400"
                }`}
              >
                {overdueLabel(days)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {severe && <AlertCircle size={17} className="text-red-500" />}
            <button
              onClick={() => handleComplete(task.id)}
              title="Mark as complete"
              className="h-7 w-7 rounded-lg flex items-center justify-center text-[#B0AEB8] dark:text-[#6F6C79] hover:bg-[#EEF0FC] dark:hover:bg-white/10 hover:text-[#4F3FF0] dark:hover:text-[#8C7CF7] transition-colors"
            >
              <CheckCircle2 size={17} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const isEmpty = activities.overdue.length === 0 && activities.recent.length === 0;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-[28px] font-bold font-sora text-[#15131C] dark:text-white">
          Pending Activity
        </h1>

        <p className="text-[#6F6C79] dark:text-[#A6A3AF] mt-1 text-[15px]">
          Keep track of unfinished tasks.
        </p>
      </div>

      {loading ? (
        <div>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <>
          {activities.recent.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Clock size={15} className="text-white" strokeWidth={2.3} />
                </span>
                <h2 className="font-bold text-[15px] text-[#D97706] dark:text-amber-400 font-sora">
                  Recently Pending
                </h2>
                <span className="text-[11px] font-bold text-[#D97706] dark:text-amber-400 bg-[#FFF3E6] dark:bg-amber-400/15 rounded-full h-5 w-5 flex items-center justify-center">
                  {activities.recent.length}
                </span>
                <span className="text-[11px] text-[#B0AEB8] dark:text-[#6F6C79] font-normal">
                  within the last 3 days
                </span>
              </div>

              {activities.recent.map((task) => renderCard(task, false))}
            </div>
          )}

          {activities.overdue.length > 0 && (
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#F87171] flex items-center justify-center shadow-lg shadow-red-500/20">
                  <AlertCircle size={15} className="text-white" strokeWidth={2.3} />
                </span>
                <h2 className="font-bold text-[15px] text-[#DC2626] dark:text-red-400 font-sora">
                  Overdue
                </h2>
                <span className="text-[11px] font-bold text-[#DC2626] dark:text-red-400 bg-[#FFE5E5] dark:bg-red-400/15 rounded-full h-5 w-5 flex items-center justify-center">
                  {activities.overdue.length}
                </span>
                <span className="text-[11px] text-[#B0AEB8] dark:text-[#6F6C79] font-normal">
                  more than 3 days ago
                </span>
              </div>

              {activities.overdue.map((task) => renderCard(task, true))}
            </div>
          )}

          {isEmpty && (
            <div className="rounded-3xl border border-dashed border-[#D9D7E3] dark:border-white/10 p-12 text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-[#F7F6FB] dark:bg-white/5 flex items-center justify-center mb-4">
                <Clock size={26} className="text-[#B7B4C0] dark:text-[#6F6C79]" strokeWidth={1.8} />
              </div>

              <h3 className="font-semibold text-[#15131C] dark:text-white font-sora">
                No Pending Activities
              </h3>

              <p className="text-sm text-[#8A8794] dark:text-[#6F6C79] mt-2">
                You're all caught up 🎉
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}