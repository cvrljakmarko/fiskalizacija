import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Articles from '../pages/ArticlesPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function ArticlesRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
