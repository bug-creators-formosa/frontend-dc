import { Badge } from "@/components/shadcn/ui/badge";
import { Separator } from "@/components/shadcn/ui/separator";
import useAuth from "@/features/auth/hooks/use-auth";
import { ReportStateBadge } from "@/features/reports/componets/report-state-badge";
import { getOneReport } from "@/features/reports/services/user-reports";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { resolveUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ReportDetailPage() {
  const { report_id } = useParams();
  const { isAdmin } = useAuth();
  const {
    data: report,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports", report_id],
    queryFn: ({ queryKey }) => getOneReport({ report_id: queryKey[1] ?? "" }),
  });

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex gap-2 items-center">
        <div className="flex items-center h-full">
          <Link to={`/dashboard/reports/${isAdmin ? "admin" : "user"}`}>
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex items-center">
          <h1 className="text-3xl font-sans-accent">Detalle de denuncia</h1>
        </div>
      </hgroup>
      <Separator className="m-4" />
      <div className="grid p-2 gap-3 bg-white">
        <div className="flex flex-row gap-2">
          {report?.type && <Badge>{report.type.name}</Badge>}
          {report?.state && (
            <ReportStateBadge
              report_id={report.report_id}
              state={report?.state}
            />
          )}
        </div>
        <div className="my-2 border-1">
          <h2 className="font-sans-accent text-2xl mb-6">Título</h2>
          <p>{report?.title}</p>
        </div>
        <div className="my-2 border-1">
          <h2 className="font-sans-accent text-2xl mb-6">Descripción</h2>
          <p>{report?.description}</p>
        </div>

        <div>
          <h2 className="font-sans-accent text-2xl mb-6">Dirección</h2>
          <p>{report?.address}</p>
        </div>

        {report?.image_url && (
          <div>
            <h2 className="font-sans-accent text-2xl mb-6">Imagen adjunta</h2>
            <img
              src={resolveUrl(report?.image_url ?? "") ?? ""}
              className="max-h-80"
            />
          </div>
        )}
      </div>
    </main>
  );
}
