import { Bell, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-2 text-lg">Welcome back! Here's what's happening at your gym today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs font-bold">3</Badge>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
