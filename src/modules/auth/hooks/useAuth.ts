/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { authApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const { error: logoutError } = await authApi.logout();
      
      if (logoutError) {
        toast.error(logoutError.message);
        return;
      }
  
      setUser(null);
      toast.success("Logged out successfully");
      

      navigate("/auth/login");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
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
    refreshUser: fetchUser,
    signOut: handleLogout 
  };
};