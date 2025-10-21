import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authLogin, authLogout, authMe } from '@/actions/auth'
import type { AuthContextValue, AuthUser } from '@/types/auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const TOKEN_KEY = 'auth_token'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Bootstrap session on mount
  useEffect(() => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem(TOKEN_KEY) : null
    if (!token) return
    setLoading(true)
    authMe()
      .then(({ user }) => {
        setUser(user)
        setError(null)
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const { token, user } = await authLogin({ email, password })
      window.localStorage.setItem(TOKEN_KEY, token)
      setUser(user)
      setError(null)
      return true
    } catch (e: any) {
      setError(e?.response?.data?.error ?? 'Invalid credentials')
      setUser(null)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authLogout()
    } catch {}
    window.localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setError(null)
  }, [])

  const value = useMemo<AuthContextValue>(() => ({ user, loading, error, login, logout }), [user, loading, error, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
