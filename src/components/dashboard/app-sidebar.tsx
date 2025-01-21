import { Barcode, ChartAreaIcon, CircleUser, Layers2, LogOut, UserRoundPlus } from "lucide-react"
import {Link} from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ThemeSwitch } from "./theme-switch";
import ProfileCard from "./profile-card";
import LogoutDrawer from "./logout-drawer";
import { Button } from "../ui/button";

// Menu items.
const items = [
  {
    title: "Members",
    url: "/members",
    icon: UserRoundPlus,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: CircleUser,
  },
  {
    title : "Category",
    url : "/category",
    icon : Layers2
  },
  {
    title : "Transactions",
    url : "/transactions",
    icon : Barcode
  }
];

const overview = [
    {
        title: "Overview",
        url: "/overview",
        icon: ChartAreaIcon,
    },
];

export function AppSidebar() {
  return (
    <Sidebar>
        <SidebarHeader>
        <Link to={"/"} className="flex flex-row items-center gap-2">
          <img src="/logo.png" className="w-12 h-12 object-contain" alt="logo" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">XCon<span className="text-primary">tour</span></h1>
        </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Insights</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {overview.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex flex-row justify-end items-center gap-2">
            <ThemeSwitch />
            <ProfileCard />
            <LogoutDrawer>
                <Button variant={"destructive"} size={"icon"}>
                    <LogOut />
                </Button>
            </LogoutDrawer>
        </SidebarFooter>
    </Sidebar>
  )
}
