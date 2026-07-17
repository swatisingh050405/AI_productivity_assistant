export default function ProgressRing({
  progress = 75,
  totalTasks = 12,
  completedTasks = 9,
}) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col items-center">

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Productivity Score
      </h2>

      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#7C3AED"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      <div className="-mt-20 text-center">
        <h2 className="text-3xl font-bold text-violet-600">
          {progress}%
        </h2>

        <p className="text-gray-500 text-sm">
          Productivity
        </p>
      </div>

      <div className="mt-10 flex justify-between w-full">

        <div className="text-center flex-1">
          <h3 className="font-bold text-lg">
            {completedTasks}
          </h3>

          <p className="text-gray-500 text-sm">
            Completed
          </p>
        </div>

        <div className="text-center flex-1">
          <h3 className="font-bold text-lg">
            {totalTasks}
          </h3>

          <p className="text-gray-500 text-sm">
            Total Tasks
          </p>
        </div>

      </div>

    </div>
  );
}