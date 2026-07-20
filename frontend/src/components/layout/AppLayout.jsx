import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Target } from "lucide-react";

const FloatingIcon = ({ icon: Icon, className, delay }) => (
  <motion.div
    className={`absolute pointer-events-none text-black/5 dark:text-white/5 ${className}`}
    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Icon size={48} strokeWidth={1} />
  </motion.div>
);

// Fixed positions so stars don't jump around on re-render.
const STARS = [
  { top: "8%", left: "12%", size: 2 },
  { top: "18%", left: "82%", size: 1.5 },
  { top: "30%", left: "45%", size: 2.5 },
  { top: "42%", left: "8%", size: 1.5 },
  { top: "55%", left: "92%", size: 2 },
  { top: "65%", left: "25%", size: 1.5 },
  { top: "75%", left: "60%", size: 2 },
  { top: "85%", left: "15%", size: 1.5 },
  { top: "22%", left: "65%", size: 1.5 },
  { top: "48%", left: "78%", size: 2 },
  { top: "90%", left: "48%", size: 1.5 },
  { top: "12%", left: "35%", size: 1.5 },
  { top: "60%", left: "5%", size: 2 },
  { top: "38%", left: "55%", size: 1.5 },
];

// Twinkling stars — only rendered visually in dark mode via `dark:block`.
const StarField = () => (
  <div className="hidden dark:block pointer-events-none absolute inset-0 overflow-hidden">
    {STARS.map((star, i) => (
      <motion.span
        key={i}
        className="absolute rounded-full bg-white"
        style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
        animate={{ opacity: [0.15, 0.9, 0.15] }}
        transition={{
          duration: 2.5 + (i % 3),
          repeat: Infinity,
          delay: (i * 0.35) % 3,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Occasional shooting stars — subtle, rare, dark mode only.
const ShootingStar = ({ top, left, delay }) => (
  <motion.div
    className="hidden dark:block absolute h-[2px] w-[90px] rounded-full pointer-events-none"
    style={{
      top,
      left,
      background: "linear-gradient(90deg, rgba(255,255,255,0.9), transparent)",
      rotate: "-32deg",
    }}
    initial={{ opacity: 0, x: 0, y: 0 }}
    animate={{ opacity: [0, 1, 0], x: [0, 240], y: [0, 155] }}
    transition={{
      duration: 1.4,
      repeat: Infinity,
      repeatDelay: 7,
      delay,
      ease: "easeOut",
    }}
  />
);

export default function AppLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#fdfdfd] dark:bg-[#0F0E14] relative overflow-hidden">
      <motion.div className="pointer-events-none absolute -top-24 right-[10%] w-[460px] h-[460px] rounded-full bg-[#4F3FF0]/[0.05] dark:bg-[#4F3FF0]/[0.1] blur-3xl" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#FF6B4A]/[0.05] dark:bg-[#FF6B4A]/[0.08] blur-3xl" animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />

      <StarField />
      <ShootingStar top="15%" left="10%" delay={0} />
      <ShootingStar top="55%" left="70%" delay={4} />

      <FloatingIcon icon={Sparkles} className="top-[15%] left-[10%]" delay={0} />
      <FloatingIcon icon={Brain} className="top-[60%] right-[15%]" delay={2} />
      <FloatingIcon icon={Zap} className="top-[20%] right-[5%]" delay={4} />
      <FloatingIcon icon={Target} className="bottom-[10%] left-[5%]" delay={1} />

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <Navbar onToggleSidebar={() => setCollapsed((c) => !c)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}