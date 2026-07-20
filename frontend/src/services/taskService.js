import API_URL from "./api";

export async function generatePriority(new_tasks) {
  const response = await fetch(`${API_URL}/prioritizer/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_tasks,
    }),
  });

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("Failed to prioritize tasks");
  }

  return await response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks/`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return await response.json();
}

export async function getDashboardTasks() {
  const response = await fetch(`${API_URL}/tasks/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard tasks");
  }

  return await response.json();
}

export async function completeTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to complete task");
  }

  return await response.json();
}