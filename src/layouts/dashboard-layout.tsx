import Sidebar from "@/features/admin-dashboard/components/sidebar";
import useAuth from "@/features/auth/hooks/use-auth";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { loading } = useAuth();

  if (loading) return <FullScreenSpinner />;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="h-full">
        <Sidebar />
      </div>
      <div className="w-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
