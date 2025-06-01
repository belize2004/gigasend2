"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    if (isAuthenticated) {
      setLoading(false);
      return;
    }

    fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      })
      .catch(() => {
        setIsAuthenticated(false)
      }).finally(() => {
        setLoading(false);
      });
  }, [router, isAuthenticated]);

  async function handleLogout() {
    try {
      await axios.post('/api/auth/signout');
      router.replace('/signin')
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return { loading, isAuthenticated, handleLogout };
}
