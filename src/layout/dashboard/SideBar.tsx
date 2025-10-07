import { useMenuStore } from "../../libs/store"
import { useEffect, useState } from 'react'

import { Link, useRouterState } from '@tanstack/react-router'
import {
    CreditCardIcon,
    Contact,
    Home,
    FileText,
    Building,
    BarChart3,
    FileDown,
    Settings,
    ChevronDown,
    ClipboardList,
    UsersRound
} from 'lucide-react'
// Sidebar Component
// import Logo from '../../assets/images/Logo.svg?url';


export const Sidebar = () => {
    const { items: menuItems } = useMenuStore()
    const [collapsedMenus, setCollapsedMenus] = useState<Set<string>>(new Set())
    const routerState = useRouterState()
    const currentPath = routerState.location.pathname

    useEffect(() => {
        const activeParent = menuItems.find((item) =>
            item.children?.some((child) => currentPath.startsWith(child.path))
        )

        if (activeParent) {
            setCollapsedMenus(new Set([activeParent.id]))
        } else {
            setCollapsedMenus(new Set()) // اگه هیچ روتی match نشد همه بسته باشن
        }
    }, [currentPath, menuItems])

    const toggleMenu = (menuId: string) => {
        setCollapsedMenus(prev => {
            if (prev.has(menuId)) {
                return new Set() // بستن منو
            }
            return new Set([menuId]) // فقط همین یکی باز بشه
        })
    }



    // Icon mapping function
    const getIcon = (iconName?: string) => {
        if (!iconName) return null

        switch (iconName) {
            case 'home':
                return <Home className="w-4 h-4 ml-2" />
            case 'icons':
                return <UsersRound className="w-4 h-4 ml-2" />
            case 'file-text':
                return <FileText className="w-4 h-4 ml-2" />
            case 'building':
                return <Building className="w-4 h-4 ml-2" />
            case 'bar-chart-3':
                return <BarChart3 className="w-4 h-4 ml-2" />
            case 'settings':
                return <Settings className="w-4 h-4 ml-2" />
            case 'clipboard-list':
                return <ClipboardList className="w-4 h-4 ml-2" />
            case 'contact':
                return <Contact className="w-4 h-4 ml-2" />
            case 'credit-card':
                return <CreditCardIcon className="w-4 h-4 ml-2" />
            case 'file-down':
                return <FileDown className="w-4 h-4 ml-2" />
            default:
                return null
        }
    }

    return (
        <>
            {/* Mobile overlay */}
            {/*{isOpen && (*/}
            {/*    <div*/}
            {/*        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"*/}
            {/*        onClick={onClose}*/}
            {/*    />*/}
            {/*)} */}

            {/* Sidebar */}
            <aside
                className="fixed lg:sticky bottom-0 top-0 lg:right-0 [right:-18rem] w-64 bg-white flex flex-col  rounded-lg m-4 dark:bg-slate-800">

                <div className="p-4">
                    {/* <img src={Logo} className="mx-auto w-36" /> */}
                </div>
                <nav>
                    <ul className="text-sm text-blue-900 dark:text-white overflow-y-auto max-h-[calc(100vh-7rem)]">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {item.path ? (
                                    <Link
                                        to={item.path}
                                        className="p-2 mx-1 my-1 flex rounded-lg hover:bg-teal-100 relative [&::before]:content-[''] [&::before]:absolute [&::before]:top-0 [&::before]:bottom-0 [&::before]:rounded-l-lg [&::before]:rounded-r-none [&::before]:w-1 [&::before]:-right-2 mr-2 dark:hover:bg-teal-800"
                                        activeProps={{
                                            className: "bg-teal-100 [&::before]:bg-teal-500 dark:bg-teal-800 dark:[&::before]:bg-teal-800",
                                        }}
                                        activeOptions={{ exact: true }}
                                    >
                                        <div className="flex items-center">
                                            {getIcon(item.icon)}
                                            <span className="truncate w-50 block">{item.title}</span>
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => toggleMenu(item.id)}
                                            className="cursor-pointer p-2 mx-1 my-1 flex rounded-lg hover:bg-teal-100 relative [&::before]:content-[''] [&::before]:absolute [&::before]:top-0 [&::before]:bottom-0 [&::before]:rounded-l-lg [&::before]:rounded-r-none [&::before]:w-1 [&::before]:-right-2 mr-2 w-[calc(100%-.75rem)] dark:hover:bg-teal-800"
                                        >
                                            <div className="flex items-center w-full">
                                                <div className="flex-shrink-0">
                                                    {getIcon(item.icon)}
                                                </div>
                                                <span className="text-right flex-1 min-w-0 truncate">
                                                    {item.title}
                                                </span>
                                                <ChevronDown
                                                    className={`flex-shrink-0 w-4 h-4 transition-transform duration-200 ${collapsedMenus.has(item.id) ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </div>
                                        </button>
                                        {item.children && (
                                            <ul
                                                className={`
                                                            mr-6 border-teal-500 border-r-1 text-xs overflow-hidden transition-all duration-300
                                                            ${collapsedMenus.has(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                                                            `}
                                            >
                                                {item.children.map((child) => (
                                                    <li key={child.id}>
                                                        <Link
                                                            to={child.path}
                                                            className="p-2 mx-1 my-1 rounded-lg flex hover:bg-teal-100 dark:hover:bg-teal-800"
                                                            activeProps={{
                                                                className: "text-teal-500 bg-teal-100"
                                                            }}
                                                            activeOptions={{ exact: true }}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}


                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
}