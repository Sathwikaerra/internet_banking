"use client";

import { useState } from "react";
import {
  SendFundsPanel,
  PastTransactions,
  UpcomingTransactions,
  ManagePayees,
  SetPrimaryAccount,
  MyQueries,
} from "../subtabs";

import {
  Send,
  History,
  Clock,
  Users,
  Wallet,
  HelpCircle,
} from "lucide-react";

type FundSubTab =
  | "Send Funds"
  | "Past Transactions"
  | "Upcoming Transactions"
  | "Manage Payees"
  | "Set Primary A/C"
  | "My Queries";

export function FundTransfer() {
  const [subTab, setSubTab] = useState<FundSubTab>("Send Funds");
  const [search, setSearch] = useState("");

  const subTabs: FundSubTab[] = [
    "Send Funds",
    "Past Transactions",
    "Upcoming Transactions",
    "Manage Payees",
    "Set Primary A/C",
    "My Queries",
  ];

  const tabIcons: Record<FundSubTab, any> = {
    "Send Funds": Send,
    "Past Transactions": History,
    "Upcoming Transactions": Clock,
    "Manage Payees": Users,
    "Set Primary A/C": Wallet,
    "My Queries": HelpCircle,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">

      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-[12px] font-semibold text-slate-800">Fund Transfer</h2>
        <p className="text-slate-600 text-[10px]">
          Manage transfers, payees, and recent activity.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-slate-200 shadow-lg bg-white overflow-hidden">

        {/* TAB BAR */}
        <div className="w-full bg-[#eef2f1] border-b border-slate-300 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max sm:min-w-full">

            {subTabs.map((tab) => {
              const isActive = subTab === tab;
              const Icon = tabIcons[tab];

              return (
                <button
                  key={tab}
                  onClick={() => setSubTab(tab)}
                  className={`
  flex flex-col items-center justify-center
  min-w-[90px] sm:w-full
  transition-all duration-300
  cursor-pointer
  hover:bg-white/70
  ${isActive ? "bg-white" : "bg-[#eef2f1]"}
`}
                >

                  {/* Highlight Bar */}
                  <div
                    className={`w-full h-[3px] transition-all duration-300 
              ${isActive ? "bg-yellow-300" : "bg-transparent"}
            `}
                  />

                  {/* Icon */}
                  <Icon
                    size={18}
                    className={`
              transition-all duration-300 
              ${isActive ? "text-yellow-300" : "text-gray-400"}
            `}
                  />

                  {/* Label */}
                  <span
                    className={`
              text-[10px] tracking-wide
              ${isActive ? "text-yellow-300" : "text-gray-400"}
            `}
                  >
                    {tab}
                  </span>
                </button>
              );
            })}

          </div>
        </div>


        {/* TAB CONTENT */}
        <div className="p-5 md:p-6">
          {{
            "Send Funds": (
              <SendFundsPanel search={search} setSearch={setSearch} />
            ),
            "Past Transactions": <PastTransactions />,
            "Upcoming Transactions": <UpcomingTransactions />,
            "Manage Payees": <ManagePayees />,
            "Set Primary A/C": <SetPrimaryAccount />,
            "My Queries": <MyQueries />,
          }[subTab]}
        </div>
      </div>
    </div>
  );
}
