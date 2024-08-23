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
import useAuth from "@/features/auth/hooks/use-auth";
import { resolveUrl } from "@/lib/utils";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { getReports } from "../services/user-reports";
import DeleteButton from "./delete-button";
import { ReportStateBadge } from "./report-state-badge";

type ReportPageProps = {
  reports: Awaited<ReturnType<typeof getReports>>;
  isLoading: boolean;
  title: string;
};

export default function ReportTable(props: ReportPageProps) {
  const { isAdmin } = useAuth();
  if (props.isLoading) {
    return <ReportPageSkeleton />;
  }

  return (
    <main className="px-2 md:px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-4xl font-sans-accent mb-6">{props.title}</h1>
        {!isAdmin && (
          <Button className="flex gap-2">
            <Link to="/dashboard/reports/add" className="flex gap-2">
              <CirclePlus className="h-6 w-6" />
              Iniciar reclamo
            </Link>
          </Button>
        )}
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
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.reports?.map((report) => {
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
                    <ReportStateBadge
                      report_id={report.report_id}
                      state={report.state}
                      showSelect={false}
                    />
                  </TableCell>
                  <TableCell>{report.type.name}</TableCell>
                  <TableCell>
                    {new Date(report.state_change_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{report.address}</TableCell>
                  <TableCell className="align-middle text-left">
                    <div className="flex gap-4">
                      <Link to={`/dashboard/reports/${report.report_id}`}>
                        <Button variant="default">Ver</Button>
                      </Link>
                      {!isAdmin && (
                        <>
                          <Button variant="outline">
                            <Link
                              to={`/dashboard/reports/${report.report_id}/edit`}
                            >
                              Editar
                            </Link>
                          </Button>
                          <DeleteButton report_id={report.report_id} />
                        </>
                      )}
                    </div>
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
            Iniciar reclamo
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
