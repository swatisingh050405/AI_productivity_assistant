import FeatureCard from "../components/common/FeatureCard";
import ActivityItem from "../components/common/ActivityItem";
import ProgressRing from "../components/common/ProgressRing";
import TipCard from "../components/common/TipCard";

import {
  featureCards,
  recentActivities,
} from "../data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          Good Morning 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Ready to boost your productivity today?
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featureCards.map((card) => (
          <FeatureCard key={card.id} {...card} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-6">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recent Activity
          </h2>

          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              {...activity}
            />
          ))}

        </div>

        {/* Productivity */}
        <ProgressRing />

      </div>

      {/* Tip */}
      <TipCard />

    </div>
  );
}