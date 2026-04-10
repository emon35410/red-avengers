import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Context/AuthProvider'
import { ThemeProvider } from './Context/ThemeContext '

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider> {/* 👈 ThemeProvider eikhane wrap kora holo */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b', 
                color: '#cbd5e1',      
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
              },
            }}
          />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)