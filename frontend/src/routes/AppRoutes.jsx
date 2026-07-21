import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

import ForgotPassword from "../components/auth/ForgotPassword";
import AppLayout from "../components/layout/AppLayout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import DailyPlanner from "../pages/DailyPlanner";
import MeetingSummarizer from "../pages/MeetingSummarizer";
import TaskPrioritizer from "../pages/TaskPrioritizer";
import PendingActivity from "../pages/PendingActivity";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* App Layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/planner" element={<DailyPlanner />} />
        <Route path="/summarizer" element={<MeetingSummarizer />} />
        <Route path="/prioritizer" element={<TaskPrioritizer />} />
        <Route path="/pending" element={<PendingActivity />} />
      </Route>
    </Routes>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}