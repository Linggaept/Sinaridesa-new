"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ChartData {
  last7days: { teams: number; courses: number; events: number; users: number; certificates: number };
  last30days: { teams: number; courses: number; events: number; users: number; certificates: number };
  last90days: { teams: number; courses: number; events: number; users: number; certificates: number };
}

interface ChartAreaInteractiveProps {
  data: ChartData;
}

const chartConfig = {
  value: {
    label: "Count",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = React.useState<keyof ChartData>("last90days");

  const chartData = React.useMemo(() => {
    const selectedData = data[timeRange];
    return [
      { name: "Teams", value: selectedData.teams },
      { name: "Courses", value: selectedData.courses },
      { name: "Events", value: selectedData.events },
      { name: "Users", value: selectedData.users },
      { name: "Certificates", value: selectedData.certificates },
    ];
  }, [data, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>New Content</CardTitle>
        <CardDescription>
          New content created in the selected time range.
        </CardDescription>
        <div className="flex items-center gap-2 pt-2">
            <Select value={timeRange} onValueChange={setTimeRange as any}>
                <SelectTrigger
                className="flex w-40 h-8"
                aria-label="Select a value"
                >
                <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                <SelectItem value="last90days" className="rounded-lg">
                    Last 90 days
                </SelectItem>
                <SelectItem value="last30days" className="rounded-lg">
                    Last 30 days
                </SelectItem>
                <SelectItem value="last7days" className="rounded-lg">
                    Last 7 days
                </SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
