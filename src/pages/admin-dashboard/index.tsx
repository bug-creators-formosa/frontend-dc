import CardAreaChart from "@/features/admin-dashboard/components/charts/card-area-chart";
import CardBarChart from "@/features/admin-dashboard/components/charts/card-bar-chart";
import { CardDonutChart } from "@/features/admin-dashboard/components/charts/card-donut-chart";
import CardPieChart from "@/features/admin-dashboard/components/charts/card-pie-chart";
import {
  getReportsByStateAndMonth,
  getReportTypesMostReported,
} from "@/features/admin-dashboard/services/reports";
import {
  getUsersByMonth,
  MONTH_NAMES,
} from "@/features/admin-dashboard/services/users";
import { useQuery } from "@tanstack/react-query";

const USERS_CREATED_BY_MONTH = [
  { category: "Enero", value: 100 },
  { category: "Febrero", value: 200 },
  { category: "Marzo", value: 100 },
  { category: "Abril", value: 278 },
  { category: "Mayo", value: 189 },
  { category: "Junio", value: 239 },
  { category: "Julio", value: 349 },
  { category: "Agosto", value: 342 },
  { category: "Septiembre", value: 249 },
  { category: "Octubre", value: 342 },
  { category: "Noviembre", value: 349 },
  { category: "Diciembre", value: 342 },
];

const REPORTS_BY_TYPE = [
  { category: "Baches", value: 65, fill: "red" },
  { category: "Alumbrado público roto", value: 213, fill: "blue" },
  { category: "Árbol caído", value: 126, fill: "green" },
  { category: "Boca de tormenta tapada", value: 152, fill: "yellow" },
  { category: "Basura en lugar incorrecto", value: 32, fill: "purple" },
  { category: "Señalización vial dañada", value: 10, fill: "orange" },
  {
    category: "Áreas verdes descuidadas o con maleza",
    value: 12,
    fill: "pink",
  },
  {
    category: "Contenedores de basura rebosantes o sin tapa",
    value: 62,
    fill: "cyan",
  },
  {
    category: "Abandono de vehículos o chatarra en espacios públicos",
    value: 12,
    fill: "teal",
  },
  {
    category: "Falta de mantenimiento en parques o áreas recreativas",
    value: 89,
    fill: "indigo",
  },
];

export default function DashboardIndex() {
  const { data: usersByMonth, isLoading: isLoadingUsersByMonth } = useQuery({
    queryKey: ["users-by-month"],
    queryFn: () => getUsersByMonth(),
  });

  const { data: reportTypesMostReported, isLoading: isLoadingReportTypes } =
    useQuery({
      queryKey: ["report-types-most-reported"],
      queryFn: () => getReportTypesMostReported(),
    });

  // const { data: byStateAndMonth, isLoading: isLoadingByStateAndMonth } =
  //   useQuery({
  //     queryKey: ["by-state-and-month"],
  //     queryFn: () => getReportsByStateAndMonth(),
  //   });

  const REPORT_FORMATTED = reportTypesMostReported?.map((report, i) => ({
    category: report.type_name,
    value: +report.reports,
    fill: `hsl(${i * 30}, 70%, 50%)`,
  }));

  const USERS_BY_MONTH_FORMATTED = usersByMonth?.map((user, i) => ({
    category: `${MONTH_NAMES[user.month - 1]} ${user.year}`,
    value: user.users,
    fill: `hsl(${i * 30}, 70%, 50%)`,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      {!isLoadingUsersByMonth && USERS_BY_MONTH_FORMATTED && (
        <CardBarChart
          data={USERS_BY_MONTH_FORMATTED}
          barLabel="Usuarios"
          description="Creados por mes"
        />
      )}
      {!isLoadingUsersByMonth && USERS_BY_MONTH_FORMATTED && (
        <CardAreaChart
          data={USERS_BY_MONTH_FORMATTED}
          areaLabel="Usuarios"
          description="Creados por mes"
        />
      )}
      {!isLoadingReportTypes && REPORT_FORMATTED && (
        <CardPieChart data={REPORT_FORMATTED} pieLabel="Denuncias" />
      )}
      {!isLoadingReportTypes && REPORT_FORMATTED && (
        <CardDonutChart data={REPORT_FORMATTED} donutLabel="Denuncias" />
      )}
    </div>
  );
}
