import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function BrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-[42%] shrink-0 p-12 overflow-hidden bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5]">
      {/* Ambient dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center gap-2.5">
        <span className="h-9 w-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
          <Sparkles size={18} className="text-white" strokeWidth={2.2} />
        </span>
        <span className="text-white text-[18px] font-bold tracking-tight font-sora">ProdigyAI</span>
      </div>

      <div className="relative">
        {/* Orbiting mark — same motif as RobotMascot */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-white/70" />
            <span className="absolute bottom-3 right-1 h-2 w-2 rounded-full bg-[#FFD9C7]" />
          </motion.div>
          <div className="absolute inset-2 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="white" />
            </svg>
          </div>
        </motion.div>

        <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight font-sora max-w-[320px]">
          Let's make today remarkably productive.
        </h1>
        <p className="text-white/70 text-[14.5px] mt-3 max-w-[300px] leading-relaxed">
          Plans, summaries, and priorities — handled by AI, picked up right where you left off.
        </p>
      </div>

      <p className="relative text-white/50 text-[12.5px] font-medium">
        © {new Date().getFullYear()} ProdigyAI
      </p>
    </div>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real POST /auth/login call; using local context for now
    setTimeout(() => {
      login({ email: form.email });
      setLoading(false);
      navigate("/");
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <BrandPanel />

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAFAFF]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[400px] bg-white rounded-3xl border border-[#EEECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center">
              <Sparkles size={17} className="text-white" strokeWidth={2.2} />
            </span>
            <span className="text-[18px] font-bold text-[#15131C] tracking-tight font-sora">ProdigyAI</span>
          </div>

          <h2 className="text-[26px] font-bold text-[#15131C] tracking-tight font-sora">Welcome back</h2>
          <p className="text-[#6F6C79] mt-1.5 text-[14.5px] font-sans">
            Let's pick up where you left off.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-[#15131C] mb-1.5 font-sans">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEB8]" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-[#F7F6FB] border border-[#EEECF8] rounded-xl pl-11 pr-4 py-3 text-[14px] text-[#15131C] placeholder:text-[#B0AEB8] outline-none transition-all duration-200 focus:bg-white focus:border-[#4F3FF0] focus:ring-2 focus:ring-[#4F3FF0]/15 font-sans"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12.5px] font-semibold text-[#15131C] font-sans">Password</label>
                <Link to="/forgot-password" className="text-[12px] font-semibold text-[#4F3FF0] hover:underline font-sans">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEB8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F6FB] border border-[#EEECF8] rounded-xl pl-11 pr-11 py-3 text-[14px] text-[#15131C] placeholder:text-[#B0AEB8] outline-none transition-all duration-200 focus:bg-white focus:border-[#4F3FF0] focus:ring-2 focus:ring-[#4F3FF0]/15 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0AEB8] hover:text-[#15131C] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white py-3 rounded-xl font-semibold text-[14.5px] shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all disabled:opacity-60 font-sans mt-2"
            >
              {loading ? (
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              ) : (
                <>
                  Log In <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[13.5px] text-[#6F6C79] mt-7 font-sans">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#4F3FF0] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}