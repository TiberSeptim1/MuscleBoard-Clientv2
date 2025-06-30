import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header({metaData}) {
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-2 text-lg">Welcome back {metaData.name}! Here's what's happening at your gym today.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
