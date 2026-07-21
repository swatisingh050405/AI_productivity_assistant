import API_URL from "./api";

function authHeaders() {
  const token = localStorage.getItem("access_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function generateSummary(transcript) {
  const response = await fetch(`${API_URL}/summarizer/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      transcript,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate summary");
  }

  return await response.json();
}