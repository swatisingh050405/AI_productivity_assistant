import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function PlannerForm({ onGenerate, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    onGenerate(input);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Create Your Daily Plan
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <textarea
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Example:

Wake up: 7:00 AM
College: 9 AM - 4 PM
Gym: 6 PM
Study DSA
Finish DBMS Assignment
Dinner: 8 PM`}
          className="w-full border rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-60"
        >
          <Sparkles size={18} />

          {loading ? "Generating..." : "Generate AI Plan"}
        </button>

      </form>

    </div>
  );
}