import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Harvest } from "@/types/harvest";

interface HarvestLineChartProps {
  harvests: Harvest[];
}

export default function HarvestLineChart({ harvests }: HarvestLineChartProps) {
  const sortedHarvests = [...harvests].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = sortedHarvests.map((harvest) => ({
    date: harvest.date,
    quantity: harvest.quantity,
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          Evolução da quantidade de colheita ao longo do tempo
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} t`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="quantity"
              stroke="#8ac817"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
