import {
  LayoutDashboard, CalendarDays, Mic, CircleCheck, Clock,
  Sun, Moon, Sparkles, LogOut, LogIn, UserPlus,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Daily Planner", icon: CalendarDays, path: "/planner" },
  { title: "Meeting Summarizer", icon: Mic, path: "/summarizer" },
  { title: "Task Prioritizer", icon: CircleCheck, path: "/prioritizer" },
];

const activityItem = { title: "Pending Activity", icon: Clock, path: "/pending" };

function NavItem({ title, icon: Icon, path, end, collapsed }) {
  return (
    <NavLink to={path} end={end} className="relative block group">
      {({ isActive }) => (
        <div
          className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors duration-200 ${
            collapsed ? "justify-center" : ""
          } ${isActive ? "text-[#15131C] dark:text-white font-semibold" : "text-[#6F6C79] dark:text-[#A6A3AF] font-medium hover:text-[#15131C] dark:hover:text-white"}`}
        >
          {isActive && (
            <motion.div
              layoutId="sidebar-active-pill"
              className="absolute inset-0 rounded-xl bg-[#EEF0FC] dark:bg-white/10"
              transition={{ type: "spring", stiffness: 500, damping: 38 }}
            />
          )}
          {!isActive && (
            <div className="absolute inset-0 rounded-xl bg-[#F7F6FB] dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          )}
          <Icon size={19} strokeWidth={2.1} className="relative shrink-0" />
          {!collapsed && <span className="relative text-[14px] whitespace-nowrap">{title}</span>}
        </div>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 288 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="h-screen bg-white dark:bg-[#15131C] flex flex-col justify-between p-5 sticky top-0 shrink-0 overflow-hidden border-r border-[#F3F1FA] dark:border-white/10"
    >
      <div>
        <div className={`flex items-center mb-10 ${collapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8C7CF7] to-[#4F9EF5] text-white shadow-lg shadow-[#4F3FF0]/20">
              <Sparkles size={18} strokeWidth={2.4} />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="text-[18px] font-bold text-[#15131C] dark:text-white tracking-tight whitespace-nowrap leading-tight font-sora">
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
            {!collapsed && <p className="text-[10.5px] text-[#B0AEB8] uppercase mb-2 font-semibold tracking-[0.08em] px-1">Activity</p>}
            <NavItem {...activityItem} collapsed={collapsed} />
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="space-y-2 pt-6 border-t border-[#F7F6FB] dark:border-white/10">
        {isAuthenticated && !collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F8EF5] to-[#4F3FF0] flex items-center justify-center text-white text-[11.5px] font-semibold shrink-0 font-sora">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#15131C] dark:text-white truncate font-sans">{user.name}</p>
              <p className="text-[11px] text-[#B0AEB8] truncate font-sans">{user.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 text-[#6F6C79] dark:text-[#A6A3AF] hover:text-[#15131C] dark:hover:text-white transition-colors duration-200 px-3 py-2.5 rounded-xl hover:bg-[#F7F6FB] dark:hover:bg-white/5 w-full ${collapsed ? "justify-center" : "justify-between"}`}
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

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 text-[#B0AEB8] hover:text-red-500 transition-colors duration-200 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 w-full ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={17} />
            {!collapsed && <span className="text-[13.5px] font-medium">Logout</span>}
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className={`flex items-center gap-3 text-[#6F6C79] dark:text-[#A6A3AF] hover:text-[#15131C] dark:hover:text-white transition-colors duration-200 px-3 py-2.5 rounded-xl hover:bg-[#F7F6FB] dark:hover:bg-white/5 w-full ${collapsed ? "justify-center" : ""}`}
            >
              <LogIn size={17} />
              {!collapsed && <span className="text-[13.5px] font-medium">Log In</span>}
            </button>
            <button
              onClick={() => navigate("/signup")}
              className={`flex items-center gap-3 text-white bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] transition-all duration-200 px-3 py-2.5 rounded-xl hover:brightness-110 w-full shadow-lg shadow-[#4F3FF0]/20 ${collapsed ? "justify-center" : ""}`}
            >
              <UserPlus size={17} />
              {!collapsed && <span className="text-[13.5px] font-medium">Sign Up</span>}
            </button>
          </>
        )}
      </div>
    </motion.aside>
  );
}