/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { authApi } from "../api/auth.api";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data, error: authError } = await authApi.getCurrentUser();
      
      if (authError) throw authError;

      setUser(data?.user || null);
    } catch (err) {
      setError(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { 
    user, 
    loading, 
    error, 
    isAuthenticated: !!user,
    refreshUser: fetchUser 
  };
};