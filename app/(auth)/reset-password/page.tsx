import React, { useState, useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { brand } from "@/lib/brand";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get("token");
      if (tokenParam) {
        setToken(tokenParam);
      } else {
        setError("Invalid or missing reset token. Please request a new link.");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Missing reset token. Please request a new link from the login page.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to update password. Your link may have expired.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/transfer";
      }, 1500);
    } catch {
      setError("A network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 flex items-center justify-center p-4 font-body">
      <div className="w-full max-w-md apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-2xl text-left">
        <div className="mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gold-500/15 text-gold-400 flex items-center justify-center mb-6 border border-gold-500/20">
            <FiLock className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <BsArrowUpSquareFill className="text-lg text-gold-400" />
            <span className="label-caps text-gold-400 text-xs">{brand.productName} Security</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">Create New Password</h1>
          <p className="text-sm text-slate-300 mt-1.5 font-body">
            Enter your new password below to regain access to your account.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-rose-300">
            <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-300">
            <FiCheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>Password updated! Redirecting you now...</span>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block label-caps text-slate-200 text-[10px] mb-2">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 bg-ocean-950 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-gold-500 outline-none text-sm transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block label-caps text-slate-200 text-[10px] mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  minLength={8}
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 bg-ocean-950 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:border-gold-500 outline-none text-sm transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full mt-2 py-3.5 px-6 btn-gold font-bold font-display rounded-xl shadow-lg shadow-gold-500/15 transition disabled:opacity-50 text-xs tap-tactile"
            >
              {loading ? "Updating Password..." : "Set New Password"}
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-300">
          Remember your password?{" "}
          <a href="/signin" className="text-gold-400 hover:text-amber-300 font-semibold transition">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
