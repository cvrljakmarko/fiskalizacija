import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
    const { user, logout } = useAuth()
    return (
        <div className={`flex items-center justify-between py-3`}>
            <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="Go to home"
            >
                {/* If you have a logo: <img src="/logo.svg" alt="" className="h-7 w-7" /> */}
                <span className="font-semibold text-lg text-gray-800">
                    MyApp
                </span>
            </Link>
            <nav className="flex items-center gap-6">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `text-sm font-medium transition-colors ${
                            isActive
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/articles"
                    className={({ isActive }) =>
                        `text-sm font-medium transition-colors ${
                            isActive
                                ? 'text-blue-600'
                                : 'text-gray-600 hover:text-blue-500'
                        }`
                    }
                >
                    Articles
                </NavLink>
                {user ? (
                    <button
                        onClick={() => void logout()}
                        className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                        aria-label="Sign out"
                    >
                        Sign out ({user.name})
                    </button>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors ${
                                isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-blue-500'
                            }`
                        }
                    >
                        Sign in
                    </NavLink>
                )}
            </nav>
        </div>
    )
}
