import { AnimatePresence, motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function AlertModal({ open, title, message, confirmLabel = "Got it", onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onConfirm}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[380px] bg-white dark:bg-[#1C1B24] rounded-3xl border border-[#EEECF8] dark:border-white/10 shadow-[0_24px_60px_-12px_rgba(21,19,28,0.25)] p-7 text-center"
          >
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center mb-5 shadow-lg shadow-[#4F3FF0]/20">
              <LogIn size={20} className="text-white" strokeWidth={2.2} />
            </div>

            <h2 className="text-[17px] font-bold text-[#15131C] dark:text-white font-sora mb-2">
              {title}
            </h2>

            <p className="text-[13.5px] text-[#6F6C79] dark:text-[#A6A3AF] leading-relaxed mb-6">
              {message}
            </p>

            <button
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white text-[14px] font-semibold py-3 rounded-xl shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all"
            >
              {confirmLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}