import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import { useAuth } from "../../auth/hooks/useAuth";
import DashboardSidebarProfileFooter from "./DashboardSidebarProfileFooter";
import { NAVIGATION_ITEMS } from "../constant/NavItems";
import DashboardChatHistory from "./DashboardChatHistory";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-base-100 overflow-hidden relative">
      {/* --- Mobile Overlay --- */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] flex flex-col bg-base-100 border-r border-base-300 transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
          ${isExpanded ? "lg:w-64" : "lg:w-20"}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-5 py-4 h-14">
          <div className="flex-shrink-0">
            <img
              src="/logos/assistAI.png"
              alt="Logo"
              className="h-7 w-7 object-contain"
            />
          </div>
          <span
            className={`text-base font-bold text-base-content transition-opacity duration-300 truncate ${
              isExpanded ? "lg:opacity-100" : "lg:opacity-0 lg:w-0"
            }`}
          >
            Assist AI
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  title={!isExpanded ? item.name : ""}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 group hover:bg-blue-500 hover:text-white hover:shadow-lg"
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span
                    className={`transition-all duration-300 truncate ${isExpanded ? "lg:opacity-100" : "lg:opacity-0 lg:w-0"}`}
                  >
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <DashboardChatHistory isExpanded={isExpanded} userId={user?.id} />
        </nav>

        {/* Profile Footer */}
        <DashboardSidebarProfileFooter isExpanded={isExpanded} user={user} />
      </aside>

      {/* --- Main Content Area --- */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 w-full ${
          isExpanded ? "lg:pl-64" : "lg:pl-20"
        }`}
      >
        {/* Navbar */}
        <DashboardNavbar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
