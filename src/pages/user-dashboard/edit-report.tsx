import { ReportForm } from "@/features/reports/componets/report-form";
import { getOneReport } from "@/features/reports/services/user-reports";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function EditReport() {
  const { report_id } = useParams();
  const {
    data: report,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report", report_id],
    queryFn: ({ queryKey }) =>
      getOneReport({
        report_id: queryKey[1] as string,
      }),
  });

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex justify-start items-center">
        <div className="flex items-center h-full">
          <Link to="/dashboard/reports">
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="text-4xl font-sans-accent">Edita un reporte</h1>
        </div>
      </hgroup>
      <div className="grid p-2 gap-3">
        <ReportForm report={report} />
      </div>
    </main>
  );
}
