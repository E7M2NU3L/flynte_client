import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "Week 1", Income: 186, Expenses: 80 },
  { month: "February", Income: 305, Expenses: 200 },
  { month: "March", Income: 237, Expenses: 120 },
  { month: "April", Income: 73, Expenses: 190 },
  { month: "May", Income: 209, Expenses: 130 },
  { month: "June", Income: 214, Expenses: 140 },
]

const chartConfig = {
  Income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  Expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function HeroChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income - Expense Info</CardTitle>
        <CardDescription>
          Showing the transactions made for income and expenses for the month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="Income"
              type="natural"
              fill="var(--color-Income)"
              fillOpacity={0.4}
              stroke="var(--color-Income)"
              stackId="a"
            />
            <Area
              dataKey="Expenses"
              type="natural"
              fill="var(--color-Expenses)"
              fillOpacity={0.4}
              stroke="var(--color-Expenses)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Transactions are up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
