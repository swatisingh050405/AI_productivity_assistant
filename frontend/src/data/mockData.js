import { CalendarDays, FileText, ListTodo } from "lucide-react";

export const featureCards = [
  {
    id: 1,
    title: "Daily Planner",
    description: "Generate an optimized schedule for your day.",
    icon: CalendarDays,
    gradient: "linear-gradient(135deg, #EDEBFC 0%, #FFFFFF 100%)",
    iconBg: "#4F3FF0",
    accent: "#4F3FF0",
    button: "Open Planner",
    path: "/planner",
  },
  {
    id: 2,
    title: "Meeting Summarizer",
    description: "Summarize meetings into key points and action items.",
    icon: FileText,
    gradient: "linear-gradient(135deg, #E4F8EF 0%, #FFFFFF 100%)",
    iconBg: "#059669",
    accent: "#059669",
    button: "Summarize",
    path: "/summarizer",
  },
  {
    id: 3,
    title: "Task Prioritizer",
    description: "Prioritize your tasks and focus on what matters.",
    icon: ListTodo,
    gradient: "linear-gradient(135deg, #FDF0DE 0%, #FFFFFF 100%)",
    iconBg: "#D97706",
    accent: "#D97706",
    button: "Prioritize",
    path: "/prioritizer",
  },
];

export const recentActivities = [
  { id: 1, title: "Daily plan generated", time: "10 min ago", tag: "Planner", tagColor: "#4F3FF0", tagBg: "#EDEBFC" },
  { id: 2, title: "Meeting summarized", time: "1 hour ago", tag: "Meeting", tagColor: "#059669", tagBg: "#E4F8EF" },
  { id: 3, title: "Tasks prioritized", time: "Yesterday", tag: "Tasks", tagColor: "#D97706", tagBg: "#FDF0DE" },
];

export const dailyQuote = {
  text: "It's not about having time, it's about making time.",
  author: "ProdigyAI",
};