// layout/ArticlesLayout.tsx
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function ArticlesLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <header className="border-b bg-white sticky top-0 z-50 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Header />
                </div>
            </header>

            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <Outlet />
                </div>
            </main>

            <footer className="border-t bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <Footer />
                </div>
            </footer>
        </div>
    )
}
