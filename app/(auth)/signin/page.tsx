
"use client"
import Link from 'next/link';
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
import { useRouter } from 'next/navigation';
import { BsArrowUpSquareFill } from 'react-icons/bs';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

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
      await axios.post<ApiResponse, typeof formData>('/api/auth/signin', formData);
      router.push('/dashboard');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response) {
        setError(axiosError.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally{
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
              <h1 className="text-4xl font-bold text-gray-900">GigaSend</h1>
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
                <h1 className="text-3xl font-bold text-gray-900">GigaSend</h1>
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

              {/* Forgot Password & Remember Me */}
              {/* <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div> */}

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
                <Link href="/signup">
                  <span className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                    Sign up here
                  </span>
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
};

export default LoginPage;