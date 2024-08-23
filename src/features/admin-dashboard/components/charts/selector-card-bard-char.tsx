import { useState } from "react";
import CardBarChart from "./card-bar-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

export type SelectorCardBarChartProps = {
  data: { [x: string]: { category: string; value: number }[] };
  title?: string;
  description?: string;
};

export default function SelectorCardBarChart(props: SelectorCardBarChartProps) {
  const [selected, setSelected] = useState(Object.keys(props.data)[0]);

  const handleSelect = (key: string) => {
    setSelected(key);
  };

  const categories = Object.keys(props.data).map((key) => {
    return key;
  });
  const values = props.data[selected];

  return (
    <CardBarChart
      data={values}
      barLabel={selected}
      valueForTickFormatter={12}
      title={props.title}
      description={`${props.description} ${selected}`}
      rightContent={
        <Select value={selected} onValueChange={handleSelect}>
          <SelectTrigger
            className="ml-auto h-7 w-auto rounded-lg pl-2.5"
            aria-label="Seleccionar un valor"
          >
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((category) => {
              return (
                <SelectItem
                  key={category}
                  value={category}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    {category}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      }
    />
  );
}
