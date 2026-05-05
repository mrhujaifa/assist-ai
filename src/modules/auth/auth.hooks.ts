import { useEffect, useState } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import { authApi } from "./auth.api";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    async function getUser() {
      setLoading(true);

      const {
        data: { user },
        error,
      } = await authApi.getCurrentUser();

      const {
        data: { session },
        error: sessionError,
      } = await authApi.getSession();

      setError(error || sessionError);
      setUser(user);
      setSession(session);
      setLoading(false);
    }

    getUser();
  }, []);

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated: !!user,
  };
};
