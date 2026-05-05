import { Outlet } from "react-router-dom";
import WorkspacePage from "../modules/workspace/page/WorkspacePage";

export default function RootLayout() {
  return (
    <div>
      <WorkspacePage />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
