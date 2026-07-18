import { useState } from "react";
import { motion } from "framer-motion";

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

export default function TaskPrioritizer() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);

  const handleGenerate = async (text) => {
    try {
      setLoading(true);

      const data = await generatePriority(text);

      setOutput(data.tasks || []);
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
        <h1 className="text-[28px] font-bold text-[#15131C] tracking-tight font-sora">
          Task Prioritizer
        </h1>

        <p className="mt-1.5 text-[15px] text-[#6F6C79]">
          Let AI prioritize your tasks based on urgency and importance.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        <motion.div variants={itemVariants}>
          <TaskInput
            onGenerate={handleGenerate}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PriorityOutput
            tasks={output}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}