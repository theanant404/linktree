"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/app/(dashboard)/account/components/nav-main"
import { NavProjects } from "@/app/(dashboard)/account/components/nav-projects"
import { NavUser } from "@/app/(dashboard)/account/components/nav-user"
import { TeamSwitcher } from "@/app/(dashboard)/account/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const navdata = {
  navMain: [
    {
      title: "Link Card",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Edit Link Card",
      url: "/account/edit-link-card",
      icon: Bot,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sesssion =useSession()
  // console.log(sesssion.data?.user.image)
  const router=useRouter()
  if(sesssion.status==="unauthenticated" || sesssion.data===null){
    router.push("/auth/v1/sign-in")
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>

        <NavMain items={navdata.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center">
          <ThemeSwitcher/>
        </div>
        {sesssion.data!=null && (
          <NavUser user={sesssion.data?.user} />
        )}
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
