import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { Sparkles } from "lucide-react";

interface DashboardNavbarProps {
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  setIsMobileOpen,
  setIsExpanded,
  isExpanded,
}) => {
  const { loading, isAuthenticated } = useAuth();

  return (
    <header className="navbar h-14 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-md  z-30 px-4 flex justify-between lg: items-center">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="btn btn-ghost btn-square btn-sm lg:hidden"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:flex btn btn-ghost btn-square btn-sm items-center justify-center hover:bg-base-200 transition-colors"
        >
          <svg
            className={`size-5 transition-transform duration-500 ${!isExpanded ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
          </svg>
        </button>
      </div>

      {/* Right Side - Conditional Rendering */}
      <div className="flex items-center gap-2">
        {loading ? (
          <div className="h-8 w-20 bg-base-300 animate-pulse rounded-md"></div>
        ) : isAuthenticated ? (
          <Link to="/pricing">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 group">
              <Sparkles
                size={16}
                className="text-indigo-400 group-hover:text-indigo-300 fill-indigo-400/20"
              />
              <span className="text-sm font-medium text-zinc-200 group-hover:text-white">
                Get Plus
              </span>
            </button>
          </Link>
        ) : (
          <>
            <Link to={"/auth/login"}>
              <button className="bg-[#3c46ffd2] text-white rounded-md py-1 px-4 text-sm hover:bg-[#343dcc] transition-colors ">
                Login
              </button>
            </Link>
            <Link to={"/auth/register"}>
              <button className="bg-[#3c46ffd8] text-white rounded-md py-1 px-4 text-sm hover:bg-[#343dcc] transition-colors">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
