"use client";

import {
  BookOpen,
  Bot,
  Calendar,
  Frame,
  Paperclip,
  Map,
  PieChart,
  SquareTerminal,
  Users
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCredentials } from "@/hooks/use-cred";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { name, email } = useCredentials();
  const data = {
    user: {
      name: name,
      email: email,
    },
    teams: [
      {
        name: "Sinari Desa",
        logo: "/img/logo/logo.png",
        plan: "Admin",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/admin/dashboard/overview",
          },
        ],
      },
      {
        title: "Teams",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "All Teams",
            url: "/admin/teams/all-teams",
          },
        ],
      },
      {
        title: "Courses",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "All Courses",
            url: "/admin/courses/all-courses",
          },
        ],
      },
      {
        title: "Events",
        url: "#",
        icon: Calendar,
        items: [
          {
            title: "All Events",
            url: "/admin/events/all-events",
          },
        ],
      },
      {
        title: "Certificates",
        url: "#",
        icon: Paperclip,
        items: [
          {
            title: "All Certificates",
            url: "/admin/certificates/all-certificates",
          },
        ],
      },
      {
        title: "Users",
        url: "#",
        icon: Users,
        items: [
          {
            title: "All Users",
            url: "/admin/users/all-users",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
