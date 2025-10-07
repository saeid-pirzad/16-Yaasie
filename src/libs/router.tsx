import { createRouter, createRoute, createRootRoute, redirect, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { lazy, type ReactNode } from 'react'
import { useAuthStore } from './store'
import { ErrorPage } from '../baseComponents/ErrorPage'
import { SuspenseLoading } from '../baseComponents/SuspenseLoading'
import AuthLayout from '../layout/Login/LoginLayout'
import { authStore } from './store/authActions'



const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const { isAuthenticated } = authStore.state
    throw redirect({ to: isAuthenticated ? '/dashboard' : '/login' })
  },
  component: () => <div>Redirecting...</div>,
})



const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  errorComponent: ({ error }) => {
    console.error('Router error:', error)
    return <ErrorPage error={error} />
  },
})



const LoginForm = lazy(() => import('../features/login/LoginPage'))
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <SuspenseLoading>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </SuspenseLoading>
  ),
})


const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) throw redirect({ to: '/login' })
  return <>{children}</>
}


const DashboardLayoutComponent = lazy(() => import('../layout/dashboard/DashboardLayout'))
const DashboardLayoutWrapper = () => {
  return (
    <AuthGuard>
      <SuspenseLoading>
        <DashboardLayoutComponent />
      </SuspenseLoading>
    </AuthGuard>
  )
}


export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayoutWrapper,
})


const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'))
const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/',
  component: () => {
    return (
      <SuspenseLoading>
        <DashboardPage />
      </SuspenseLoading>
    )
  },
})


const formsLayoutRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/forms',
  component: () => <Outlet />,
})


const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    formsLayoutRoute.addChildren([]),
  ]),
])


export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
