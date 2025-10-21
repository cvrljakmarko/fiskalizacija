import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const { login, error, loading } = useAuth()
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password')
  const navigate = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/articles'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate(from, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input className="border rounded px-3 py-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input className="border rounded px-3 py-2 w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
      </form>
      <p className="mt-4 text-sm text-gray-600">Use demo@example.com / password</p>
    </div>
  )
}
