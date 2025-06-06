"use client";
import { useAuth } from '@/context/useAuth';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FiShield } from "react-icons/fi";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (!loading && !auth) {
      router.replace("/signin");
    }
  }, [auth, loading]);

  if (loading) {
    return <AuthLoader />;
  }

  return <>{children}</>;
}


const AuthLoader = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center mb-6">
          <BsArrowUpSquareFill className="text-4xl text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">GigaSend</h1>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="relative">
            {/* Spinning circle */}
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>

            {/* Pulsing shield icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FiShield className="text-blue-600 text-xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Authenticating</h2>
          <p className="text-gray-600">
            Verifying your credentials securely...
          </p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="flex items-center justify-center">
            <FiShield className="text-green-600 mr-2 text-sm" />
            <span className="text-sm text-green-700 font-medium">Secure Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
