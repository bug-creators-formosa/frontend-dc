import { ReportTypeAdd } from "@/features/admin-dashboard/components/report-type-add";
import ReportTypeList, {
  ReportTypeListSkeleton,
} from "@/features/admin-dashboard/components/report-type-list";
import { getReportTypes } from "@/features/admin-dashboard/services/report-types";
import { useQuery } from "@tanstack/react-query";

export default function ReportTypesPage() {
  const { data: reportTypes, isLoading } = useQuery({
    queryKey: ["report-types"],
    queryFn: () => getReportTypes(),
  });

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Tipos de reclamos</h1>
        <ReportTypeAdd buttonTitle="Agregar" />
      </hgroup>

      {isLoading && <ReportTypeListSkeleton />}
      {!isLoading && reportTypes && (
        <div>
          <ReportTypeList reportTypes={reportTypes} />
        </div>
      )}
    </main>
  );
}
