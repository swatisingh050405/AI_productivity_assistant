import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function BrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-[42%] shrink-0 p-12 overflow-hidden bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5]">
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
        <pattern id="dots2" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots2)" />
      </svg>

      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
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
          Productivity, upgraded.
        </h1>
        <p className="text-white/70 text-[14.5px] mt-3 max-w-[300px] leading-relaxed mb-6">
          One place for your plans, meetings, and priorities — all reasoned through by AI.
        </p>

        <ul className="space-y-2.5">
          {["AI-generated daily plans", "Meeting summaries in seconds", "Smart task prioritization"].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-white/90 text-[13.5px]">
              <span className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Check size={10} strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative text-white/50 text-[12.5px] font-medium">
        © {new Date().getFullYear()} ProdigyAI
      </p>
    </div>
  );
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms to continue.");
      return;
    }

    setLoading(true);
    // TODO: replace with real POST /auth/signup call; using local context for now
    setTimeout(() => {
      signup({ name: form.name, email: form.email });
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

          <h2 className="text-[26px] font-bold text-[#15131C] tracking-tight font-sora">Create your account</h2>
          <p className="text-[#6F6C79] mt-1.5 text-[14.5px] font-sans">
            Takes less than a minute to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-[#15131C] mb-1.5 font-sans">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEB8]" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  className="w-full bg-[#F7F6FB] border border-[#EEECF8] rounded-xl pl-11 pr-4 py-3 text-[14px] text-[#15131C] placeholder:text-[#B0AEB8] outline-none transition-all duration-200 focus:bg-white focus:border-[#4F3FF0] focus:ring-2 focus:ring-[#4F3FF0]/15 font-sans"
                />
              </div>
            </div>

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
              <label className="block text-[12.5px] font-semibold text-[#15131C] mb-1.5 font-sans">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEB8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
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

            <div>
              <label className="block text-[12.5px] font-semibold text-[#15131C] mb-1.5 font-sans">Confirm password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEB8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full bg-[#F7F6FB] border border-[#EEECF8] rounded-xl pl-11 pr-4 py-3 text-[14px] text-[#15131C] placeholder:text-[#B0AEB8] outline-none transition-all duration-200 focus:bg-white focus:border-[#4F3FF0] focus:ring-2 focus:ring-[#4F3FF0]/15 font-sans"
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#D8D5E8] text-[#4F3FF0] focus:ring-[#4F3FF0]/30"
              />
              <span className="text-[12.5px] text-[#6F6C79] leading-relaxed font-sans">
                I agree to the <Link to="/terms" className="text-[#4F3FF0] font-semibold hover:underline">Terms</Link> and{" "}
                <Link to="/privacy" className="text-[#4F3FF0] font-semibold hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {error && (
              <p className="text-[12.5px] text-red-500 font-medium font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F3FF0] to-[#4F9EF5] text-white py-3 rounded-xl font-semibold text-[14.5px] shadow-lg shadow-[#4F3FF0]/20 hover:brightness-110 transition-all disabled:opacity-60 font-sans mt-1"
            >
              {loading ? (
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[13.5px] text-[#6F6C79] mt-7 font-sans">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4F3FF0] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}