export default function HomePage() {
    return (
        <section className="flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                    Mini <span className="text-blue-600">Fiskalizacija</span>{' '}
                    App
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Jednostavna React + TypeScript aplikacija za demonstraciju
                    procesa fiskalizacije računa. Izrađena koristeći moderne web
                    tehnologije poput
                    <span className="font-medium text-gray-800">
                        {' '}
                        React Router
                    </span>
                    ,
                    <span className="font-medium text-gray-800">
                        {' '}
                        TailwindCSS
                    </span>{' '}
                    i<span className="font-medium text-gray-800"> Vite</span>.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="/articles"
                        className="rounded-md bg-blue-600 text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                    >
                        Pregledaj Račune
                    </a>
                </div>
            </div>
        </section>
    )
}
