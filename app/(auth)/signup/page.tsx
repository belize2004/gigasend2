"use client"
import { useAppDispatch } from '@/lib/store';
import { setUser } from '@/lib/userSlice';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
      router.push('/dashboard')
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

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block">
          <div className="text-left">
            <div className="flex items-center mb-6">
              <BsArrowUpSquareFill className="text-5xl text-blue-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">GigaSend</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join thousands of users
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start sharing files securely with our professional platform.
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

            {/* Trust indicators */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Trusted by professionals</h4>
              <p className="text-sm text-gray-600">Join over 50,000+ users who trust GigaSend for their file sharing needs.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">

            {/* Mobile branding */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <BsArrowUpSquareFill className="text-4xl text-blue-600 mr-2" />
                <h1 className="text-3xl font-bold text-gray-900">GigaSend</h1>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join us and start sharing files securely
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
              {/* Name Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

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
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                {/* Password Requirements */}
                {(
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <FiCheck
                          className={`mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'}`}
                        />
                        <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              {/* <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    Privacy Policy
                  </button>
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold ${loading ? 'opacity-80 animate-pulse' : 'hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'} transition-all duration-200 flex items-center justify-center`}
              >
                {!loading ? 'Create Account' : 'Creating Account'}
                {!loading && <FiArrowRight className="ml-2" />}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/signin" >
                  <span className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">Sign in here</span>
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