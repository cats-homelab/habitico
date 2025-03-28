import { sleep } from '@/lib/utils'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

export interface AuthContext {
  isAuthenticated: boolean
  login: (username: string) => Promise<void>
  logout: () => Promise<void>
  user: string | null
}

const AuthContext = createContext<AuthContext | null>(null)

const key = 'tanstack.auth.user'

function getStoredUser() {
  return localStorage.getItem(key)
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user)
  } else {
    localStorage.removeItem(key)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(getStoredUser())
  const isAuthenticated = !!user

  const logout = useCallback(async () => {
    await sleep(250)

    setStoredUser(null)
    setUser(null)
  }, [])

  const login = useCallback(async (username: string) => {
    await sleep(500)

    setStoredUser(username)
    setUser(username)
  }, [])

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}