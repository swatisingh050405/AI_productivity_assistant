import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FeatureCard({ title, description, icon: Icon, iconBg, accent, button, path }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative overflow-hidden rounded-[28px] p-7 border border-[#EDEBF5] dark:border-white/10 bg-white dark:bg-[#1C1B24] shadow-[0_2px_12px_-4px_rgba(21,19,28,0.06)] dark:shadow-none hover:shadow-[0_16px_40px_-12px_rgba(21,19,28,0.14)] dark:hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Signature watermark: oversized ghost icon, drifts on hover */}
      <motion.div
        variants={{ rest: { x: 0, y: 0, rotate: 0 }, hover: { x: -6, y: -6, rotate: 6 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute -right-5 -top-5 pointer-events-none"
        style={{ color: accent, opacity: 0.07 }}
      >
        <Icon size={128} strokeWidth={1.4} />
      </motion.div>

      <div className="relative flex flex-col h-full">
        <div
          className="w-11 h-11 rounded-[14px] flex items-center justify-center text-white mb-6 shrink-0"
          style={{ backgroundColor: iconBg, boxShadow: `0 6px 16px -4px ${iconBg}66` }}
        >
          <Icon size={20} strokeWidth={2.1} />
        </div>

        <h2
          className="text-[17px] font-bold text-[#15131C] dark:text-white leading-snug min-h-[46px] flex items-start"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {title}
        </h2>

        <p className="text-[#6F6C79] dark:text-[#A6A3AF] text-[13.5px] mt-2 leading-relaxed max-w-[85%] flex-1">
          {description}
        </p>

        <Link
          to={path}
          className="inline-flex items-center gap-1.5 self-start mt-6 text-[13px] font-semibold px-3.5 py-2 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5"
          style={{ color: accent, backgroundColor: `${iconBg}18` }}
        >
          <span>{button}</span>
          <motion.span
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex"
          >
            <ArrowUpRight size={15} strokeWidth={2.3} />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}