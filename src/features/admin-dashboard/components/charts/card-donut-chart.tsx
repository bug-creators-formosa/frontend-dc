import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { useMemo, useState } from "react";

type CardDonutChartProps = {
  data: { category: string; value: number; fill: string }[];
  donutLabel: string;
  title?: string;
  description?: string;
};

export function CardDonutChart(props: CardDonutChartProps) {
  const id = "pie-interactive";
  const [activeCategory, setActiveCategory] = useState(props.data[0].category);

  const chartConfig = useMemo(
    () =>
      props.data.reduce<ChartConfig>((acc, item) => {
        acc[item.category] = {
          label: item.category,
          color: item.fill,
        };
        return acc;
      }, {}),
    [props.data]
  ) as ChartConfig;

  console.log(chartConfig);

  const activeIndex = useMemo(
    () => props.data.findIndex((item) => item.category === activeCategory),
    [activeCategory]
  );
  const categories = useMemo(
    () =>
      props.data.map((item) => {
        return { category: item.category, value: item.value, fill: item.fill };
      }),
    []
  );

  return (
    <Card data-chart={id} className="flex flex-col m-4">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{props.title ?? props.donutLabel}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-auto rounded-lg pl-2.5"
            aria-label="Seleccionar un valor"
          >
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map(({ category, fill }) => {
              const config = chartConfig[category as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={category}
                  value={category}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `${fill}`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={props.data}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
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
                          {props.data[activeIndex].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {props.donutLabel}
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
  );
}
