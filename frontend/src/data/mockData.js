import {
  CalendarDays,
  FileText,
  ListTodo,
} from "lucide-react";

export const featureCards = [
  {
    id: 1,
    title: "Daily Planner",
    description: "AI-powered scheduling for your day.",
    icon: CalendarDays,
    color: "from-violet-500 to-purple-600",
    button: "Plan Now",
    path: "/planner",
  },
  {
    id: 2,
    title: "Meeting Summarizer",
    description: "Summarize meetings into key insights.",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    button: "Summarize",
    path: "/summarizer",
  },
  {
    id: 3,
    title: "Task Prioritizer",
    description: "Prioritize work intelligently using AI.",
    icon: ListTodo,
    color: "from-emerald-500 to-green-600",
    button: "Prioritize",
    path: "/prioritizer",
  },
];

export const recentActivities = [
  {
    id: 1,
    title: "Daily plan generated",
    time: "10 min ago",
  },
  {
    id: 2,
    title: "Meeting summarized",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Tasks prioritized",
    time: "Yesterday",
  },
];