import { Button } from "@/components/shadcn/ui/button";
import Sidebar from "@/features/admin-dashboard/components/sidebar";
import useAuth from "@/features/auth/hooks/use-auth";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import NotFoundPage from "@/pages/not_found";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const { isAdmin, loading } = useAuth();

  if (loading) return <FullScreenSpinner />;

  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center">
        <NotFoundPage />
        <Link to="/">
          <Button>Volver</Button>
        </Link>
      </div>
    );
  }

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
