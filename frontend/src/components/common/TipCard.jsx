import { Sparkles } from "lucide-react";

export default function TipCard() {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-purple-500 rounded-3xl p-6 text-white">

      <div className="flex items-center gap-3 mb-4">

        <Sparkles />

        <h2 className="text-xl font-semibold">
          Today's AI Tip
        </h2>

      </div>

      <p className="leading-7 text-violet-100">
        Schedule difficult tasks during your peak focus hours
        and take a 10–15 minute break after every 90 minutes
        of deep work for better productivity.
      </p>

    </div>
  );
}