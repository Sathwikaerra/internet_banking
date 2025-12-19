"use client"

import { useAuth } from "@/context/auth-context"
import { LoginPage } from "@/components/login/login-page"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function Page() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <DashboardLayout /> : <LoginPage />
}
