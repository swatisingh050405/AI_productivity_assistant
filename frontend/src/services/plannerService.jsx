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