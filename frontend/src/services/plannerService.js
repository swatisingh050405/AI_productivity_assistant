import API_URL from "./api";

function authHeaders() {
  const token = localStorage.getItem("access_token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

export async function generatePlan(text) {
  const response = await fetch(`${API_URL}/planner/`, {
    method: "POST",
    headers: authHeaders(),
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
    headers: authHeaders(),
    body: JSON.stringify({
      schedule,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.log(err);
    throw new Error("Failed to save planner");
  }

  return await response.json();
}