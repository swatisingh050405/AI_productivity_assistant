import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Dashboard from "../pages/Dashboard";
import DailyPlanner from "../pages/DailyPlanner";
import MeetingSummarizer from "../pages/MeetingSummarizer";
import TaskPrioritizer from "../pages/TaskPrioritizer";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<DailyPlanner />} />
          <Route path="/summarizer" element={<MeetingSummarizer />} />
          <Route path="/prioritizer" element={<TaskPrioritizer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}