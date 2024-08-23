import useAuth from "@/features/auth/hooks/use-auth";
import ReportTable from "@/features/reports/componets/report-table";
import { getReports } from "@/features/reports/services/user-reports";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { useQuery } from "@tanstack/react-query";
import NotFoundPage from "../not_found";

export default function AdminReportsPage() {
  const { isAdmin } = useAuth();
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "reports"],
    queryFn: () => getReports(),
  });

  if (!isAdmin) {
    return <NotFoundPage />;
  }

  if (isLoading || !reports) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error?.message}</p>;
  }

  return (
    <ReportTable title="Reclamos" reports={reports} isLoading={isLoading} />
  );
}
