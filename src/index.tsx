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
            <header>
                <nav>
                    <Link to="/">Home</Link> |{' '}
                    <Link to="/articles">Articles</Link>
                </nav>
            </header>
            <ArticlesRouter />
        </BrowserRouter>
    </React.StrictMode>
)
