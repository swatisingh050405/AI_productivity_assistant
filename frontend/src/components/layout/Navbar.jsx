import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      <div className="relative w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Ask ProdigyAI anything..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-violet-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell size={22} />

          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-11 h-11 rounded-full"
          />

          <div>

            <h3 className="font-semibold">
            Welcome Back
            </h3>

            <p className="text-sm text-gray-500">
            Let's have a productive day 🚀
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}