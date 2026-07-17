import { useState } from "react";

import PlannerForm from "../components/planner/PlannerForm";
import PlannerOutput from "../components/planner/PlannerOutput";
import { generatePlan } from "../services/plannerService";

export default function DailyPlanner() {

  const [loading, setLoading] = useState(false);
const [output, setOutput] = useState([]);

const handleGenerate = async (text) => {
  try {
    setLoading(true);

    const data = await generatePlan(text);

    setOutput(data.schedule);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Daily Planner
        </h1>

        <p className="text-gray-500">
          Let AI organize your day.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <PlannerForm
          onGenerate={handleGenerate}
          loading={loading}
        />

        <PlannerOutput output={output} />

      </div>

    </div>
  );
}