import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        <div className="max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Mini <span className="text-blue-600">Fiskalizacija</span> App
            </h1>

            <p className="text-lg text-gray-600 mb-8">
                Jednostavna React + TypeScript aplikacija za demonstraciju
                procesa fiskalizacije računa. Izrađena koristeći moderne web
                tehnologije poput
                <span className="font-medium text-gray-800"> React Router</span>
                ,<span className="font-medium text-gray-800"> TailwindCSS</span>{' '}
                i<span className="font-medium text-gray-800"> Vite</span>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/articles">
                    <Button>Pregledaj Račune</Button>
                </Link>
            </div>
        </div>
    )
}
