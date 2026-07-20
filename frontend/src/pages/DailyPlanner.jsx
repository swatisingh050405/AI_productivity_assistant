import { useState } from "react";

import PlannerForm from "../components/planner/PlannerForm";
import PlannerOutput from "../components/planner/PlannerOutput";
import AIInsightsCard from "../components/planner/AIInsightsCard";
import DailySummaryCard from "../components/planner/DailySummaryCard";

import {
  generatePlan,
  savePlanner,
} from "../services/plannerService";

export default function DailyPlanner() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [plan, setPlan] = useState(null);

  const handleGenerate = async (text) => {
    try {
      setLoading(true);
      setPlan(null);
      setSaved(false);

      const data = await generatePlan(text);

      setPlan(data);
      setSaved(false);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleSave = async () => {
    if (!plan || saved) return;
    try {
      
      setSaving(true);
      

      await savePlanner(plan.schedule);
      window.dispatchEvent(new Event("tasksUpdated"));

      setSaved(true);

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-[28px] font-bold text-[#15131C] font-sora">
          Daily Planner
        </h1>

        <p className="text-[#6F6C79] text-[15px]">
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

          <AIInsightsCard
            insights={plan?.insights || []}
          />

          <DailySummaryCard
            summary={plan?.summary}
          />

        </div>

      </div>

    </div>
  );
}