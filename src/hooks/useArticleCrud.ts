import { useCallback, useEffect, useRef, useState } from 'react'
import type { Articles } from '@/types/articles'
import {
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle
} from '@/actions/articles'

export type UseArticleCrudReturn = {
    articles: Articles[] | null
    loading: boolean
    error: string | null
    success: string | null
    selectedIds: string[]
    reload: () => Promise<void>
    createArticleItem: (data: {
        name: string
        price: number
    }) => Promise<Articles | null>
    updateArticleItem: (
        id: string,
        data: { name: string; price: number }
    ) => Promise<Articles | null>
    deleteArticleItem: (article: Articles) => Promise<boolean>
    clearMessages: () => void
}

export function useArticleCrud(): UseArticleCrudReturn {
    const [articles, setArticles] = useState<Articles[] | null>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [selectedIds] = useState<string[]>([]) // reserved for later use (selection UI)

    const successTimer = useRef<number | null>(null)

    const reload = useCallback(async () => {
        setLoading(true)
        try {
            setError(null)
            const data = await fetchArticles()
            setArticles(data ?? []) // your fetch returns null on error
        } catch (e: any) {
            setError(e?.message ?? 'Something went wrong. Please try again.')
            setArticles([])
        } finally {
            setLoading(false)
        }
    }, [])

    const createArticleItem = useCallback(
        async (data: { name: string; price: number }) => {
            try {
                const created = await createArticle(data)
                setArticles((prev) => (prev ? [created, ...prev] : [created]))
                setSuccess(`Article "${created.name}" created successfully!`)
                setError(null)
                if (successTimer.current)
                    window.clearTimeout(successTimer.current)
                successTimer.current = window.setTimeout(
                    () => setSuccess(null),
                    5000
                )
                return created
            } catch (e: any) {
                setError(
                    e?.response?.data?.message ??
                        e?.message ??
                        'Something went wrong. Please try again.'
                )
                return null
            }
        },
        []
    )

    const updateArticleItem = useCallback(
        async (id: string, data: { name: string; price: number }) => {
            try {
                const updated = await updateArticle(id, data)
                setArticles((prev) =>
                    (prev ?? []).map((a) =>
                        String(a.id) === String(updated.id) ? updated : a
                    )
                )
                setSuccess(`Article "${updated.name}" updated successfully!`)
                setError(null)
                if (successTimer.current)
                    window.clearTimeout(successTimer.current)
                successTimer.current = window.setTimeout(
                    () => setSuccess(null),
                    3000
                )
                return updated
            } catch (e: any) {
                setError(
                    e?.response?.data?.message ??
                        e?.message ??
                        'Something went wrong. Please try again.'
                )
                return null
            }
        },
        []
    )

    const deleteArticleItem = useCallback(async (article: Articles) => {
        const id = String(article.id)
        const ok = window.confirm(
            `Delete article "${article.name}" (ID ${id})?`
        )
        if (!ok) return false
        try {
            await deleteArticle(id)
            setArticles((prev) =>
                (prev ?? []).filter((a) => String(a.id) !== id)
            )
            setSuccess(`Article "${article.name}" deleted.`)
            if (successTimer.current) window.clearTimeout(successTimer.current)
            successTimer.current = window.setTimeout(
                () => setSuccess(null),
                3000
            )
            return true
        } catch (e: any) {
            setError(
                e?.response?.data?.message ??
                    e?.message ??
                    'Failed to delete. Please try again.'
            )
            return false
        }
    }, [])

    const clearMessages = useCallback(() => {
        setError(null)
        setSuccess(null)
    }, [])

    useEffect(() => {
        void reload()
        return () => {
            if (successTimer.current) window.clearTimeout(successTimer.current)
        }
    }, [reload])

    return {
        articles,
        loading,
        error,
        success,
        selectedIds,
        reload,
        createArticleItem,
        updateArticleItem,
        deleteArticleItem,
        clearMessages
    }
}
