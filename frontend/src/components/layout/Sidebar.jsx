import {
  LayoutDashboard, CalendarDays, Mic, CircleCheck, History,
  Settings, User, Moon, Sun, Sparkles, LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Daily Planner", icon: CalendarDays, path: "/planner" },
  { title: "Meeting Summarizer", icon: Mic, path: "/summarizer" },
  { title: "Task Prioritizer", icon: CircleCheck, path: "/prioritizer" },
];
const secondaryItems = [{ title: "Activity History", icon: History, path: "/history" }];
const settingsItems = [
  { title: "Settings", icon: Settings, path: "/settings" },
  { title: "Profile", icon: User, path: "/profile" },
];

function NavItem({ title, icon: Icon, path, end, collapsed }) {
  return (
    <NavLink to={path} end={end} className="relative block group">
      {({ isActive }) => (
        <div
          className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors duration-200 ${
            collapsed ? "justify-center" : ""
          } ${isActive ? "text-[#15131C] font-semibold" : "text-[#6F6C79] font-medium hover:text-[#15131C]"}`}
        >
          {isActive && (
            <motion.div
              layoutId="sidebar-active-pill"
              className="absolute inset-0 rounded-xl bg-[#EEF0FC]"
              transition={{ type: "spring", stiffness: 500, damping: 38 }}
            />
          )}
          {!isActive && (
            <div className="absolute inset-0 rounded-xl bg-[#F7F6FB] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          )}
          <Icon size={19} strokeWidth={2.1} className="relative shrink-0" />
          {!collapsed && <span className="relative text-[14px] whitespace-nowrap">{title}</span>}
        </div>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 288 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="h-screen bg-white flex flex-col justify-between p-5 sticky top-0 shrink-0 overflow-hidden border-r border-[#F3F1FA]"
    >
      <div>
        <div className={`flex items-center mb-10 ${collapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8C7CF7] to-[#4F9EF5] text-white shadow-lg shadow-[#4F3FF0]/20">
              <Sparkles size={18} strokeWidth={2.4} />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-[18px] font-bold text-[#15131C] tracking-tight whitespace-nowrap leading-tight font-sora">
                  ProdigyAI
                </h1>
                <p className="text-[11.5px] text-[#A6A3AF] whitespace-nowrap leading-tight">
                  Productivity, upgraded
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6">
          <div className="space-y-1">
            {!collapsed && <p className="text-[10.5px] text-[#B0AEB8] uppercase mb-2 font-semibold tracking-[0.08em] px-1">Workspace</p>}
            {menuItems.map((item) => (
              <NavItem key={item.path} {...item} end={item.path === "/"} collapsed={collapsed} />
            ))}
          </div>

          <div className="space-y-1">
            {!collapsed && <p className="text-[10.5px] text-[#B0AEB8] uppercase mb-2 font-semibold tracking-[0.08em] px-1">Account</p>}
            {[...secondaryItems, ...settingsItems].map((item) => (
              <NavItem key={item.path} {...item} collapsed={collapsed} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="space-y-2 pt-6 border-t border-[#F7F6FB]">
        <button
          onClick={() => setIsDark((d) => !d)}
          className={`flex items-center gap-3 text-[#6F6C79] hover:text-[#15131C] transition-colors duration-200 px-3 py-2.5 rounded-xl hover:bg-[#F7F6FB] w-full ${collapsed ? "justify-center" : "justify-between"}`}
        >
          <span className="flex items-center gap-3">
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            {!collapsed && <span className="text-[13.5px] font-medium">Dark Mode</span>}
          </span>
          {!collapsed && (
            <span className={`h-5 w-9 rounded-full flex items-center px-0.5 transition-colors duration-200 ${isDark ? "bg-[#4F3FF0]" : "bg-[#E7E5F0]"}`}>
              <motion.span
                animate={{ x: isDark ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="h-4 w-4 rounded-full bg-white shadow"
              />
            </span>
          )}
        </button>

        <button className={`flex items-center gap-3 text-[#B0AEB8] hover:text-red-500 transition-colors duration-200 px-3 py-2.5 rounded-xl hover:bg-red-50 w-full ${collapsed ? "justify-center" : ""}`}>
          <LogOut size={17} />
          {!collapsed && <span className="text-[13.5px] font-medium">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}