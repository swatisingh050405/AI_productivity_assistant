import { PanelLeft, Search, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar({ onToggleSidebar }) {
  const [focused, setFocused] = useState(false);
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
    <header className="h-20 bg-white dark:bg-[#15131C] flex items-center gap-4 px-6 md:px-8 sticky top-0 z-20 border-b border-transparent dark:border-white/10">
      <button
        onClick={onToggleSidebar}
        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-[#6F6C79] dark:text-[#A6A3AF] hover:bg-[#F7F6FB] dark:hover:bg-white/5 hover:text-[#15131C] dark:hover:text-white transition-colors duration-200"
      >
        <PanelLeft size={18} strokeWidth={2} />
      </button>

      <div className="flex-1 relative">
        <Search
          size={17}
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused ? "text-[#4F3FF0]" : "text-[#B0AEB8] dark:text-[#6F6C79]"
          }`}
        />
        <input
          type="text"
          placeholder="Search tasks, meetings, notes..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-[#F7F6FB] dark:bg-white/5 rounded-2xl pl-11 pr-14 py-3 text-sm text-[#15131C] dark:text-white placeholder:text-[#A6A3AF] dark:placeholder:text-[#6F6C79] outline-none transition-all duration-200 focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-[#4F3FF0]/15"
        />
        <span className="hidden sm:flex items-center absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#B0AEB8] dark:text-[#6F6C79] border border-[#E7E5F0] dark:border-white/10 rounded-md px-1.5 py-0.5">
          ⌘K
        </span>
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