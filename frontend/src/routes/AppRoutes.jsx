import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeProvider } from "../context/ThemeContext";

import AppLayout from "../components/layout/AppLayout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import DailyPlanner from "../pages/DailyPlanner";
import MeetingSummarizer from "../pages/MeetingSummarizer";
import TaskPrioritizer from "../pages/TaskPrioritizer";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
         <ThemeProvider>
        <Routes>
          {/* Public routes — full screen, no sidebar/navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Everything below shares the same AppLayout (sidebar + navbar) */}
          <Route element={<AppLayout />}>
            {/* Dashboard is public — renders even if not logged in */}
            <Route path="/" element={<Dashboard />} />

            {/* These require login — redirect to /login if not authenticated */}
            <Route element={<ProtectedRoute />}>
              <Route path="/planner" element={<DailyPlanner />} />
              <Route path="/summarizer" element={<MeetingSummarizer />} />
              <Route path="/prioritizer" element={<TaskPrioritizer />} />
            </Route>
          </Route>
        </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}