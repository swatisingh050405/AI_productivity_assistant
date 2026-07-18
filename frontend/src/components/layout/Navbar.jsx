import { PanelLeft, Search, Bell, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const CURRENT_USER = { name: "Alex Morgan", initials: "AM" };

export default function Navbar({ onToggleSidebar }) {
  const [focused, setFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="h-20 bg-white flex items-center gap-4 px-6 md:px-8 sticky top-0 z-20">
      <button
        onClick={onToggleSidebar}
        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl text-[#6F6C79] hover:bg-[#F7F6FB] hover:text-[#15131C] transition-colors duration-200"
      >
        <PanelLeft size={18} strokeWidth={2} />
      </button>

      <div className="flex-1 relative">
        <Search
          size={17}
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            focused ? "text-[#4F3FF0]" : "text-[#B0AEB8]"
          }`}
        />
        <input
          type="text"
          placeholder="Search tasks, meetings, notes..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-[#F7F6FB] rounded-2xl pl-11 pr-14 py-3 text-sm text-[#15131C] placeholder:text-[#A6A3AF] outline-none transition-all duration-200 focus:bg-white focus:ring-2 focus:ring-[#4F3FF0]/15"
        />
        <span className="hidden sm:flex items-center absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#B0AEB8] border border-[#E7E5F0] rounded-md px-1.5 py-0.5">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#F7F6FB] transition-colors duration-200">
          <Bell size={19} className="text-[#6F6C79]" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#8C5CF7] ring-2 ring-white" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center rounded-full hover:ring-2 hover:ring-[#F7F6FB] transition-all duration-200"
          >
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8EF5] to-[#4F3FF0] flex items-center justify-center text-white text-[13px] font-semibold shrink-0"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {CURRENT_USER.initials}
            </div>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2.5 w-44 rounded-2xl bg-white shadow-[0_12px_32px_-8px_rgba(21,19,28,0.16)] p-1.5"
              >
                <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-150">
                  <LogOut size={15} /> Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}