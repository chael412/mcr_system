import { AiFillFileText } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    LayoutDashboard,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";

export function AppSidebar({ ...props }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();

    const data = {
        teams: [
            {
                name: "MCRO File System",
                logo: "/img/cvrs-logo.png",
                plan: "Enterprise",
            },
        ],
        navMain: [
            {
                title: "Dashboard",
                url: route("dashboard"),
                icon: LayoutDashboard,
                isActive: url === route("dashboard", {}, false),
            },
            {
                title: "Birth Certificates",
                url: route("birth_certificates.index"),
                icon: AiFillFileText,
                isActive:
                    url === route("birth_certificates.index", {}, false) ||
                    url === route("birth_certificates.create", {}, false) ||
                    (url.includes("/birth_certificates/") &&
                        url.includes("/edit")) ||
                    url.includes("/birth_certificates/"),
            },
            {
                title: "Marriage Certificates",
                url: route("marriage_certificates.index"),
                icon: AiFillFileText,
                isActive:
                    url === route("marriage_certificates.index", {}, false) ||
                    url === route("marriage_certificates.create", {}, false) ||
                    (url.includes("/marriage_certificates/") &&
                        url.includes("/edit")) ||
                    url.includes("/marriage_certificates/"),
            },
            {
                title: "Death Certificates",
                url: route("death_certificates.index"),
                icon: AiFillFileText,
                isActive:
                    url === route("death_certificates.index", {}, false) ||
                    url === route("death_certificates.create", {}, false) ||
                    (url.includes("/death_certificates/") &&
                        url.includes("/edit")) ||
                    url.includes("/death_certificates/"),
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
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
