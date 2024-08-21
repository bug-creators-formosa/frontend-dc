import CardAreaChart from "@/features/admin-dashboard/components/charts/card-area-chart";
import CardBarChart from "@/features/admin-dashboard/components/charts/card-bar-chart";
import CardPieChart from "@/features/admin-dashboard/components/charts/card-pie-chart";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <CardBarChart
        data={USERS_CREATED_BY_MONTH}
        barLabel="Usuarios"
        description="Creados por mes"
      />
      <CardAreaChart
        data={USERS_CREATED_BY_MONTH}
        areaLabel="Usuarios"
        description="Creados por mes"
      />
      <CardPieChart data={REPORTS_BY_TYPE} pieLabel="Denuncias" />
    </div>
  );
}
