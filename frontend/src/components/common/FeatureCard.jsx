import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  color,
  button,
  path,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-6">

      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-white mb-5`}
      >
        <Icon size={28} />
      </div>

      <h2 className="text-xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="text-gray-500 mt-2 mb-6">
        {description}
      </p>

      <Link
        to={path}
        className="flex items-center justify-between bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-xl transition"
      >
        <span>{button}</span>

        <ArrowRight size={18} />
      </Link>
    </div>
  );
}