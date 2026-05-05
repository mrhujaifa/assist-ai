import { useNavigate, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAuthActions } from "../../../hooks/useAuthActions";
import Button from "../../../../../components/ui/Button";

const OTP_LENGTH = 6;

const VerifyEmailIndexUI = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");

  const { verifySingUpOTP, resendSignUpOTP, loading } = useAuthActions();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Validate email presence from query params
  if (!email) {
    return <p className="text-center mt-10">Invalid email session</p>;
  }

  // Handle individual OTP input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if value entered
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation between inputs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Handle paste event for full OTP input
  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = digit;
      }
    });
  };

  // Submit handler for OTP verification
  const handleVerifySignUpEmail = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== OTP_LENGTH) {
      toast.error("Enter complete OTP");
      return;
    }

    const toastId = toast.loading("Verifying OTP...");

    try {
      const data = await verifySingUpOTP(email, finalOtp);

      if (data?.session) {
        toast.success("Email verified successfully!", { id: toastId });
        navigate("/");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Verification failed";
      toast.error(message, { id: toastId });
    }
  };

  // Trigger resend OTP request
  const handleResendOtpForSignUp = async () => {
    const toastId = toast.loading("Sending new code...");

    try {
      await resendSignUpOTP(email);

      toast.success("OTP resent successfully!", {
        id: toastId,
        description: `Check ${email}`,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to resend OTP";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-110 flex flex-col items-center">
        {/* Logo placeholder */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-10 flex items-center justify-center">
            <img
              src="/logos/assistAI.png"
              alt="AssistAI Logo"
              className="w-full"
            />
          </div>

          <h1 className="text-lg font-semibold tracking-tight text-[#202123]">
            Assist <span className="text-[#3c46ff]">AI</span>
          </h1>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-[32px] font-bold text-[#202123]">
            Enter your code
          </h1>
          <p className="text-[#6e6e80] mt-4 text-[16px]">
            Code sent to <br />
            <span className="text-[#202123] font-medium">{email}</span>
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleVerifySignUpEmail}>
          <div className="flex gap-2 mb-10" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-13 h-16 text-2xl font-semibold text-center bg-[#f7f7f8] border border-[#d9d9e3] rounded-lg focus:border-[#10a37f] focus:ring-1 focus:ring-[#10a37f] outline-none"
              />
            ))}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Continue"}
          </Button>
        </form>

        {/* Resend OTP */}
        <div className="mt-8">
          <button
            onClick={handleResendOtpForSignUp}
            disabled={loading}
            className="text-[#10a37f] hover:underline text-[14px]"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailIndexUI;
