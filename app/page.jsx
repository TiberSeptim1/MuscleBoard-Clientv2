import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/stats-cards"
import { IncomeCharts } from "@/components/income-charts"
import { MemberTable } from "@/components/member-table"

// Sample data - replace with your backend API calls
const sampleStats = {
  activeMembers: 342,
  pendingMembers: 23,
  monthlyIncome: 45230,
  upcomingExpires: 18,
  activeMembersChange: 12,
  monthlyIncomeChange: 8,
  upcomingExpiresChange: -5,
}

const sampleMonthlyData = [
  { month: "Jan", income: 38000 },
  { month: "Feb", income: 42000 },
  { month: "Mar", income: 39000 },
  { month: "Apr", income: 45000 },
  { month: "May", income: 41000 },
  { month: "Jun", income: 47000 },
  { month: "Jul", income: 43000 },
  { month: "Aug", income: 48000 },
  { month: "Sep", income: 44000 },
  { month: "Oct", income: 46000 },
  { month: "Nov", income: 45000 },
  { month: "Dec", income: 45230 },
]

const sampleMembers = [
  { id: 1, name: "John Doe", plan: "Premium", expiryDate: "2025-01-15", status: "Active" },
  { id: 2, name: "Sarah Wilson", plan: "Basic", expiryDate: "2025-02-20", status: "Active" },
  { id: 3, name: "Alex Thompson", plan: "Basic", expiryDate: "N/A", status: "Pending" },
  { id: 4, name: "Robert Smith", plan: "Premium", expiryDate: "2024-12-28", status: "Expiring" },
]

export default function GymDashboard() {
  const [statsLoading, setStatsLoading] = useState(true)
  const [chartsLoading, setChartsLoading] = useState(true)
  const [membersLoading, setMembersLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const statsTimer = setTimeout(() => setStatsLoading(false), 1000)
    const chartsTimer = setTimeout(() => setChartsLoading(false), 1500)
    const membersTimer = setTimeout(() => setMembersLoading(false), 2000)

    return () => {
      clearTimeout(statsTimer)
      clearTimeout(chartsTimer)
      clearTimeout(membersTimer)
    }
  }, [])

  const handleAddMember = () => {
    console.log("Add member clicked")
  }

  const handleViewMember = (member) => {
    console.log("View member:", member)
  }

  const handleSearchChange = (searchTerm) => {
    console.log("Search:", searchTerm)
  }

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8 space-y-8">
            <StatsCards stats={sampleStats} loading={statsLoading} />
            <IncomeCharts
              monthlyData={sampleMonthlyData}
              yearlyIncome={542760}
              totalIncome={1250000}
              yearlyGrowth={15}
              loading={chartsLoading}
            />
            <MemberTable
              members={sampleMembers}
              loading={membersLoading}
              onAddMember={handleAddMember}
              onViewMember={handleViewMember}
              onSearchChange={handleSearchChange}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
