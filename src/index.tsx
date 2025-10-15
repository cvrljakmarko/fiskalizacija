import React from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { BrowserRouter, Link } from 'react-router-dom'
import ArticlesRouter from './routes/ArticlesRouter'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ArticlesRouter />
        </BrowserRouter>
    </React.StrictMode>
)
