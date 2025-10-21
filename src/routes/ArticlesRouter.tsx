import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Articles from '../pages/ArticlesPage'
import NotFoundPage from '../pages/NotFoundPage'
import LoginPage from '@/pages/LoginPage'
import RequireAuth from '@/components/auth/RequireAuth'
import ArticlesLayout from '@/layout/ArticlesLayout'

export default function ArticlesRouter() {
    return (
        <Routes>
            <Route element={<ArticlesLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/articles"
                    element={
                        <RequireAuth>
                            <Articles />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
