import { LogOut, Sparkles } from "lucide-react";
import { PanelLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const FLOATERS = [
  { top: "20%", left: "8%", size: 4, delay: 0 },
  { top: "60%", left: "18%", size: 3, delay: 0.6 },
  { top: "35%", left: "30%", size: 3.5, delay: 1.2 },
  { top: "70%", left: "42%", size: 3, delay: 0.3 },
  { top: "25%", left: "55%", size: 4, delay: 1.6 },
  { top: "55%", left: "68%", size: 3, delay: 0.9 },
  { top: "30%", left: "80%", size: 3.5, delay: 1.9 },
  { top: "65%", left: "92%", size: 3, delay: 0.4 },
];

export default function Navbar({ onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="relative h-20 bg-white dark:bg-[#15131C] flex items-center gap-4 px-6 md:px-8 sticky top-0 z-20">
      {/* Animated gradient border — visually separates navbar from page body */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-[200%] bg-gradient-to-r from-transparent via-[#4F3FF0] to-transparent dark:via-[#8C7CF7]"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <button
        onClick={onToggleSidebar}
        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-[#6F6C79] dark:text-[#A6A3AF] hover:bg-[#F7F6FB] dark:hover:bg-white/5 hover:text-[#15131C] dark:hover:text-white transition-colors duration-200"
      >
        <PanelLeft size={18} strokeWidth={2} />
      </button>

      {/* Minimal ambient element — replaces the non-functional search bar.
          Purely decorative, no data fetching, no backend dependency. */}
      <div className="flex-1 min-w-0 relative h-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F7F6FB] via-[#FAFAFF] to-[#F7F6FB] dark:from-white/[0.05] dark:via-white/[0.08] dark:to-white/[0.05]">
        {/* Floating sparkle dots drifting gently */}
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5]"
            style={{ top: f.top, left: f.left, width: f.size, height: f.size }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Slow shimmer sweep across the pill */}
        <motion.div
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/60 dark:via-white/15 to-transparent"
          animate={{ x: ["-10%", "110%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
        />

        {/* Centered brand mark, subtle */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
          <motion.span
            animate={{ rotate: [0, 12, 0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={15} className="text-[#4F3FF0] dark:text-[#8C7CF7]" strokeWidth={2.2} />
          </motion.span>
          <span className="text-[13px] font-bold tracking-wide text-[#3A3742] dark:text-[#E4E2EB]">
            ProdigyAI
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center rounded-full hover:ring-2 hover:ring-[#F7F6FB] dark:hover:ring-white/10 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8EF5] to-[#4F3FF0] flex items-center justify-center text-white text-[13px] font-semibold shrink-0"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {user?.initials || "?"}
              </div>
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2.5 w-56 rounded-2xl bg-white dark:bg-[#1C1B24] shadow-[0_12px_32px_-8px_rgba(21,19,28,0.16)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] border border-transparent dark:border-white/10 p-1.5"
                >
                  <div className="px-3 py-2.5 mb-1 border-b border-[#F3F1FA] dark:border-white/10">
                    <p className="text-[13.5px] font-semibold text-[#15131C] dark:text-white truncate font-sora">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-[12px] text-[#8E8C96] dark:text-[#6F6C79] truncate font-sans">
                      {user?.email || ""}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-150"
                  >
                    <LogOut size={15} /> Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <Link
              to="/login"
              className="text-[13px] font-semibold text-[#6F6C79] dark:text-[#A6A3AF] hover:text-[#15131C] dark:hover:text-white px-3.5 py-2 rounded-xl hover:bg-[#F7F6FB] dark:hover:bg-white/5 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="text-[13px] font-semibold text-white bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] px-4 py-2 rounded-xl shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}