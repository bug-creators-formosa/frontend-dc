import { Badge } from "@/components/shadcn/ui/badge";
import { cn } from "@/lib/utils";
import { CircleCheckBig, CircleDot, CirclePlay, CircleX } from "lucide-react";
import { ReactNode } from "react";
import { REPORT_STATES, ReportState } from "../consts/report-states";

export function ReportStateBadge({ state }: { state: ReportState }) {
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
      <div>{icons[state]}</div>
      <p className="text-nowrap">{text[state]}</p>
    </Badge>
  );
}
