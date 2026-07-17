import {
  LayoutDashboard,
  CalendarDays,
  Mic,
  CircleCheck,
  History,
  Settings,
  User,
  Moon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Daily Planner",
    icon: CalendarDays,
    path: "/planner",
  },
  {
    title: "Meeting Summarizer",
    icon: Mic,
    path: "/summarizer",
  },
  {
    title: "Task Prioritizer",
    icon: CircleCheck,
    path: "/prioritizer",
  },
];

const secondaryItems = [
  {
    title: "Activity History",
    icon: History,
    path: "/history",
  },
];

const settingsItems = [
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-white border-r flex flex-col justify-between p-6">

      <div>

        <h1 className="text-2xl font-bold text-violet-600 mb-10">
          ✨ ProdigyAI
        </h1>

        <div className="space-y-2">

          <p className="text-xs text-gray-400 uppercase mb-2">
            AI Tools
          </p>

          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-violet-100 text-violet-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <item.icon size={20} />
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className="mt-10 space-y-2">

          <p className="text-xs text-gray-400 uppercase mb-2">
            History
          </p>

          {secondaryItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              <item.icon size={20} />
              {item.title}
            </NavLink>
          ))}
        </div>

        <div className="mt-10 space-y-2">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Other
          </p>

          {settingsItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              <item.icon size={20} />
              {item.title}
            </NavLink>
          ))}
        </div>

      </div>

      <div>

        
        <button className="flex items-center gap-3 mt-6 text-gray-600">
          <Moon size={18} />
          Dark Mode
        </button>

      </div>

    </aside>
  );
}