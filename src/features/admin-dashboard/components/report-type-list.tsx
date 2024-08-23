import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { ReportType } from "../services/report-types";
import { Button } from "@/components/shadcn/ui/button";
import { ReportTypeAdd } from "./report-type-add";

type ReportTypeListProps = {
  reportTypes: ReportType[];
};

export default function ReportTypeList(props: ReportTypeListProps) {
  const handleNavigation = (ReportType: ReportType) => () => {
    console.log(ReportType);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.reportTypes.map((reportType) => {
          return (
            <TableRow key={reportType.report_type_id}>
              <TableCell className="font-medium flex items-center">
                <span className="ml-2">{reportType.name}</span>
              </TableCell>
              <TableCell>{reportType.description}</TableCell>

              <TableCell className="text-right">
                <ReportTypeAdd
                  buttonTitle="Editar"
                  buttonVariant="outline"
                  reportType={reportType}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function ReportTypeListSkeleton() {
  return <></>;
}
