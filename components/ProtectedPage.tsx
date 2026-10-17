"use client";
import { useAuth } from '@/context/useAuth';
import { useRouter } from '@/components/compat/navigation';
import { useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { FiShield } from "react-icons/fi";
import { brand } from "@/lib/brand";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (!loading && !auth) {
      const nextPath = typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/dashboard";

      router.replace(`/signin?next=${encodeURIComponent(nextPath)}`);
    }
  }, [auth, loading]);

  if (loading) {
    return <AuthLoader />;
  }

  return <>{children}</>;
}


const AuthLoader = () => {
  return (
    <div className="min-h-screen min-w-screen bg-ocean-950 text-slate-100 flex items-center justify-center px-4">
      <div className="apple-glass bg-ocean-900/90 border border-white/10 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gold-500 to-amber-300 flex items-center justify-center text-ocean-950 font-black font-display text-lg shadow-lg shadow-gold-500/20">
            G
          </div>
          <h1 className="text-2xl font-extrabold font-display text-white tracking-tight">{brand.productName}</h1>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="relative">
            {/* Spinning circle */}
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-16 h-16 border-4 border-white/10 border-t-gold-500 rounded-full animate-spin"></div>
            </div>

            {/* Pulsing shield icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FiShield className="text-gold-400 text-xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display text-white">Authenticating</h2>
          <p className="text-slate-300 text-sm">
            Verifying your credentials securely...
          </p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
          <div className="flex items-center justify-center">
            <FiShield className="text-emerald-400 mr-2 text-sm" />
            <span className="text-sm text-emerald-300 font-medium">Secure Edge Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
