import { Clock3 } from "lucide-react";

export default function ActivityItem({ title, time }) {
  return (
    <div className="flex justify-between items-center py-4 border-b last:border-none">

      <div>
        <h3 className="font-medium text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {time}
        </p>
      </div>

      <Clock3
        size={18}
        className="text-violet-500"
      />
    </div>
  );
}