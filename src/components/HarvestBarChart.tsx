import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Harvest {
  id: number;
  userId: number;
  date: string;
  location: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  quantity: number;
  cropType: string;
}

interface HarvestBarChartProps {
  harvests: Harvest[];
}

export default function HarvestBarChart({ harvests }: HarvestBarChartProps) {
  const data = harvests.map((harvest) => ({
    location: harvest.location,
    quantity: harvest.quantity,
  }));

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Quantidade de colheita por local</CardTitle>
      </CardHeader>
      <CardContent className="lg:pl-2 pl-0">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="location"
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
            <Bar dataKey="quantity" fill="#8ac817" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
