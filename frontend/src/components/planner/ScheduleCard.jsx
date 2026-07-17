export default function ScheduleCard({
  time,
  task,
}) {
  return (
    <div className="flex gap-5 mb-5">

      <div className="font-semibold text-violet-600 w-24">
        {time}
      </div>

      <div className="flex-1 bg-violet-50 rounded-xl p-4">
        {task}
      </div>

    </div>
  );
}