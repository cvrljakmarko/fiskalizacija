import Header from '@/components/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/footer/Footer'
export default function ArticlesLayout() {
    return (
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
            <Header />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
