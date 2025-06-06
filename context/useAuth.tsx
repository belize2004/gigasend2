"use client"

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { clearUser, setUser } from "@/lib/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { email } = useAppSelector(state => state.user);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout");
      dispatch(clearUser())
      router.replace("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    if (!auth) {
      fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Not authenticated");
          return res.json();
        })
        .then((data: ApiResponse<UserSlice>) => {
          dispatch(setUser(data.data!))
        })
        .finally(() => setLoading(false));
    }
  }, []);


  useEffect(() => {
    setAuth(email != null)
    console.log(email)
  }, [email])

  return {
    auth,
    loading,
    handleLogout
  };
};
