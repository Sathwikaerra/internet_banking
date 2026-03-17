

// import { useState } from "react"
// import { useAuth } from "../../context/auth-context"
// import { Navbar } from "./navbar"
// import { Dashboard } from "../../components/pages/dashboard"
// import { Accounts } from "../../components/pages/accounts"
// import { FundTransfer } from "../../components/pages/fund-transfer"
// import BillPayments from "../../components/pages/bill-payments"
// import { Cards } from "../../components/pages/cards"
// import { Loans } from "../../components/pages/loans"
// import { ApplyLoan } from "../../components/pages/applyloans"
// import { ProfileSettings } from "../../components/pages/profile-settings"
// import { Investments } from "../../components/pages/investments"
// import { Support } from "../../components/pages/support"
// import AddBeneficiary from "../../components/pages/AddBeneficiary"
// import ScheduledTransfer from "../../components/pages/ScheduledTransfer"
// import MobileRechargePage from "../../components/pages/MobileRechargePage"
// import DepositsPage from "../Deposits/DepositsLandingPage"
// import FDDetailsSelection from "../Deposits/FDDetailsSelection"
// import FDFormPage from "../Deposits/FDFormPage"
// export type PageType =
//   | "dashboard"
//   | "accounts"
//   | "transfer"
//   | "add-beneficiary"
//   | "scheduled-transfer"
//   | "bills"
//   | "electricity-bills"
//   | "mobile-recharge"
//   | "cards"
//   | "loans"
//   | "apply-loan"
//   | "profile"
//   | "investments"
//   | "support"
//   | "deposit"
// |"fd-open"
// |"fd-form"
//   | "services" // ⬅️ added so Navbar can call onPageChange("services") safely

// export function DashboardLayout() {
//   const { logout } = useAuth()
//   const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

//   const handleLogout = () => {
//     logout()
//   }

//   const renderPage = () => {
//     switch (currentPage) {
//       case "accounts":
//         return <Accounts />
//       case "transfer":
//         return <FundTransfer />
//         case "deposit":
//   return <DepositsPage onNavigate={setCurrentPage} />
//         case "fd-open":
//   return <FDDetailsSelection onNavigate={setCurrentPage} />

// case "fd-form":
//   return <FDFormPage />      
//       case "add-beneficiary":
//         return <AddBeneficiary />
//       case "scheduled-transfer":
//         return <ScheduledTransfer />
//       case "bills":
//       case "electricity-bills":
//         return <BillPayments />
//       case "mobile-recharge":
//         return <MobileRechargePage />
//       case "cards":
//         return <Cards />
//       case "loans":
//       case "services":
//         return <Loans />
//       case "apply-loan":
//         return <ApplyLoan />
//       case "profile":
//         return <ProfileSettings />
//       case "investments":
//         return <Investments />
//       case "support":
//         return <Support />
//       default:
//         return <Dashboard onNavigate={setCurrentPage} />
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//         onLogout={handleLogout}
//       />
//       <main className="pt-20 md:pt-24 mt-2">{renderPage()}</main>
//     </div>
//   )
// }


import { useState } from "react"
import { useAuth } from "../../context/auth-context"
import { Navbar } from "./navbar"

import { Dashboard } from "../../components/pages/dashboard"
import { Accounts } from "../../components/pages/accounts"
import { FundTransfer } from "../../components/pages/fund-transfer"
import BillPayments from "../../components/pages/bill-payments"
import { Cards } from "../../components/pages/cards"
import { Loans } from "../../components/pages/loans"
import { ApplyLoan } from "../../components/pages/applyloans"
import { ProfileSettings } from "../../components/pages/profile-settings"
import { Investments } from "../../components/pages/investments"
import { Support } from "../../components/pages/support"
import AddBeneficiary from "../../components/pages/AddBeneficiary"
import ScheduledTransfer from "../../components/pages/ScheduledTransfer"
import MobileRechargePage from "../../components/pages/MobileRechargePage"

import DepositsPage from "../Deposits/DepositsLandingPage"
import FDDetailsSelection from "../Deposits/FDDetailsSelection"
import FDFormPage from "../Deposits/FDFormPage"

import RDDetailsSelection from "../Deposits/RDDetailsSelection"
import RDFormPage from "../Deposits/RDFormPage"

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
  | "deposit"
  | "fd-open"
  | "fd-form"
  | "services"
  | "rd-open"
  | "rd-form"

export function DashboardLayout() {
  const { logout } = useAuth()

  const [currentPage, setCurrentPage] =
    useState<PageType>("dashboard")

  const handleLogout = () => {
    logout()
  }
const [depositData, setDepositData] = useState<any>(null);
const handleNavigate = (pageName: PageType, data?: any) => {
  setCurrentPage(pageName);

  if (data) {
    setDepositData(data);
  }
};
  const renderPage = () => {
    switch (currentPage) {

      case "accounts":
        return <Accounts />

      case "transfer":
        return <FundTransfer />

    case "deposit":
  return (
    <DepositsPage
      onNavigate={handleNavigate}
      newDeposit={depositData}
    />
  )

case "fd-open":
  return <FDDetailsSelection onNavigate={handleNavigate} />

case "fd-form":
  return <FDFormPage onNavigate={handleNavigate} />

case "rd-open":
  return <RDDetailsSelection onNavigate={handleNavigate} />

case "rd-form":
  return <RDFormPage onNavigate={handleNavigate} /> 
      

      case "add-beneficiary":return <AddBeneficiary />

      case "scheduled-transfer": return <ScheduledTransfer />

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
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-background">

      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="pt-20 md:pt-24 mt-2">
        {renderPage()}
      </main>

    </div>
  )
}