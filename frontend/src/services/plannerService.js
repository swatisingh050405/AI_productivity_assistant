import API_URL from "./api";

export async function generatePlan(text) {
  const response = await fetch(`${API_URL}/planner/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate plan");
  }

  return await response.json();
}

export async function savePlanner(schedule) {
  const response = await fetch(`${API_URL}/tasks/planner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      schedule,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save planner");
  }

  return await response.json();
}