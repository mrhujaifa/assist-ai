/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface IProfileFooterProps {
  isExpanded: boolean;
  user: any;
}

const DashboardSidebarProfileFooter = ({
  isExpanded,
  user,
}: IProfileFooterProps) => {
  const { signOut, isAuthenticated } = useAuth();

  const handleSignOut = () => {
    toast.warning("Are you sure you want to log out?", {
      action: {
        label: "Log out",
        onClick: async () => {
          toast.promise(signOut(), {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: (err) => err?.message || "Failed to logout",
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Logout cancelled"),
      },
      duration: 5000,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="p-3 border-t border-base-300">
        {isExpanded ? (
          <div className=" border border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-300">
            <h3 className="text-[15px] font-semibold text-white leading-tight mb-2">
              Get responses tailored to you
            </h3>
            <p className="text-[13px] text-zinc-400 leading-relaxed mb-4">
              Log in to get answers based on saved chats, plus create images and
              upload files.
            </p>
            <Link to={"/auth/login"}>
              <button className="w-full py-2 bg-transparent border border-zinc-600 hover:border-zinc-400 text-white text-sm font-semibold rounded-full transition-all active:scale-95">
                Log in
              </button>
            </Link>
          </div>
        ) : (
          <button
            className="btn btn-ghost btn-square w-full hover:bg-base-200"
            title="Log in"
          >
            <LogIn size={20} className="text-base-content/70" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 border-t border-base-300">
      <div className="dropdown dropdown-top w-full">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-base-200 cursor-pointer transition-colors overflow-hidden w-full"
        >
          <div className="avatar placeholder flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-content font-semibold flex items-center justify-center">
              <span className="text-xs">{user?.name?.charAt(0) || "A"}</span>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ${
              isExpanded ? "lg:opacity-100" : "lg:opacity-0 lg:w-0"
            }`}
          >
            <p className="truncate text-sm font-semibold text-base-content text-left">
              {user?.name || "Assist Man"}
            </p>
            <p className="text-[10px] text-base-content/60 uppercase text-left">
              Free Plan
            </p>
          </div>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-xl w-56 mb-2 border border-base-300 animate-in fade-in slide-in-from-bottom-2"
        >
          <li className="menu-title text-xs">Settings</li>
          <li>
            <a className="text-sm py-2">Profile Settings</a>
          </li>
          <li>
            <a className="text-sm py-2">Subscription Plans</a>
          </li>
          <div className="divider my-1"></div>
          <li>
            <button
              onClick={handleSignOut}
              className="text-sm py-2 text-error hover:bg-error/10"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebarProfileFooter;
