import Chat from "../../chat";
import DashboardLayout from "../components/DashboardLayout";

const WorkspacePage = () => {
  return (
    <div>
      <DashboardLayout>
        <Chat />
      </DashboardLayout>
    </div>
  );
};

export default WorkspacePage;
