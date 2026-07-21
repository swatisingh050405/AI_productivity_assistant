
import { motion } from "framer-motion";
import {Sparkles} from "lucide-react";



export default function BrandPanel() {
    const year = new Date().getFullYear();
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-[42%] shrink-0 p-12 overflow-hidden bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5]">
      {/* Ambient dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center gap-2.5">
        <span className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
          <Sparkles size={18} className="text-white" strokeWidth={2.2} />
        </span>
        <span className="text-white text-[18px] font-bold tracking-tight font-sora">ProdigyAI</span>
      </div>

      <div className="relative">
        {/* Orbiting mark — same motif as RobotMascot */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-white/70" />
            <span className="absolute bottom-3 right-1 h-2 w-2 rounded-full bg-[#FFD9C7]" />
          </motion.div>
          <div className="absolute inset-2 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="white" />
            </svg>
          </div>
        </motion.div>

        <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight font-sora max-w-[320px]">
          Let's make today remarkably productive.
        </h1>
        <p className="text-white/70 text-[14.5px] mt-3 max-w-[300px] leading-relaxed">
          Plan your day, prioritize tasks, summarize meetings, and track your productivity — all powered by AI.
        </p>
      </div>

      <p className="relative text-white/50 text-[12.5px] font-medium">
        © {year} ProdigyAI
      </p>
    </div>
  );
}