import { supabase } from "../../../lib/superbase";
import type { LoginPayload, SignupPayload } from "../types/auth.types";

export const authApi = {
  signup: (payload: SignupPayload) => {
    return supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });
  },

  VerifySignUpEmail: (email: string, OTP: string)=>{
      return supabase.auth.verifyOtp({
        email:email,
        token:OTP,
        type: "signup"
      })
  },

  resendOtpForSignUp: (email: string)=>{
    return supabase.auth.resend({
      email:email,
      type: "signup"
    })
  },
  
  login: (payload: LoginPayload) => {
    return supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
  },

  logout: () => {
    return supabase.auth.signOut();
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  getSession: () => {
    return supabase.auth.getSession();
  },

  googleLogin: () => {
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  },
};
