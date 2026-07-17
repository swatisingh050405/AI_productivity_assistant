export default function PlannerOutput({ output }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-semibold mb-5">
        AI Schedule
      </h2>

      {output.length === 0 ? (
        <p className="text-gray-500">
          Your schedule will appear here.
        </p>
      ) : (
        <div className="space-y-4">
          {output.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border-l-4 border-violet-600 pl-4"
            >
              <div className="w-40 font-semibold text-violet-600">
                {item.start_time}
                <br />
                {item.end_time}
              </div>

              <div className="text-gray-700">
                {item.task}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}