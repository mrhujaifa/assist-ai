/* eslint-disable @typescript-eslint/no-explicit-any */
// modules/auth/hooks/useVerifyOtp.ts

import { useState } from "react";
import { authApi } from "../auth.api";

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);

  const verifySingUpOTP = async (email: string, otp: string) => {
    setLoading(true);

    try {
      const { data, error } = await authApi.VerifySignUpEmail(email, otp);

      if (error) throw error;

      return data;
    } catch (error: any) {
      throw new Error(error.message || "OTP verification failed" , { cause: error });
    } finally {
      setLoading(false);
    }
  };

  const resendSignUpOTP = async (email: string) => {
    setLoading(true);

    try {
      const { error } = await authApi.resendOtpForSignUp(email);

      if (error) throw error;

      return true;
    } catch (error: any) {
      throw new Error(error.message , { cause: error })
    } finally {
      setLoading(false);
    }
  };

  return {
    verifySingUpOTP,
    resendSignUpOTP,
    loading,
  };
};