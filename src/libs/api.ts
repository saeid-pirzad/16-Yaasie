import { authActions, authStore } from './store/authActions'

const API_BASE_URL = `http://185.231.115.191:8040/api`;


export class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) { this.baseUrl = baseUrl }

    public async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`
        const token = authStore.state.token
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        }

        const response = await fetch(url, config)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            if (response.status === 401) {
                authActions.logout()
                if (typeof window !== 'undefined') {
                    setTimeout(() => window.location.href = '/login', 2000)
                }
                throw new Error('رمز شما منقضی شده است. لطفاً دوباره وارد شوید.')
            }
            const errorMessage = errorData.detail || errorData.message || `خطا در برقراری ارتباط با سرور (${response.status})`
            throw new Error(errorMessage)
        }

        return response.json()
    }

}

export const apiClient = new ApiClient(API_BASE_URL)







// Query Keys
export const queryKeys = {
    auth: {
        me: ['auth', 'me'] as const,
    },
    menu: {
        all: ['menu'] as const,
    },
    reports: {
        all: (params?: any) => ['reports', params] as const,
        categories: ['reports', 'categories'] as const,
    },
} as const



// Common mutations
export const mutationKeys = {
    auth: {
        login: ['auth', 'login'] as const,
    },
    forms: {
        submit: ['forms', 'submit'] as const,
    },
} as const