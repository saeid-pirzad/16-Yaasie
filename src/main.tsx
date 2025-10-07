import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import '../src/assets/index.css'
import { router } from './libs/router'
import { QueryProvider } from './libs/queryClient'
import { authActions } from './libs/store/authActions'

authActions.initializeFromStorage()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
          <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
)
