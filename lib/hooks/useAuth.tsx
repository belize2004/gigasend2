"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');

    if (auth === 'true') {
      setLoading(false);
      setIsAuthenticated(true)
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
        setIsAuthenticated(true)
        return res.json();
      })
      .then(data => {
        if (data.success) {
          sessionStorage.setItem('isAuthenticated', 'true');
          setLoading(false);
        } else {
          setIsAuthenticated(false)
          router.replace('/signin');
        }
      })
      .catch(() => {
        setIsAuthenticated(true)
        router.replace('/signin');
      });
  }, [router]);

  async function handleLogout() {
    try {
      await axios.post('/api/auth/signout');
      router.replace('/signin')
      setIsAuthenticated(false);
      sessionStorage.removeItem('isAuthenticated');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return { loading, isAuthenticated, handleLogout };
}
