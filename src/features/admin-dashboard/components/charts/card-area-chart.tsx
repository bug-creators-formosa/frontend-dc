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
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type CardAreaChartProps = {
  data: { category: string; value: number }[];
  areaLabel: string;
  title?: string;
  description?: string;
};

export default function CardAreaChart(props: CardAreaChartProps) {
  const chartConfig = {
    value: {
      label: props.areaLabel,
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>{props.title ?? props.areaLabel}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] max-h-[300px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={props.data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"category"}
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Area
              dataKey={"value"}
              type="natural"
              fill={`var(--color-value)`}
              fillOpacity={0.4}
              stroke={`var(--color-value)`}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
