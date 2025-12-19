"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  userId: string
  name: string
  email: string
  phone: string
  loginType: "personal" | "corporate"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userId: string, password: string, loginType: "personal" | "corporate") => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (userId: string, password: string, loginType: "personal" | "corporate"): boolean => {
    if (userId && password.length >= 4) {
      setUser({
        userId,
        name: loginType === "personal" ? "PRASANTH TAMIRE" : "TechCorp India Ltd.",
        email: loginType === "personal" ? "rajesh.kumar@netbank.com" : "finance@techcorp.com",
        phone: loginType === "personal" ? "+91 98765 43210" : "+91 98765 43211",
        loginType,
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
