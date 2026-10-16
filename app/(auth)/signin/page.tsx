
"use client"
import Link from '@/components/compat/Link';
import React, { useState } from 'react';
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
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block">
          <div className="text-left">
            <div className="flex items-center mb-6">
              <BsArrowUpSquareFill className="text-5xl text-blue-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">{brand.productName}</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sign in to access your files and continue sharing with ease.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <FiZap className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lightning Fast Uploads</h3>
                  <p className="text-gray-600 text-sm">Share files instantly with our optimized infrastructure</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <FiShield className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Enterprise Security</h3>
                  <p className="text-gray-600 text-sm">Your files are protected with bank-level encryption</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <FiUsers className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Team Collaboration</h3>
                  <p className="text-gray-600 text-sm">Work together seamlessly with advanced sharing tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">

            {/* Mobile branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <BsArrowUpSquareFill className="text-4xl text-blue-600 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">{brand.productName}</h1>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            {/* error */}
            <p
              className={`text-red-400 text-sm mb-4 transform transition-all duration-300 origin-top ${error ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0'
                }`}
            >
              {error ?? ''}
            </p>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center transform ${loading ? 'animate-pulse opacity-80' : 'hover:from-blue-700 hover:to-purple-700 hover:scale-105'}`}
              >
                {!loading ? 'Sign In' : 'Signing In'}
                {!loading && <FiArrowRight className="ml-2" />}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href={typeof window !== 'undefined' && window.location.search ? `/signup${window.location.search}` : "/signup"}>
                  <span className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reset Password</h3>
            <p className="text-xs text-gray-600 mb-4">
              Enter your account email and we&apos;ll send you a secure link to create a new password.
            </p>

            {forgotMessage && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  forgotMessage.success
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <span>{forgotMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={forgotLoading}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-black text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  disabled={forgotLoading}
                  className="flex-1 py-2 px-3 border border-gray-300 text-gray-700 rounded-xl font-medium text-xs hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition disabled:opacity-50"
                >
                  {forgotLoading ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div >
  );
};

export default LoginPage;
