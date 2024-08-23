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
import DeleteButton from "@/features/reports/componets/delete-button";
import {
  REPORT_STATES,
  ReportState,
} from "@/features/reports/consts/report-states";
import { getReportsByUser } from "@/features/reports/services/user-reports";
import { cn, resolveUrl } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  CircleCheckBig,
  CircleDot,
  CirclePlay,
  CirclePlus,
  CircleX,
} from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

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
    return <ReportPageSkeleton />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message} </p>;
  }

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex justify-between items-center">
        <h1 className="text-4xl font-sans-accent mb-6">Mis denuncias</h1>
        <Button className="flex gap-2">
          <Link to="/dashboard/reports/add" className="flex gap-2">
            <CirclePlus className="h-6 w-6" />
            Denunciar un hecho
          </Link>
        </Button>
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
              <TableHead>Dirección</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports?.map((report) => {
              return (
                <TableRow>
                  <TableCell className="max-w-14">
                    {report.image_url ? (
                      <img
                        src={resolveUrl(report.image_url)}
                        alt={report.description}
                      />
                    ) : (
                      <Skeleton className="w-8 h-8 animate-none" />
                    )}
                  </TableCell>
                  <TableCell className="w-[100px]">
                    {report.title.slice(0, 20)}
                  </TableCell>
                  <TableCell className="text-ellipsis max-w-[450px] *:max-h-[30px] overflow-hidden">
                    {report.description.slice(0, 100)}
                  </TableCell>
                  <TableCell>
                    <ReportStateBadge state={report.state} />
                  </TableCell>
                  <TableCell>{report.type.name}</TableCell>
                  <TableCell>
                    {report.state_change_at.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{report.address}</TableCell>
                  <TableCell className="flex justify-end items-center gap-2 h-full">
                    <Button variant="default">Ver</Button>
                    <Button variant="outline">
                      <Link to={`/dashboard/reports/${report.report_id}/edit`}>
                        Editar
                      </Link>
                    </Button>
                    <DeleteButton report_id={report.report_id} />
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

function ReportPageSkeleton() {
  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex justify-between items-center">
        <h1 className="text-4xl font-sans-accent mb-6">Mis denuncias</h1>
        <Button className="flex gap-2">
          <Link to="/dashboard/reports/add" className="flex gap-2">
            <CirclePlus className="h-6 w-6" />
            Denunciar un hecho
          </Link>
        </Button>
      </hgroup>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="w-[100px]">Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modificado</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(10).fill(0).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="font-medium flex items-center"></TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="w-24 h-4" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="w-24 h-4" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

function ReportStateBadge({ state }: { state: ReportState }) {
  const classes: Record<ReportState, string> = {
    [REPORT_STATES.OPENED]: "bg-blue-500",
    [REPORT_STATES.CLOSED]: "bg-red-400",
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
    [REPORT_STATES.OPENED]: <CircleDot className="h-4 w-4" />,
    [REPORT_STATES.CLOSED]: <CircleX className="h-4 w-4" />,
    [REPORT_STATES.IN_PROGRESS]: <CirclePlay className="h-4 w-4" />,
    [REPORT_STATES.SOLVED]: <CircleCheckBig className="h-4 w-4" />,
  };

  return (
    <Badge className={cn(classes[state], "flex gap-1 text-[14px] max-w-min")}>
      {icons[state]}
      {text[state]}
    </Badge>
  );
}
