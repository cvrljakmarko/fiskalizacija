import React from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { BrowserRouter, Link } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import ArticlesRouter from './routes/ArticlesRouter'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ArticlesRouter />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
)
