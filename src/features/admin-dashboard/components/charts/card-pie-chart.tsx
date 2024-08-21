import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import { Label, Pie, PieChart } from "recharts";

type CardPieChartProps = {
  data: { category: string; value: number; fill: string }[];
  pieLabel: string;
};

export default function CardPieChart(props: CardPieChartProps) {
  const chatPieConfig = {
    ["value"]: {
      label: "Denuncias",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="m-4">
      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Creados por Mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chatPieConfig}
            className="min-h-[200px] w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={props.data}
                dataKey="value"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {props.data.reduce(
                              (acc, { value }) => acc + value,
                              0
                            )}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {props.pieLabel}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
