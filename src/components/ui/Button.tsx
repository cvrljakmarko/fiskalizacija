import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary'
    children: ReactNode
}

export default function Button({
    variant = 'primary',
    children,
    className,
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

    const variants = {
        primary:
            'bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600',
        secondary:
            'border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-400'
    }

    return (
        <button
            {...props}
            className={clsx(baseStyles, variants[variant], className)}
        >
            {children}
        </button>
    )
}
