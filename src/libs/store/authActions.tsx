import {Store} from '@tanstack/react-store'
import type { User } from '../store'

// Auth Store
interface AuthState {
    isAuthenticated: boolean
    user: User | null
    token: string | null
    isLoading: boolean
}

export const authStore = new Store<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
})

// Auth Store Actions
export const authActions = {
    login: (userName: string, token:string, roles:string[] , nationalId : string) => {
        authStore.setState((state) => ({
            ...state,
            isAuthenticated: true,
            userName,
            token,
            isLoading: false,
        }))
        
        // Store in localStorage
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(userName))
        localStorage.setItem('roles', JSON.stringify(roles))
        localStorage.setItem('auth_national_Id', JSON.stringify(nationalId))
        
    },

    logout: () => {
        authStore.setState((state) => ({
            ...state,
            isAuthenticated: false,
            user: null,
            token: null,
            isLoading: false,
        }))
        // Clear localStorage
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('roles')
        localStorage.removeItem('auth_national_Id')
    },

    setLoading: (isLoading: boolean) => {
        authStore.setState((state) => ({
            ...state,
            isLoading,
        }))
    },

    initializeFromStorage: () => {
        const token = localStorage.getItem('auth_token')
        const userStr = localStorage.getItem('auth_user')

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr)
                authStore.setState((state) => ({
                    ...state,
                    isAuthenticated: true,
                    user,
                    token,
                    isLoading: false,
                }))
            } catch (error) {
                console.error('Failed to parse stored user data:', error)
                authActions.logout()
            }
        }
    },
}