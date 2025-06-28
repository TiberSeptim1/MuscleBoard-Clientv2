"use client"

import { Button } from "@/components/ui/button"
import { Activity, Users, CreditCard, Calendar, TrendingUp, Menu, Settings, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigationItems = [
  { name: "Dashboard", icon: Activity, active: true },
  { name: "Members", icon: Users, active: false },
]
const logout = () => {
  const confirmation = confirm("Are you sure you want to log out?");
  if (confirmation) {
    supabase.auth.signOut();
  }
};
function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-black border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MuscleBoard</h1>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full justify-start h-12 px-4 rounded-lg ${
                item.active ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-900 hover:text-white"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">admin@muscleboard.com</p>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
            {/* <Settings className="h-4 w-4" /> */}
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-4 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white border border-gray-800 hover:border-red-500"
        >
          <LogOut className="mr-3 h-4 w-4" onClick={logout}/>
          <span className="font-medium">Log Out</span>
        </Button>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <>
      <div className="hidden lg:block w-72">
        <SidebarContent />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-black text-white hover:bg-gray-900 border border-gray-800"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 border-gray-800">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
