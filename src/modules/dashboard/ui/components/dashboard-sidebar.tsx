"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardUserButton } from "./dashboard-user-button"

const firstSection = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" }
]

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" }
]

export const DashboardSidebar = () => {
  const pathname = usePathname() || "/agents"

  return (
    <Sidebar className="bg-[#0f1117] text-white shadow-lg border-r border-white/5">
      {/* Logo */}
      <SidebarHeader className="px-6 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="Callawa.IA"
            width={44}
            height={44}
            className="rounded-full border border-white/10 shadow"
          />
          <p className="text-xl font-bold tracking-wide group-hover:text-green-400 transition-colors">
            Callawa<span className="text-green-400">.IA</span>
          </p>
        </Link>
      </SidebarHeader>

      {/* Line */}
      <div className="px-6">
        <Separator className="bg-white/10 h-px" />
      </div>

      <SidebarContent className="pt-2 space-y-6">
        {/* First menu section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "group h-11 px-4 rounded-lg transition-colors flex items-center gap-3 font-medium text-sm",
                      pathname === item.href
                        ? "bg-white/5 border border-green-500/20 text-green-300"
                        : "hover:bg-white/5 hover:text-green-200 text-white/80"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className="size-5 group-hover:scale-105 transition-transform" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Second menu section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className={cn(
                      "group h-11 px-4 rounded-lg transition-colors flex items-center gap-3 font-medium text-sm",
                      pathname === item.href
                        ? "bg-yellow-400/10 border border-yellow-300/20 text-yellow-300"
                        : "hover:bg-yellow-200/5 hover:text-yellow-200 text-white/80"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className="size-5 group-hover:scale-105 transition-transform" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-6 py-4 border-t border-white/10 mt-auto">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
