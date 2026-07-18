import API_URL from "./api";

export async function generatePriority(tasks) {

    const response = await fetch(`${API_URL}/prioritizer/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tasks
        })
    });

    return await response.json();
}