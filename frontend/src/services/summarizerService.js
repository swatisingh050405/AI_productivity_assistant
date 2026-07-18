import API_URL from "./api";

export async function streamSummary(
  transcript,
  onChunk,
  onComplete,
  onError
) {
  try {
    const response = await fetch(`${API_URL}/summarizer/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcript,
      }),
    });

    if (!response.ok) {
      throw new Error("Streaming failed");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);

      result += chunk;

      onChunk(result);
    }

    onComplete();

  } catch (err) {
    onError(err);
  }
}