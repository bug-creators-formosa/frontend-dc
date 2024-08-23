import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { UserListSkeleton } from "@/features/admin-dashboard/components/user-list";
import {
  REPORT_STATES,
  ReportState,
} from "@/features/reports/consts/report-states";
import { getReportsByUser } from "@/features/reports/services/user-reports";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, CircleDot, CirclePlay, CircleX } from "lucide-react";
import { ReactNode } from "react";

export default function ReportsPage() {
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", "reports"],
    queryFn: () => getReportsByUser(),
  });

  if (isLoading) {
    return <UserListSkeleton />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message} </p>;
  }

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Mis denuncias</h1>
      </hgroup>
      <div className="grid p-2 gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="w-[100px]">Título</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Modificado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports?.map((report) => {
              return (
                <TableRow>
                  <TableCell>
                    {report.image_url ? (
                      <img src={report.image_url} alt={report.description} />
                    ) : (
                      <Skeleton className="w-8 h-8 animate-none" />
                    )}
                  </TableCell>
                  <TableCell className="w-[100px]">{report.title}</TableCell>
                  <TableCell className="text-ellipsis max-w-[450px]">
                    {report.description}
                  </TableCell>
                  <TableCell>
                    <ReportStateBadge state={report.state} />
                  </TableCell>
                  <TableCell>{report.type.name}</TableCell>
                  <TableCell>
                    {report.state_change_at.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="default">Ver</Button>
                    <Button variant="outline">Editar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

function ReportStateBadge({ state }: { state: ReportState }) {
  const classes: Record<ReportState, string> = {
    [REPORT_STATES.OPENED]: "bg-blue-500",
    [REPORT_STATES.CLOSED]: "bg-red-300",
    [REPORT_STATES.IN_PROGRESS]: "bg-blue-500",
    [REPORT_STATES.SOLVED]: "bg-green-400",
  };

  const text: Record<ReportState, string> = {
    [REPORT_STATES.OPENED]: "Abierta",
    [REPORT_STATES.CLOSED]: "Cerrada",
    [REPORT_STATES.IN_PROGRESS]: "En progreso",
    [REPORT_STATES.SOLVED]: "Solucionada",
  };

  const icons: Record<ReportState, ReactNode> = {
    [REPORT_STATES.OPENED]: <CircleDot className="h-6 w-6" />,
    [REPORT_STATES.CLOSED]: <CircleX className="h-6 w-6" />,
    [REPORT_STATES.IN_PROGRESS]: <CirclePlay className="h-6 w-6" />,
    [REPORT_STATES.SOLVED]: <CircleCheckBig className="h-6 w-6" />,
  };

  return (
    <Badge className={cn(classes[state], "flex gap-1 text-sm max-w-min")}>
      {icons[state]}
      {text[state]}
    </Badge>
  );
}
