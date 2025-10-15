export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
                <p>
                    © {new Date().getFullYear()}{' '}
                    <span className="font-semibold text-gray-800">
                        Mini Fiskalizacija App
                    </span>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    )
}
