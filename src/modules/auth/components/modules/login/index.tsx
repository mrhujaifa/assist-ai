/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "../../../auth.api";

export default function LoginIndexUI() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleError = (error: any, fallback: string) => {
    toast.error(error?.message || fallback);
  };

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const { error } = await authApi.login({ email, password });

      if (error) {
        handleError(error, "Login failed");
        return;
      }

      toast.success("Login successful");

      navigate("/");
    } catch (err: any) {
      handleError(err, "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    if (loading) return;
    setLoading(true);

    try {
      const { error } = await authApi.googleLogin();

      if (error) {
        handleError(error, "Google login failed");
        return;
      }

      toast.success("Signed in with Google");

      navigate("/");
    } catch (err: any) {
      handleError(err, "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Logo */}
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

        <h1 className="text-[28px] font-semibold text-[#0d0d0d] text-center tracking-tight mb-2">
          Welcome back
        </h1>

        <p className="text-sm text-[#676767] text-center mb-7 leading-relaxed">
          Log in to your account to continue
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 border border-[#d9d9e3] rounded-lg text-[15px] text-[#0d0d0d] placeholder-[#aaaaaa] outline-none focus:border-[#0d0d0d] transition-colors bg-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 px-4 border border-[#d9d9e3] rounded-lg text-[15px] text-[#0d0d0d] placeholder-[#aaaaaa] outline-none focus:border-[#0d0d0d] transition-colors bg-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#3c46ff] hover:bg-[#0000ff] text-white rounded-lg text-[15px] font-semibold transition-all duration-200 shadow-lg shadow-indigo-100 active:scale-[0.98] cursor-pointer mt-1 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>

        <p className="text-sm text-[#676767] text-center mt-4 mb-5">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-[#0d0d0d] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#e5e5e5]" />
          <span className="text-xs text-[#999999]">OR</span>
          <div className="flex-1 h-px bg-[#e5e5e5]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full h-12 bg-white hover:bg-[#f7f7f8] border border-[#d9d9e3] rounded-lg text-[15px] font-medium text-[#0d0d0d] flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-60"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4.5 h-4.5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-[#999999] text-center mt-6 leading-relaxed">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#676767] underline hover:text-[#0d0d0d]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#676767] underline hover:text-[#0d0d0d]">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
