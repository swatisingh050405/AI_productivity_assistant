import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import FeatureCard from "../components/common/FeatureCard";
import ActivityItem from "../components/common/ActivityItem";
import ProgressRing from "../components/common/ProgressRing";
import TipCard from "../components/common/TipCard";
import QuoteCard from "../components/common/QuoteCard";
import RobotMascot from "../components/common/RobotMascot";
import { useAuth } from "../context/AuthContext";

import { featureCards, dailyQuote } from "../data/mockData";
import {
  getDashboardTasks,
  completeTask,
} from "../services/taskService";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "Guest";

  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    progress: 0,
  });

  // Shared fetch function — usable anywhere (handlers, etc.)
  const fetchTasks = async () => {
    try {
      const data = await getDashboardTasks();

      setTasks(data.tasks);
      setStats(data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      // Reload tasks after marking completed — safe, triggered by user action
      await fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Single effect: initial load (guarded) + subscribe to external updates
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const data = await getDashboardTasks();

        if (!ignore) {
          setTasks(data.tasks);
          setStats(data.stats);
        }
      } catch (err) {
        if (!ignore) console.error(err);
      }
    };

    load();

    const handleTasksUpdated = () => {
      load();
    };

    window.addEventListener("tasksUpdated", handleTasksUpdated);

    return () => {
      ignore = true;
      window.removeEventListener("tasksUpdated", handleTasksUpdated);
    };
  }, []);



  return (
    <motion.main
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <section className="flex items-center justify-between">
        <motion.div variants={itemVariants}>
          <h1 className="text-[28px] font-bold text-[#15131C] dark:text-white tracking-tight font-sora">
            Good Morning, {firstName} <span>👋</span>
          </h1>

          <p className="text-[#6F6C79] dark:text-[#A6A3AF] mt-1.5 text-[15px] font-sans">
            Let's make today productive and amazing.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <RobotMascot />
        </motion.div>
      </section>

      {/* Main */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* Left */}
        <div className="xl:col-span-2 space-y-8">

          <section>
            <h2 className="text-[15px] font-semibold text-[#15131C] dark:text-white mb-4 font-sora">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featureCards.map((card) => (
                <motion.div key={card.id} variants={itemVariants}>
                  <FeatureCard {...card} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-white dark:bg-[#1C1B24] rounded-3xl shadow-[0_1px_2px_rgba(21,19,28,0.04)] dark:shadow-none border border-transparent dark:border-white/10 p-6">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
                Today's Tasks
              </h2>
            </div>

            {tasks.length === 0 ? (
              <div className="py-10 text-center text-[#8E8C96] dark:text-[#6F6C79] text-sm">
                No tasks yet.
              </div>
            ) : (
              <div className="space-y-1">
                {tasks
                  .slice(0, 6)
                  .map((task, index, arr) => (
                    <ActivityItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      time={task.deadline}
                      source={task.source}
                      tag={task.priority}
                      status={task.status}
                      onComplete={handleComplete}
                      isLast={index === arr.length - 1}
                    />
                  ))}
              </div>
            )}
          </section>

        </div>

        {/* Right */}
        <aside className="space-y-6">

          <motion.div variants={itemVariants}>
            <QuoteCard {...dailyQuote} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ProgressRing
              progress={stats.progress}
              totalTasks={stats.total_tasks}
              completedTasks={stats.completed_tasks}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TipCard />
          </motion.div>

        </aside>

      </div>
    </motion.main>
  );
}