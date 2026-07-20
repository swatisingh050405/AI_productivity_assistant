import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

function scoreMessage(progress) {
  if (progress >= 80) return "Outstanding productivity";
  if (progress >= 60) return "You're on the right track";
  if (progress >= 40) return "Keep pushing forward";
  return "Time to focus and catch up";
}

export default function ProgressRing({
  progress = 0,
  totalTasks = 0,
  completedTasks = 0,
}) {
  const { isDark } = useTheme();
  const size = 216;
  const stroke = 14;
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - stroke) / 2;

  const halfCircumference = Math.PI * radius;

  const dashOffset =
    halfCircumference - (progress / 100) * halfCircumference;

  const arcPath = `M ${cx - radius} ${cy}
                   A ${radius} ${radius}
                   0 0 1
                   ${cx + radius} ${cy}`;

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, progress, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return () => controls.stop();
  }, [progress]);

  // SVG attributes don't respond to Tailwind's dark: variant automatically,
  // so these colors are picked in JS via the theme context instead.
  const trackColor = isDark ? "#2A2833" : "#F3F1FA";
  const axisTextColor = isDark ? "#6F6C79" : "#B0AEB8";
  const emptySegmentColor = isDark ? "#2A2833" : "#F1F0F7";

  return (
    <div className="bg-white dark:bg-[#1C1B24] rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-[#F8F7FA] dark:border-white/10">

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[17px] font-semibold text-[#15131C] dark:text-white font-sora">
          Productivity Score
        </h2>

        <span className="flex items-center gap-1.5 text-[11.5px] text-[#6F6C79] dark:text-[#A6A3AF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4F3FF0]" />
          Today
        </span>
      </div>

      <div
        className="relative mx-auto mt-2"
        style={{ width: size, height: size / 2 + 34 }}
      >
        <svg
          width={size}
          height={size / 2 + stroke}
          viewBox={`0 0 ${size} ${size / 2 + stroke}`}
        >
          <defs>
            <linearGradient
              id="ringGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4F3FF0" />
              <stop offset="100%" stopColor="#4F9EF5" />
            </linearGradient>
          </defs>

          <path
            d={arcPath}
            stroke={trackColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />

          <motion.path
            d={arcPath}
            stroke="url(#ringGradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={halfCircumference}
            initial={{ strokeDashoffset: halfCircumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1 }}
          />

          <text
            x={stroke / 2}
            y={size / 2 + stroke - 2}
            fontSize="9.5"
            fill={axisTextColor}
          >
            0
          </text>

          <text
            x={size - stroke / 2}
            y={size / 2 + stroke - 2}
            textAnchor="end"
            fontSize="9.5"
            fill={axisTextColor}
          >
            100
          </text>
        </svg>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-[38px] font-bold text-[#15131C] dark:text-white font-sora">
            {displayValue}%
          </span>

          <span className="text-[12px] text-[#6F6C79] dark:text-[#A6A3AF] mt-1.5">
            {scoreMessage(progress)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-[#F7F6FB] dark:border-white/10">

        <div className="flex items-baseline justify-between mb-2.5">
          <p className="text-[13px] font-semibold text-[#15131C] dark:text-white">
            {completedTasks}
            <span className="text-[#B0AEB8] dark:text-[#6F6C79] font-medium">
              {" "}of {totalTasks} tasks
            </span>
          </p>

          <p className="text-[11.5px] text-[#6F6C79] dark:text-[#A6A3AF]">
            {Math.max(totalTasks - completedTasks, 0)} remaining
          </p>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: Math.max(totalTasks, 1) }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0.3, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="h-6 flex-1 rounded-md"
              style={{
                background:
                  i < completedTasks
                    ? "linear-gradient(180deg,#4F3FF0,#4F9EF5)"
                    : emptySegmentColor,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}