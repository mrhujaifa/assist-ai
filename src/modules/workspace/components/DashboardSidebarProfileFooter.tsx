interface IProfileFooterProps {
  isExpanded: boolean;
  user: any;
}

const DashboardSidebarProfileFooter = ({
  isExpanded,
  user,
}: IProfileFooterProps) => {
  return (
    <div className="p-3 border-t border-base-300">
      <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-base-200 cursor-pointer transition-colors overflow-hidden">
        <div className="avatar placeholder flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-content font-semibold flex items-center justify-center">
            <span className="text-xs">A</span>
          </div>
        </div>
        <div
          className={`transition-all duration-300 ${isExpanded ? "lg:opacity-100" : "lg:opacity-0 lg:w-0"}`}
        >
          <p className="truncate text-sm font-semibold text-base-content">
            {user?.name || "Assist Man"}
          </p>
          <p className="text-[10px] text-base-content/60 uppercase">
            Free Plan
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarProfileFooter;
