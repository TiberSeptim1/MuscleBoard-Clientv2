// import { Link } from "react-router-dom";
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

function TableSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-black border border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-20" />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-36" />
      </div>
      <Card className="bg-black border border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-18 rounded-full" />
              <Skeleton className="h-6 w-18 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



function getStatusBadge(status) {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border border-green-500/30"
    case "pending":
      return "bg-amber-500/20 text-amber-400 border border-amber-500/30"
    case "expired":
      return "bg-red-500/20 text-red-400 border border-red-500/30"
    default:
      return "bg-gray-800 text-gray-400 border border-gray-700"
  }
}

export function MemberTable({
  members,
  loading,
  onAddMember = () => {},
  onViewMember = () => {},
  onSearchChange = () => {},
  searchTerm, setSearchTerm
}) {


  if (loading) {
    return <TableSkeleton />
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    onSearchChange(value)
  }

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const activeCount = members.filter((m) => m.status === "active").length
  const pendingCount = members.filter((m) => m.status === "pending").length
  const expiringCount = members.filter((m) => m.status === "expired").length
  const expiringAndPendingCount = members.filter((m) => m.status === "pending and expired").length
  return (
    <div className="space-y-6">
      <Card className="bg-black border border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" className="bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onAddMember} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2">
          <Plus className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </div>

      <Card className="bg-black border border-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-white">All Members</CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                {members.length} total members across all statuses
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">{activeCount} Active</Badge>
              <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {pendingCount} Pending
              </Badge>
              <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">{expiringCount} Expired</Badge>
              <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">{expiringAndPendingCount} Expired and Pending</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-300 font-semibold">Name</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Plan</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Expiry Date</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Status</TableHead>
                  <TableHead className="text-gray-300 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                      No members found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map(({ name, frequency, endDate, status, _id }, i) => (
                    <TableRow key={i} className="border-gray-800">
                      <TableCell className="font-semibold text-white">{name}</TableCell>
                      <TableCell className="text-gray-300">{frequency} Months</TableCell>
                      <TableCell className="text-gray-300">{formatDate(endDate)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(status)}>{status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 text-gray-400 hover:text-white hover:bg-gray-800"
                          onClick={() => onViewMember(members)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
