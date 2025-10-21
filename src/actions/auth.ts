import client from '@/api/client'
import type { AuthUser } from '@/types/auth'

export async function authLogin(params: { email: string; password: string }): Promise<{ token: string; user: AuthUser }> {
  const { data } = await client.post('/auth/login', params)
  return data
}

export async function authLogout(): Promise<void> {
  await client.post('/auth/logout')
}

export async function authMe(): Promise<{ user: AuthUser }> {
  const { data } = await client.get('/auth/me')
  return data
}
