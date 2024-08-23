import ReportTable from "@/features/reports/componets/report-table";
import { getReportsByUser } from "@/features/reports/services/user-reports";
import { useQuery } from "@tanstack/react-query";
export default function ReportPage() {
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", "reports"],
    queryFn: () => getReportsByUser(),
  });

  if (error || !reports) {
    return <p>Ha ocurrido un error: {error?.message}</p>;
  }

  return (
    <ReportTable title="Mis reclamos" reports={reports} isLoading={isLoading} />
  );
}
