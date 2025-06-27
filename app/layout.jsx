import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FitGym Pro - Admin Dashboard",
  description: "Gym management admin dashboard",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
