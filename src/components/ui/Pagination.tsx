import * as React from 'react'
import { cn } from '@/lib/utils'

export function Pagination({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn('mx-auto flex w-full justify-center', className)}
            {...props}
        />
    )
}
export function PaginationContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul
            className={cn('flex flex-row items-center gap-1', className)}
            {...props}
        />
    )
}
export function PaginationItem({
    className,
    ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
    return <li className={cn('', className)} {...props} />
}
export function PaginationLink({
    className,
    isActive,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
    return (
        <button
            className={cn(
                'h-9 min-w-9 rounded-md px-3 text-sm font-medium',
                'border border-transparent hover:border-gray-300 hover:bg-gray-50',
                isActive
                    ? 'bg-gray-900 text-white hover:bg-gray-900'
                    : 'text-gray-700',
                className
            )}
            {...props}
        />
    )
}
export function PaginationPrevious(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    return <PaginationLink {...props}>{'‹'}</PaginationLink>
}
export function PaginationNext(
    props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    return <PaginationLink {...props}>{'›'}</PaginationLink>
}
export function PaginationEllipsis({ className }: { className?: string }) {
    return <span className={cn('px-2 text-gray-500', className)}>…</span>
}

// utils
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
}
