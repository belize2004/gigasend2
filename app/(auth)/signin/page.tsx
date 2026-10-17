
"use client"
import Link from '@/components/compat/Link';
import React, { useEffect, useState } from 'react';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiZap,
  FiUsers
} from 'react-icons/fi';
import axios, { AxiosError } from "axios"
import { useRouter } from '@/components/compat/navigation';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import { useAppDispatch } from '@/lib/store';
import { setUser } from '@/lib/userSlice';
import { brand } from '@/lib/brand';

const getSafeNextPath = () => {
  if (typeof window === 'undefined') {
    return '/dashboard';
  }

  const next = new URLSearchParams(window.location.search).get('next');
  return next?.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [searchSuffix, setSearchSuffix] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.location.search) {
      setSearchSuffix(window.location.search);
    }
  }, []);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      setForgotMessage({ text: 'Please enter a valid email address.', success: false });
      return;
    }
    setForgotLoading(true);
    setForgotMessage(null);
    try {
      const res = await axios.post('/api/auth/forgot-password', { email: forgotEmail });
      setForgotMessage({ text: res.data.message || 'If an account exists, a reset link was sent.', success: true });
    } catch {
      setForgotMessage({ text: 'Failed to send reset link. Please try again.', success: false });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error)
      setError(null);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await axios.post<ApiResponse<UserSlice>>('/api/auth/signin', formData);
      dispatch(setUser(res.data.data!));
      router.push(getSafeNextPath());
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-ocean-950 text-slate-100 flex items-center justify-center py-12 px-4 font-body">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block">
          <div className="text-left">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/15 text-gold-400 flex items-center justify-center mr-4 border border-gold-500/20">
                <BsArrowUpSquareFill className="text-2xl text-gold-400" />
              </div>
              <h1 className="text-4xl font-extrabold text-white font-display tracking-tight">{brand.productName}</h1>
            </div>
            <span className="label-caps text-gold-400 text-xs block mb-2">Workspace Access</span>
            <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mb-4">
              Welcome back!
            </h2>
            <p className="text-base text-slate-300 mb-8 leading-relaxed">
              Sign in to access your files and continue sharing with zero cloud egress.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-2xl apple-subtle-glass border border-white/10">
                <div className="bg-gold-500/15 text-gold-400 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <FiZap className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-display text-sm">Lightning Fast Uploads</h3>
                  <p className="text-slate-300 text-xs mt-0.5">Share files instantly with our optimized edge infrastructure</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-2xl apple-subtle-glass border border-white/10">
                <div className="bg-emerald-500/15 text-emerald-400 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-display text-sm">Enterprise Security</h3>
                  <p className="text-slate-300 text-xs mt-0.5">Your files are protected with bank-level encryption</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-2xl apple-subtle-glass border border-white/10">
                <div className="bg-sky-500/15 text-sky-400 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <FiUsers className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-display text-sm">Team Collaboration</h3>
                  <p className="text-slate-300 text-xs mt-0.5">Work together seamlessly with advanced sharing tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-2xl">

            {/* Mobile branding */}
            <div className="lg:hidden text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center mr-2.5 border border-gold-500/20">
                  <BsArrowUpSquareFill className="text-xl text-gold-400" />
                </div>
                <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">{brand.productName}</h1>
              </div>
            </div>

            {/* Icon Badge & Form Header */}
            <div className="mb-8 text-left">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/15 text-gold-400 flex items-center justify-center mb-6 border border-gold-500/20">
                <FiLock className="w-6 h-6" />
              </div>
              <span className="label-caps text-gold-400 text-xs">Authenticated Console</span>
              <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mt-1 mb-2">
                Sign In
              </h2>
              <p className="text-sm text-slate-300 font-body">
                Enter your credentials to access your account
              </p>
            </div>

            {/* error */}
            <div
              className={`rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-body transition-all duration-300 origin-top ${
                error ? 'opacity-100 scale-100 p-4 mb-6' : 'opacity-0 scale-95 h-0 overflow-hidden p-0 mb-0 border-0'
              }`}
            >
              {error ?? ''}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-ocean-950 border border-white/15 rounded-xl text-sm text-white placeholder-slate-500 focus:border-gold-500 outline-none transition-all duration-200 font-body"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-ocean-950 border border-white/15 rounded-xl text-sm text-white placeholder-slate-500 focus:border-gold-500 outline-none transition-all duration-200 font-body"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(formData.email);
                    setForgotModalOpen(true);
                    setForgotMessage(null);
                  }}
                  className="text-xs text-gold-400 hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-gold py-3.5 px-6 rounded-xl font-bold font-display text-xs shadow-lg shadow-gold-500/15 transition-all duration-200 flex items-center justify-center tap-tactile ${loading ? 'animate-pulse opacity-80' : ''}`}
              >
                {!loading ? 'Sign In' : 'Signing In'}
                {!loading && <FiArrowRight className="ml-2" />}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-300">
                Don&apos;t have an account?{' '}
                <Link href={searchSuffix ? `/signup${searchSuffix}` : "/signup"}>
                  <span className="text-gold-400 hover:text-amber-300 font-semibold transition-colors duration-200">
                    Sign up here
                  </span>
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="apple-glass bg-ocean-900/95 border border-white/10 rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
            <h3 className="text-lg font-bold text-white font-display mb-2">Reset Password</h3>
            <p className="text-xs text-slate-300 mb-4 font-body">
              Enter your account email and we&apos;ll send you a secure link to create a new password.
            </p>

            {forgotMessage && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  forgotMessage.success
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                }`}
              >
                <span>{forgotMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block label-caps text-slate-200 text-[10px] mb-2">Email address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={forgotLoading}
                  className="w-full px-3.5 py-2.5 bg-ocean-950 border border-white/15 rounded-xl text-white placeholder-slate-500 text-sm focus:border-gold-500 outline-none transition"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  disabled={forgotLoading}
                  className="flex-1 py-2.5 px-3 border border-white/15 text-slate-200 rounded-xl font-medium text-xs hover:bg-white/[0.06] transition tap-tactile"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex-1 py-2.5 px-3 btn-gold rounded-xl font-semibold text-xs transition disabled:opacity-50 tap-tactile"
                >
                  {forgotLoading ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
