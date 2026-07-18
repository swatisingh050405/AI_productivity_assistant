import { useState } from "react";
import { motion } from "framer-motion";

import TranscriptInput from "../components/summarizer/TranscriptInput";
import SummaryOutput from "../components/summarizer/SummaryOutput";
import MeetingHighlights from "../components/summarizer/MeetingHighlights";

import { streamSummary } from "../services/summarizerService";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function MeetingSummarizer() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (text) => {
    setSummary("");
    setLoading(true);

    streamSummary(
      text,
      (chunk) => setSummary(chunk),
      () => setLoading(false),
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
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
          Meeting Summarizer
        </h1>
        <p className="text-[#6F6C79] mt-1.5 text-[15px] font-sans">
          Paste a transcript and get an AI-powered summary in seconds.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        <motion.div variants={itemVariants}>
          <TranscriptInput onGenerate={handleGenerate} loading={loading} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SummaryOutput summary={summary} loading={loading} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <MeetingHighlights summary={summary} />
      </motion.div>
    </motion.div>
  );
}