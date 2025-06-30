"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, Clock, DollarSign, AlertTriangle, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

function StatsCardSkeleton() {
  return (
    <Card className="bg-black border border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-11 w-11 rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-16" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards({ stats = {}, loading = false, members }) {

  const activeCount = members.filter((m) => m.status === "active").length
  const pendingCount = members.filter((m) => m.status === "pending").length
  const expiringCount = members.filter((m) => m.status === "expired").length
  const monthlyCurrentIncome = stats.currentMonthIncome
  const monthlyPreviousIncome = stats.previousMonthIncome

  const safePreviousIncome = monthlyPreviousIncome === 0 ? 1 : monthlyPreviousIncome



  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const {
    activeMembers = activeCount,
    pendingMembers = pendingCount,
    monthlyIncome = monthlyCurrentIncome,
    upcomingExpires = expiringCount,
    activeMembersChange = 0,
    monthlyIncomeChange = (((monthlyCurrentIncome-safePreviousIncome)/(safePreviousIncome))*100).toFixed(2),
    upcomingExpiresChange = 0,
  } = stats

  const statsData = [
    {
      title: "Active Members",
      value: activeMembers,
      change: `${activeMembersChange > 0 ? "+" : ""}${activeMembersChange}%`,
      changeText: "",
      icon: UserCheck,
      iconBg: "bg-green-500",
      showchangebadge: false
    },
    {
      title: "Pending Members",
      value: pendingMembers,
      change: pendingMembers.toString(),
      changeText: "",
      icon: Clock,
      iconBg: "bg-amber-500",
      positive: null,
      showchangebadge: false
    },
    {
      title: "Monthly Income",
      value: `₹${monthlyIncome}`,
      change: `${monthlyIncomeChange > 0 ? "+" : ""}${monthlyIncomeChange}%`,
      changeText: "from last month",
      icon: DollarSign,
      iconBg: "bg-blue-500",
      positive: monthlyIncomeChange > 0,
      showchangebadge: true
    },
    {
      title: "Expired Members",
      value: upcomingExpires,
      change: `${upcomingExpiresChange > 0 ? "+" : ""}${upcomingExpiresChange}%`,
      changeText: "from last month",
      icon: AlertTriangle,
      iconBg: "bg-red-500",
      positive: upcomingExpiresChange < 0,
      showchangebadge: false
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="bg-black border border-gray-800 hover:border-gray-600 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-300">{stat.title}</CardTitle>
            <div className={`p-3 ${stat.iconBg} rounded-lg`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="flex items-center gap-2">
              {stat.showchangebadge && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.positive
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  <TrendingUp className={`h-3 w-3 ${stat.positive ? "text-green-400" : "text-red-400 rotate-180"}`} />
                  {stat.change}
                </div>
              )}
              <span className="text-xs text-gray-400">{stat.changeText}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
