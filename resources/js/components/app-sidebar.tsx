import { Link, usePage } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';

import { mainNavGroups } from '@/components/nav-default';
import { hotelNavGroups } from '../../../modules/Hotel/resources/js/navigation';

export function AppSidebar() {
    const { url } = usePage();

    let navGroups = mainNavGroups;

    switch (true) {
        case url.startsWith('/hotel') ||
            url.startsWith('/company') ||
            url.startsWith('/amenities-room'):
            navGroups = hotelNavGroups();
            break;

        default:
            navGroups = mainNavGroups;
            break;
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain groups={navGroups} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
