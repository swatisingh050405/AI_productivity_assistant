import API_URL from "./api";

function authHeaders() {
  const token = localStorage.getItem("access_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Prioritize Tasks
export async function generatePriority(new_tasks) {
  const response = await fetch(`${API_URL}/prioritizer/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ new_tasks }),
  });

  if (!response.ok) {
    throw new Error("Failed to prioritize tasks");
  }

  return await response.json();
}

// Get All Tasks
export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks/`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return await response.json();
}

// Dashboard
export async function getDashboardTasks() {
  const response = await fetch(`${API_URL}/tasks/dashboard`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard tasks");
  }

  return await response.json();
}

// Save Planner
export async function savePlanner(schedule) {
  const response = await fetch(`${API_URL}/tasks/planner`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ schedule }),
  });

  if (!response.ok) {
    throw new Error("Failed to save planner");
  }

  return await response.json();
}

// Pending Tasks
export async function getPendingTasks() {
  const response = await fetch(`${API_URL}/tasks/pending`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pending tasks");
  }

  return await response.json();
}

// Complete Task
export async function completeTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: "PATCH",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to complete task");
  }

  return await response.json();
}

// Delete Task
export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return await response.json();
}


