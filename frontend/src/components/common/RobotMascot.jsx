import { motion } from "framer-motion";

export default function RobotMascot() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative shrink-0 hidden md:flex items-center justify-center w-[72px] h-[72px]"
    >
      <div className="absolute inset-0 rounded-full bg-[#4F3FF0]/20 blur-2xl" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#4F9EF5]" />
        <span className="absolute bottom-2 right-1 h-1.5 w-1.5 rounded-full bg-[#FF6B4A]" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center shadow-lg shadow-[#4F3FF0]/30"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="white" />
        </svg>
      </motion.div>
    </motion.div>
  );
}