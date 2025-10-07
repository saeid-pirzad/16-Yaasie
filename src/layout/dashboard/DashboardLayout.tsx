import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'

import { queryKeys } from '../../libs/api'
import { useAuthStore } from '../../libs/store'
import { defaultMenuItems } from '../../_shared/init.config'
import { Sidebar } from './SideBar'
import Header from './Header'
import Footer from './Footer'
import { menuActions } from '../../libs/store/menuActions'

const filterMenu = (items: any[], roles: string[]): any[] => {
    return items
        .map(item => {
            if (item.roles && !item.roles.some((r: string) => roles.includes(r))) {
                return null;
            }

            if (item.children) {
                const filteredChildren = filterMenu(item.children, roles)
                if (filteredChildren.length === 0) return null;
                return { ...item, children: filteredChildren }
            }

            return item;
        })
        .filter(Boolean)
}



export default function DashboardLayout() {
    const { user } = useAuthStore()
    const menuQuery = useQuery({
        queryKey: queryKeys.menu.all,
        queryFn: async () => {
            return defaultMenuItems;
        },
        staleTime: 10 * 60 * 1000,
        enabled: !!user,
    });


    useEffect(() => {
        const roles: string[] = JSON.parse(localStorage.getItem('roles') || "[]")

        if (menuQuery.data) {
            const filtered = filterMenu(menuQuery.data, roles)
            menuActions.setItems(filtered)
        } else {

            const filtered = filterMenu(defaultMenuItems, roles)
            menuActions.setItems(filtered)
        }
    }, [menuQuery.data])

    return (
        <>
            <div className="flex h-screen bg-blue-100 dark:bg-slate-900" dir="rtl"
                style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
                <Sidebar
                // isOpen={sidebarOpen}
                // onClose={() => setSidebarOpen(false)}
                />
                <div className="flex-1 flex flex-col pr-4 lg:pr-0 ">
                    <Header />
                    <main className="pt-4 pl-4 pb-4 flex-1">
                        <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
                            <div className="p-6 overflow-y-auto max-h-[calc(100vh-9rem)] ">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}