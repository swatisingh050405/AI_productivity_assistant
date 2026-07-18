import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Target } from "lucide-react";

const FloatingIcon = ({ icon: Icon, className, delay }) => (
  <motion.div
    className={`absolute pointer-events-none text-black/5 ${className}`}
    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <Icon size={48} strokeWidth={1} />
  </motion.div>
);

export default function AppLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#fdfdfd] relative overflow-hidden">
      <motion.div className="pointer-events-none absolute -top-24 right-[10%] w-[460px] h-[460px] rounded-full bg-[#4F3FF0]/[0.05] blur-3xl" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#FF6B4A]/[0.05] blur-3xl" animate={{ x: [0, -30, 0], y: [0, -20, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />

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