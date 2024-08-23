import CardAreaChart from "@/features/admin-dashboard/components/charts/card-area-chart";
import CardBarChart from "@/features/admin-dashboard/components/charts/card-bar-chart";
import { CardDonutChart } from "@/features/admin-dashboard/components/charts/card-donut-chart";
import CardPieChart from "@/features/admin-dashboard/components/charts/card-pie-chart";
import SelectorCardBarChart, {
  SelectorCardBarChartProps,
} from "@/features/admin-dashboard/components/charts/selector-card-bard-char";
import { reportTypesByState } from "@/features/admin-dashboard/services/report-types";
import { getReportTypesMostReported } from "@/features/admin-dashboard/services/reports";
import {
  getUsersByMonth,
  MONTH_NAMES,
} from "@/features/admin-dashboard/services/users";
import { useQuery } from "@tanstack/react-query";

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

  console.log(REPORT_TYPE_BY_STATE_FORMATTED);

  const USERS_BY_MONTH_FORMATTED = usersByMonth?.map((user, i) => ({
    category: `${MONTH_NAMES[user.month - 1]} ${user.year}`,
    value: user.users,
    fill: `hsl(${i * 30}, 70%, 50%)`,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      {!isLoadingUsersByMonth &&
        USERS_BY_MONTH_FORMATTED &&
        USERS_BY_MONTH_FORMATTED?.length > 0 && (
          <CardBarChart
            data={USERS_BY_MONTH_FORMATTED}
            barLabel="Usuarios"
            description="Creados por mes"
          />
        )}
      {!isLoadingUsersByMonth &&
        USERS_BY_MONTH_FORMATTED &&
        USERS_BY_MONTH_FORMATTED?.length > 0 && (
          <CardAreaChart
            data={USERS_BY_MONTH_FORMATTED}
            areaLabel="Usuarios"
            description="Creados por mes"
          />
        )}
      {!isLoadingReportTypes &&
        REPORT_FORMATTED &&
        REPORT_FORMATTED?.length > 0 && (
          <CardPieChart data={REPORT_FORMATTED} pieLabel="Denuncias" />
        )}
      {!isLoadingReportTypes &&
        REPORT_FORMATTED &&
        REPORT_FORMATTED?.length > 0 && (
          <CardDonutChart data={REPORT_FORMATTED} donutLabel="Denuncias" />
        )}
      {!isLoadingReportTypeByState && REPORT_TYPE_BY_STATE_FORMATTED && (
        <SelectorCardBarChart data={REPORT_TYPE_BY_STATE_FORMATTED} />
      )}
    </div>
  );
}
