"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { clearUser, setUser } from "@/lib/userSlice";
import { captureMonitoringException, setMonitoringUser } from "@/lib/monitoring";
import { useRouter } from '@/components/compat/navigation';
import { useEffect, useState } from "react";

let verifyPromise: Promise<ApiResponse<UserSlice> | null> | null = null;

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { email } = useAppSelector(state => state.user);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      verifyPromise = null;
      dispatch(clearUser())
      router.replace("/signin");
    } catch (err) {
      console.error("Logout failed", err);
      captureMonitoringException(err, {
        tags: { feature: "auth", action: "logout" },
        context: { route: "useAuth.handleLogout" },
      });
    }
  };

  useEffect(() => {
    if (!auth) {
      if (!verifyPromise) {
        verifyPromise = fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null);
      }

      verifyPromise
        .then((data: ApiResponse<UserSlice> | null) => {
          if (data?.success && data.data) {
            dispatch(setUser(data.data));
            setMonitoringUser({ email: data.data?.email });
          } else {
            setMonitoringUser();
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);


  useEffect(() => {
    setAuth(email != null);
    if (email) {
      verifyPromise = Promise.resolve({
        success: true,
        message: "Authenticated",
        data: { email },
      });
      setMonitoringUser({ email });
    }
  }, [email]);

  return {
    auth,
    loading,
    handleLogout
  };
};
