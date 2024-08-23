import CardAreaChart from "@/features/admin-dashboard/components/charts/card-area-chart";
import { CardDonutChart } from "@/features/admin-dashboard/components/charts/card-donut-chart";
import SelectorCardBarChart, {
  SelectorCardBarChartProps,
} from "@/features/admin-dashboard/components/charts/selector-card-bard-char";
import { reportTypesByState } from "@/features/admin-dashboard/services/report-types";
import {
  getReportsByMonth,
  getReportsByStateAndMonth,
  getReportTypesMostReported,
} from "@/features/admin-dashboard/services/reports";
import {
  getUsersByMonth,
  MONTH_NAMES,
} from "@/features/admin-dashboard/services/users";
import { useQuery } from "@tanstack/react-query";

export default function DashboardIndex() {
  // Usuarios por mes
  const { data: usersByMonth, isLoading: isLoadingUsersByMonth } = useQuery({
    queryKey: ["users-by-month"],
    queryFn: () => getUsersByMonth(),
  });

  // Reclamos por mes
  const { data: reportsByMonth, isLoading: isLoadingReportsByMonth } = useQuery(
    {
      queryKey: ["report-by-month"],
      queryFn: () => getReportsByMonth(),
    }
  );

  // Reclamos por estado y mes
  const {
    data: reportsByStateAndMonth,
    isLoading: isLoadingReportsByStateAndMonth,
  } = useQuery({
    queryKey: ["report-by-state-and-month"],
    queryFn: () => getReportsByStateAndMonth(),
  });

  // Tipo de Reclamos más reportados
  const { data: reportTypesMostReported, isLoading: isLoadingReportTypes } =
    useQuery({
      queryKey: ["report-types-most-reported"],
      queryFn: () => getReportTypesMostReported(),
    });

  // Tipo de Reclamos por estado
  const { data: reportTypeByState, isLoading: isLoadingReportTypeByState } =
    useQuery({
      queryKey: ["report-types-by-state"],
      queryFn: () => reportTypesByState(),
    });

  const REPORT_FORMATTED = reportTypesMostReported?.map((report, i) => ({
    category: report.type_name,
    value: +report.reports,
    fill: `hsl(${i * 30}, 70%, 50%)`,
  }));

  console.log({ REPORT_FORMATTED });
  console.log({ reportTypesMostReported });

  const REPORT_TYPE_BY_STATE_FORMATTED =
    reportTypeByState &&
    (Object.keys(reportTypeByState).reduce((acc, key) => {
      // @ts-ignore
      acc[key] = [
        { category: "Abiertas", value: reportTypeByState[key].opened },
        { category: "Cerradas", value: reportTypeByState[key].closed },
        {
          category: "En progreso",
          value: reportTypeByState[key]["in progress"],
        },
        { category: "Resueltas", value: reportTypeByState[key].solved },
      ];
      return acc;
    }, {}) as SelectorCardBarChartProps["data"]);

  const REPORTS_BY_STATE_AND_MONTH_FORMATTED =
    reportsByStateAndMonth &&
    (Object.keys(reportsByStateAndMonth).reduce((acc, key) => {
      const [month, year] = key.split("-").map(Number);
      console.log({ key, year, month });

      const newKey = `${MONTH_NAMES[month - 1]} ${year}`;

      console.log({ key, newKey });

      // @ts-ignore
      acc[newKey] = [
        { category: "Abiertas", value: reportsByStateAndMonth[key].opened },
        { category: "Cerradas", value: reportsByStateAndMonth[key].closed },
        {
          category: "En progreso",
          value: reportsByStateAndMonth[key]["in progress"],
        },
        { category: "Resueltas", value: reportsByStateAndMonth[key].solved },
      ];
      return acc;
    }, {}) as SelectorCardBarChartProps["data"]);

  const REPORTS_BY_MONTH_FORMATTED = reportsByMonth?.map((report, i) => ({
    category: `${MONTH_NAMES[report.month - 1]} ${report.year}`,
    value: report.reports,
    fill: `hsl(${i * 30}, 70%, 50%)`,
  }));

  const USERS_BY_MONTH_FORMATTED = usersByMonth?.map((user, i) => ({
    category: `${MONTH_NAMES[user.month - 1]} ${user.year}`,
    value: user.users,
    fill: `hsl(${i * 30}, 70%, 50%)`,
  }));

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Panel gráfico</h1>
      </hgroup>

      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {!isLoadingReportsByMonth &&
          REPORTS_BY_MONTH_FORMATTED &&
          REPORTS_BY_MONTH_FORMATTED?.length > 0 && (
            <div className="col-span-2">
              <CardAreaChart
                data={REPORTS_BY_MONTH_FORMATTED}
                areaLabel="Reclamos"
                description="Desde el 1ro de Enero hasta hoy."
              />
            </div>
          )}
        {!isLoadingUsersByMonth &&
          USERS_BY_MONTH_FORMATTED &&
          USERS_BY_MONTH_FORMATTED?.length > 0 && (
            <CardAreaChart
              data={USERS_BY_MONTH_FORMATTED}
              areaLabel={"Ciudadanos registrados"}
              description="Desde el 1ro de Enero hasta hoy."
            />
          )}

        {!isLoadingReportsByStateAndMonth &&
          REPORTS_BY_STATE_AND_MONTH_FORMATTED && (
            <SelectorCardBarChart
              data={REPORTS_BY_STATE_AND_MONTH_FORMATTED}
              title="Reclamos por estado y mes"
              description="Estado de los Reclamos en"
            />
          )}

        {!isLoadingReportTypes &&
          REPORT_FORMATTED &&
          REPORT_FORMATTED?.length > 0 && (
            <CardDonutChart
              data={REPORT_FORMATTED}
              donutLabel="Reclamos"
              description="Top 5 de reclamos de ciudadanos."
            />
          )}
        {!isLoadingReportTypeByState && REPORT_TYPE_BY_STATE_FORMATTED && (
          <SelectorCardBarChart
            data={REPORT_TYPE_BY_STATE_FORMATTED}
            title="Tipos de Reclamos por estado"
            description="Estados de los Reclamos del tipo"
          />
        )}
      </div>
    </main>
  );
}
