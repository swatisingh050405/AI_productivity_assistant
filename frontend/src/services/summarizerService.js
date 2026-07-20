import API_URL from "./api";

export async function generateSummary(transcript) {

  const response = await fetch(`${API_URL}/summarizer/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transcript,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate summary");
  }

  return await response.json();
}