import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

import TranscriptInput from "../components/summarizer/TranscriptInput";
import SummaryOutput from "../components/summarizer/SummaryOutput";
import MeetingHighlights from "../components/summarizer/MeetingHighlights";

import { generateSummary } from "../services/summarizerService";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const DRAFT_KEY = "prodigyai_summarizer_draft";
const DRAFT_TTL_MS = 10 * 60 * 1000;

function loadDraft(isAuthenticated) {
  if (!isAuthenticated) return null;

  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  try {
    const { result, savedAt } = JSON.parse(raw);

    if (Date.now() - savedAt > DRAFT_TTL_MS) {
      sessionStorage.removeItem(DRAFT_KEY);
      return null;
    }

    return result;
  } catch {
    sessionStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

export default function MeetingSummarizer() {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(() =>
    loadDraft(isAuthenticated)
  );

  // Save latest summary
  useEffect(() => {
    if (!isAuthenticated || !result) return;

    sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        result,
        savedAt: Date.now(),
      })
    );
  }, [result, isAuthenticated]);

  const handleGenerate = async (text) => {
    try {
      setLoading(true);

      sessionStorage.removeItem(DRAFT_KEY);

      const data = await generateSummary(text);

      setResult(data);

      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          result: data,
          savedAt: Date.now(),
        })
      );

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
      className="max-w-[1200px] mx-auto space-y-8 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-[28px] font-bold text-[#15131C] tracking-tight font-sora">
          Meeting Summarizer
        </h1>

        <p className="text-[#6F6C79] mt-1.5 text-[15px]">
          Paste a transcript and get an AI-powered summary in seconds.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        <motion.div variants={itemVariants} className="h-full">
          <TranscriptInput
            onGenerate={handleGenerate}
            loading={loading}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <SummaryOutput
            summary={result?.summary || null}
            loading={loading}
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <MeetingHighlights
          highlights={result?.highlights || []}
        />
      </motion.div>
    </motion.div>
  );
}