"use client"
import { useAppDispatch } from '@/lib/store';
import { setUser } from '@/lib/userSlice';
import axios, { AxiosError } from 'axios';
import Link from '@/components/compat/Link';
import { useRouter } from '@/components/compat/navigation';
import React, { useEffect, useState } from 'react';
import { BsArrowUpSquareFill } from 'react-icons/bs';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiZap,
  FiUsers,
  FiCheck,
  FiUser
} from 'react-icons/fi';
import { brand } from '@/lib/brand';

const getSafeNextPath = () => {
  if (typeof window === 'undefined') {
    return '/dashboard';
  }

  const next = new URLSearchParams(window.location.search).get('next');
  return next?.startsWith('/') && !next.startsWith('//') ? next : '/dashboard';
};

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [searchSuffix, setSearchSuffix] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.location.search) {
      setSearchSuffix(window.location.search);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post<ApiResponse<UserSlice>>('/api/auth/signup', formData);
      dispatch(setUser(res.data.data!));
      router.push(getSafeNextPath())
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("Couldn’t create your account. Please check your connection and try again.");
      }
    } finally {
      setLoading(false)
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'One number', met: /\d/.test(formData.password) }
  ];

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
            <span className="label-caps text-gold-400 text-xs block mb-2">Cloudflare Edge Delivery</span>
            <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mb-4">
              Built for Creative Teams and Studios
            </h2>
            <p className="text-base text-slate-300 mb-8 leading-relaxed">
              Start sharing files securely with our professional edge platform.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center p-4 rounded-2xl apple-subtle-glass border border-white/10">
                <div className="bg-gold-500/15 text-gold-400 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <FiZap className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-display text-sm">Lightning Fast Uploads</h3>
                  <p className="text-slate-300 text-xs mt-0.5">Share files instantly with our optimized edge infrastructure.</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-2xl apple-subtle-glass border border-white/10">
                <div className="bg-emerald-500/15 text-emerald-400 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-display text-sm">Enterprise Security</h3>
                  <p className="text-slate-300 text-xs mt-0.5">Your files are protected with 256-bit TLS encryption.</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-2xl apple-subtle-glass border border-white/10">
                <div className="bg-sky-500/15 text-sky-400 rounded-xl w-12 h-12 flex items-center justify-center mr-4 shrink-0">
                  <FiUsers className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-display text-sm">Team Collaboration</h3>
                  <p className="text-slate-300 text-xs mt-0.5">Work together seamlessly with advanced sharing tools.</p>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 p-6 apple-glass rounded-2xl border border-white/10 shadow-xl">
              <h4 className="font-bold text-white font-display text-sm mb-1.5">Trusted by Creative Professionals</h4>
              <p className="text-xs text-slate-300">Deliver uncompressed video, RAW photography, and project archives with zero recipient friction.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
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
                <FiUser className="w-6 h-6" />
              </div>
              <span className="label-caps text-gold-400 text-xs">New Workspace</span>
              <h2 className="text-3xl font-extrabold text-white font-display tracking-tight mt-1 mb-2">
                Create Account
              </h2>
              <p className="text-sm text-slate-300 font-body">
                Create your free account to start sending up to 10 GB immediately.
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
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block label-caps text-slate-200 text-[10px] mb-2">
                  Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-ocean-950 border border-white/15 rounded-xl text-sm text-white placeholder-slate-500 focus:border-gold-500 outline-none transition-all duration-200 font-body"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="name@example.com"
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
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-1.5 p-3 rounded-xl bg-ocean-950/80 border border-white/10">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <FiCheck
                        className={`mr-2 ${req.met ? 'text-emerald-400' : 'text-slate-600'}`}
                      />
                      <span className={req.met ? 'text-emerald-400 font-medium' : 'text-slate-400'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-gold py-3.5 px-6 rounded-xl font-bold font-display text-xs shadow-lg shadow-gold-500/15 transition-all duration-200 flex items-center justify-center tap-tactile ${loading ? 'opacity-80 animate-pulse' : ''}`}
              >
                {!loading ? 'Create Account' : 'Creating Account…'}
                {!loading && <FiArrowRight className="ml-2" />}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-300">
                Already have an account?{' '}
                <Link href={searchSuffix ? `/signin${searchSuffix}` : "/signin"} >
                  <span className="text-gold-400 hover:text-amber-300 font-semibold transition-colors duration-200">Sign In</span>
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
