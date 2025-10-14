import { AxiosResponse } from 'axios'
import client from '../api/client'
import type { Articles } from '../types/articles'
import { A } from 'vitest/dist/chunks/environment.d.cL3nLXbE.js'

export const fetchArticles = async () => {
    try {
        const { data }: AxiosResponse<Articles[]> = await client.get('/articles')
        return data
    } catch (error) {
        console.error('Error:', error)
        return null
    }
}

export const fetchArticle = async (id: number): Promise<Articles | null> => {
    try {
        const { data }: AxiosResponse<Articles> = await client.get(`/articles/${id}`)
        return data
    } catch (error) {
        console.error(`[fetchArticle] Failed for id="${id}":`, error)
        return null
    }
}

export async function createArticle(payload: Pick<Articles, 'name' | 'price'>): Promise<Articles> {
    const { data } = await client.post<Articles>('/articles', payload)
    return data
}

export async function updateArticle(
    id: string,
    payload: Partial<Pick<Articles, 'name' | 'price'>>
): Promise<Articles> {
    const { data } = await client.patch<Articles>(`/articles/${id}`, payload)
    return data
}

export async function deleteArticle(id: string): Promise<void> {
    await client.delete(`/articles/${id}`)
}
