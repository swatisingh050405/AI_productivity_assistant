import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PlannerForm from "../components/planner/PlannerForm";
import PlannerOutput from "../components/planner/PlannerOutput";
import AIInsightsCard from "../components/planner/AIInsightsCard";
import DailySummaryCard from "../components/planner/DailySummaryCard";
import AlertModal from "../components/common/AlertModal";
import { useAuth } from "../context/AuthContext";

import {
  generatePlan,
  savePlanner,
} from "../services/plannerService";

const DRAFT_KEY = "prodigyai_planner_draft";
const DRAFT_TTL_MS = 10 * 60 * 1000; // 10 minutes

function loadDraft(isAuthenticated) {
  if (!isAuthenticated) return null;

  const raw = sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;

  try {
    const { plan, savedAt } = JSON.parse(raw);

    if (Date.now() - savedAt > DRAFT_TTL_MS) {
      sessionStorage.removeItem(DRAFT_KEY);
      return null;
    }

    return plan;
  } catch {
    sessionStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

export default function DailyPlanner() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const [plan, setPlan] = useState(() => loadDraft(isAuthenticated));

  // Save draft automatically
  useEffect(() => {
    if (!isAuthenticated || !plan || saved) return;

    sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        plan,
        savedAt: Date.now(),
      })
    );
  }, [plan, saved, isAuthenticated]);

  const handleGenerate = async (text) => {
    try {
      setLoading(true);
      setSaved(false);

      sessionStorage.removeItem(DRAFT_KEY);

      const data = await generatePlan(text);

      setPlan(data);

      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          plan: data,
          savedAt: Date.now(),
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!plan || saved) return;

    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }

    try {
      setSaving(true);

      await savePlanner(plan.schedule);

      window.dispatchEvent(new Event("tasksUpdated"));

      setSaved(true);

      // Keep planner for 10 minutes after save
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          plan,
          savedAt: Date.now(),
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAlertConfirm = () => {
    setShowLoginAlert(false);
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-bold text-[#15131C] dark:text-white font-sora">
          Daily Planner
        </h1>

        <p className="text-[#6F6C79] dark:text-[#A6A3AF] text-[15px]">
          Create your perfect day with the power of AI.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <PlannerForm
            onGenerate={handleGenerate}
            loading={loading}
            hasPlan={plan !== null}
          />

          <PlannerOutput
            output={plan?.schedule || []}
            onSave={handleSave}
            saving={saving}
            saved={saved}
          />
        </div>

        <div className="space-y-6">
          <AIInsightsCard insights={plan?.insights || []} />

          <DailySummaryCard summary={plan?.summary} />
        </div>
      </div>

      <AlertModal
        open={showLoginAlert}
        title="Login Required"
        message="Please log in if you want to track your tasks and productivity."
        confirmLabel="Got it"
        onConfirm={handleAlertConfirm}
      />
    </div>
  );
}