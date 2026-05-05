interface NavItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
    icon: (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: "settings",
    name: "Settings",
    path: "/settings",
    icon: (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];
