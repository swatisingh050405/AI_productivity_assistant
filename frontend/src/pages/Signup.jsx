import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

import { signup } from "../services/authService";

import BrandPanel from "../components/auth/BrandPanel";
import AlertModal from "../components/common/AlertModal";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
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

    try {
      setLoading(true);

      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setShowSuccess(true);

    } catch (err) {
      setError(err.message || "Something went wrong.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F4FA] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[920px] bg-white rounded-[32px] shadow-[0_30px_80px_-20px_rgba(79,63,240,0.25)] overflow-hidden flex flex-col lg:flex-row"
      >
        <BrandPanel />

        <div className="flex-1 flex items-center justify-center px-6 py-10 lg:px-12 lg:py-12">
          <div className="w-full max-w-[360px]">
            <div className="lg:hidden flex items-center gap-2.5 mb-8">
              <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#4F3FF0] to-[#4F9EF5] flex items-center justify-center">
                <Sparkles size={17} className="text-white" strokeWidth={2.2} />
              </span>
              <span className="text-[18px] font-bold text-[#15131C] tracking-tight font-sora">ProdigyAI</span>
            </div>

            <h2 className="text-[24px] font-bold text-[#15131C] tracking-tight font-sora">Create your account</h2>
            <p className="text-[#6F6C79] mt-1.5 text-[14px] font-sans">
              Takes less than a minute to get started.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-3.5">
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
                <span className="text-[12px] text-[#6F6C79] leading-relaxed font-sans">
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

            <p className="text-center text-[13.5px] text-[#6F6C79] mt-6 font-sans">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4F3FF0] font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      <AlertModal
        open={showSuccess}
        icon={CheckCircle2}
        title="Account Created"
        message="Your account has been created successfully. Please log in to continue."
        confirmLabel="Log In"
        onConfirm={() => navigate("/login")}
      />
    </div>
  );
}