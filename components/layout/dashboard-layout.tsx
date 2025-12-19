"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Navbar } from "./navbar"
import { Dashboard } from "@/components/pages/dashboard"
import { Accounts } from "@/components/pages/accounts"
import { FundTransfer } from "@/components/pages/fund-transfer"
import  BillPayments  from "@/components/pages/bill-payments"
import { Cards } from "@/components/pages/cards"
import { Loans } from "@/components/pages/loans"
import { ApplyLoan } from "@/components/pages/applyloans"
import { ProfileSettings } from "@/components/pages/profile-settings"
import { Investments } from "@/components/pages/investments"
import { Support } from "@/components/pages/support"
import AddBeneficiary from "@/components/pages/AddBeneficiary"
import ScheduledTransfer from "@/components/pages/ScheduledTransfer"
import MobileRechargePage from "@/components/pages/MobileRechargePage"


export type PageType =
  | "dashboard"
  | "accounts"
  | "transfer"
  | "add-beneficiary"
  | "scheduled-transfer"
  | "bills"
  | "electricity-bills"
  | "mobile-recharge"
  | "cards"
  | "loans"
  | "apply-loan"
  | "profile"
  | "investments"
  | "support"
  | "services" // ⬅️ added so Navbar can call onPageChange("services") safely

export function DashboardLayout() {
  const { logout } = useAuth()
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const handleLogout = () => {
    logout()
  }

  const renderPage = () => {
    switch (currentPage) {
      case "accounts":
        return <Accounts />
      case "transfer":
        return <FundTransfer />
      case "add-beneficiary":
        return <AddBeneficiary />
      case "scheduled-transfer":
        return <ScheduledTransfer />
      case "bills":
      case "electricity-bills":
        return <BillPayments />
      case "mobile-recharge":
        return <MobileRechargePage />
      case "cards":
        return <Cards />
      case "loans":
      case "services":
        return <Loans />
      case "apply-loan":
        return <ApplyLoan />
      case "profile":
        return <ProfileSettings />
      case "investments":
        return <Investments />
      case "support":
        return <Support />
      default:
        return <Dashboard  onNavigate={setCurrentPage}/>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="pt-20 md:pt-24">{renderPage()}</main>
    </div>
  )
}
