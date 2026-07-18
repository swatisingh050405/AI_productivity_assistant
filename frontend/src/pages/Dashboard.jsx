import { motion } from "framer-motion";
import FeatureCard from "../components/common/FeatureCard";
import ActivityItem from "../components/common/ActivityItem";
import ProgressRing from "../components/common/ProgressRing";
import TipCard from "../components/common/TipCard";
import QuoteCard from "../components/common/QuoteCard";
import RobotMascot from "../components/common/RobotMascot";
import { featureCards, recentActivities, dailyQuote } from "../data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <motion.main 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header Section */}
      <section className="flex items-center justify-between">
        <motion.div variants={itemVariants}>
          <h1 className="text-[28px] font-bold text-[#15131C] tracking-tight font-sora">
            Good Morning, Alex <span className="inline-block">👋</span>
          </h1>
          <p className="text-[#6F6C79] mt-1.5 text-[15px] font-sans">Let's make today productive and amazing.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <RobotMascot />
        </motion.div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          <section>
            <h2 className="text-[15px] font-semibold text-[#15131C] mb-4 font-sora">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featureCards.map((card) => (
                <motion.div key={card.id} variants={itemVariants}>
                  <FeatureCard {...card} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-[0_1px_2px_rgba(21,19,28,0.04)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[17px] font-semibold text-[#15131C] font-sora">Recent Activity</h2>
              <button className="text-[13px] font-semibold text-[#4F3FF0] hover:underline transition-all font-sans">View All</button>
            </div>
            <div className="space-y-1">
              {recentActivities.map((activity, i) => (
                <ActivityItem
                  key={activity.id}
                  {...activity}
                  isLast={i === recentActivities.length - 1}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          <motion.div variants={itemVariants}><QuoteCard {...dailyQuote} /></motion.div>
          <motion.div variants={itemVariants}><ProgressRing /></motion.div>
          <motion.div variants={itemVariants}><TipCard /></motion.div>
        </aside>
      </div>
    </motion.main>
  );
}