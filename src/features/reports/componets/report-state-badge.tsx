import { Badge } from "@/components/shadcn/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import useAuth from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, CircleDot, CirclePlay, CircleX } from "lucide-react";
import { ReactNode } from "react";
import { REPORT_STATES, ReportState } from "../consts/report-states";
import { changeReportState } from "../services/user-reports";

export function ReportStateBadge({
  report_id,
  state,
}: {
  report_id: string;
  state: ReportState;
}) {
  const { isAdmin } = useAuth();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["reports"],
    mutationFn: changeReportState,
  });

  const client = useQueryClient();

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

  if (!isAdmin) {
    return (
      <Badge className={cn(classes[state], "flex gap-1 text-[14px] max-w-min")}>
        <div>{icons[state]}</div>
        <p className="text-nowrap">{text[state]}</p>
      </Badge>
    );
  }
  console.log(state);
  return (
    <>
      {isAdmin && (
        <Select
          value={state ?? ""}
          onValueChange={async (state) => {
            await mutateAsync({
              report_id,
              state: state.replace(" ", "-") as ReportState,
            });
            client.invalidateQueries({
              queryKey: ["reports", report_id],
            });
          }}
          disabled={isPending}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                <div className="flex gap-2 items-center">
                  <div>{icons[state]}</div>
                  <p className="text-nowrap">{text[state]}</p>
                  <p>{state}</p>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(REPORT_STATES).map((state) => {
                return (
                  <SelectItem key={state} value={state}>
                    <div className="flex gap-2 items-center">
                      <div>{icons[state as ReportState]}</div>
                      <p className="text-nowrap">
                        {text[state as ReportState]}
                      </p>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
}
