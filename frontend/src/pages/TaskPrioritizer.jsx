import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import { generatePriority } from "../services/taskService";
import TaskInput from "../components/prioritizer/TaskInput";
import PriorityOutput from "../components/prioritizer/PriorityOutput";

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

const DRAFT_KEY = "prodigyai_prioritizer_draft";
const DRAFT_TTL_MS = 10 * 60 * 1000; // 10 minutes

function loadDraft(isAuthenticated) {
  if (!isAuthenticated) return [];

  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return [];

  try {
    const { output, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > DRAFT_TTL_MS) {
      sessionStorage.removeItem(DRAFT_KEY);
      return [];
    }
    return output;
  } catch {
    sessionStorage.removeItem(DRAFT_KEY);
    return [];
  }
}

export default function TaskPrioritizer() {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const [output, setOutput] = useState(() => loadDraft(isAuthenticated));

  // Keep the last prioritized list cached (logged-in users only) so
  // navigating away and back within 10 minutes restores it.
  useEffect(() => {
    if (isAuthenticated && output.length > 0) {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ output, savedAt: Date.now() })
      );
    }
  }, [output, isAuthenticated]);

  const handleGenerate = async (new_tasks) => {
    try {
      setLoading(true);
      sessionStorage.removeItem(DRAFT_KEY);

      const data = await generatePriority(new_tasks);

      setOutput(data.tasks || []);

      // Refresh dashboard
      if (isAuthenticated) {
        window.dispatchEvent(new Event("tasksUpdated"));
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-[28px] font-bold text-[#15131C] dark:text-white tracking-tight font-sora">
          Task Prioritizer
        </h1>

        <p className="mt-1.5 text-[15px] text-[#6F6C79] dark:text-[#A6A3AF]">
          Let AI prioritize your tasks based on urgency and importance.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <TaskInput
          onGenerate={handleGenerate}
          loading={loading}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <PriorityOutput tasks={output} />
      </motion.div>
    </motion.div>
  );
}