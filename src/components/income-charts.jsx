import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, DollarSign } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

function ChartSkeleton() {
  return (
    <Card className="bg-black border border-gray-800">
      <CardHeader className="pb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-80 rounded-lg" />
      </CardContent>
    </Card>
  )
}

export function IncomeCharts({
  monthlyData = [],
  yearlyIncome = 0,
  totalIncome = 0,
  yearlyGrowth = 0,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="space-y-6">
        <ChartSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black border border-gray-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-white">Monthly Income Trend</CardTitle>
          <CardDescription className="text-gray-400">Income over the last 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Income"]}
                contentStyle={{
                  backgroundColor: "#000000",
                  border: "1px solid #333333",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fill="url(#incomeGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black border border-gray-800 hover:border-gray-600 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-white">Yearly Income</CardTitle>
                <CardDescription className="text-gray-400">Total income for 2024</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">${yearlyIncome.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-3">
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  yearlyGrowth >= 0
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                <TrendingUp className={`h-3 w-3 ${yearlyGrowth >= 0 ? "text-green-400" : "text-red-400 rotate-180"}`} />
                {yearlyGrowth > 0 ? "+" : ""}
                {yearlyGrowth}%
              </div>
              <span className="text-sm text-gray-400">compared to 2023</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border border-gray-800 hover:border-gray-600 transition-colors">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-700 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-white">Total Income</CardTitle>
                <CardDescription className="text-gray-400">All-time total income</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">${totalIncome.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-3">
              <div className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-sm font-medium">Since 2020</div>
              <span className="text-sm text-gray-400">gym opening</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
