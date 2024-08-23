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
import { Bar, BarChart, LabelList, XAxis } from "recharts";

type CardBarChartProps = {
  data: { category: string; value: number }[];
  barLabel: string;
  title?: string;
  valueForTickFormatter?: number;
  description?: string;
  rightContent?: React.ReactNode;
};

export default function CardBarChart(props: CardBarChartProps) {
  const chartConfig = {
    value: {
      label: props.barLabel,
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="m-4">
      <CardHeader>
        <div className="grid grid-cols-2 gap-1">
          <div>
            <CardTitle>{props.title ?? props.barLabel}</CardTitle>
            <CardDescription>{props.description}</CardDescription>
          </div>
          {props.rightContent}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={props.data}
            margin={{
              top: 30,
            }}
          >
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                value.slice(0, props.valueForTickFormatter ?? 3)
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill={`var(--color-value)`} radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
