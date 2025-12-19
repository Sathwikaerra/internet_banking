"use client";

import { useState } from "react";

type Frequency = "Once" | "Weekly" | "Monthly";
type Status = "Active" | "Paused";

type ScheduledTransfer = {
  id: string;
  beneficiary: string;
  fromAccount: string;
  nextRun: string;
  amount: number;
  frequency: Frequency;
  status: Status;
};

const INITIAL_TRANSFERS: ScheduledTransfer[] = [
  {
    id: "ST-1001",
    beneficiary: "John Doe",
    fromAccount: "Savings •••• 1234",
    nextRun: "25 Dec 2025",
    amount: 2500,
    frequency: "Monthly",
    status: "Active",
  },
  {
    id: "ST-1002",
    beneficiary: "Electricity Board",
    fromAccount: "Current •••• 5678",
    nextRun: "15 Dec 2025",
    amount: 1800,
    frequency: "Monthly",
    status: "Paused",
  },
  {
    id: "ST-1003",
    beneficiary: "House Rent",
    fromAccount: "Savings •••• 1234",
    nextRun: "01 Jan 2026",
    amount: 15000,
    frequency: "Monthly",
    status: "Active",
  },
];

export default function ScheduledTransfersPage() {
  const [transfers, setTransfers] = useState<ScheduledTransfer[]>(
    INITIAL_TRANSFERS
  );
  const [search, setSearch] = useState("");

  const filtered = transfers.filter((t) =>
    (t.beneficiary + t.id + t.fromAccount)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setTransfers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Active" ? "Paused" : "Active" }
          : t
      )
    );
  };

  const cancelTransfer = (id: string) => {
    if (!confirm("Are you sure you want to cancel this scheduled transfer?"))
      return;
    setTransfers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* top breadcrumb / header */}
      <div className="max-w-7xl mx-auto px-3 py-6">
        <p className="text-[8px] font-semibold tracking-[0.18em] text-slate-500">
          TRANSFER MONEY
        </p>
        <h1 className="mt-1 text-[12px] md:text-[12px] font-bold text-slate-900">
          Scheduled Transfers
        </h1>
        <p className="mt-1 text-[11px] text-slate-600 max-w-xl">
          View, pause, or cancel your automatic transfers to saved beneficiaries.
        </p>

        {/* Card */}
        <div className="mt-5 bg-white border border-slate-200 rounded-lg shadow-sm">
          {/* Card header actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 py-3 border-b border-slate-100">
            <div>
              <h2 className="text-[13px] font-semibold text-slate-900">
                Upcoming & recurring transfers
              </h2>
              <p className="text-[11px] text-slate-500">
                Only active schedules will be processed automatically.
              </p>
            </div>

            <div className="flex gap-2 items-center mt-2 md:mt-0">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by beneficiary or ID"
                className="w-44 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-[#233b77]/30"
              />
              <button className="rounded-full border border-[#233b77] px-3 py-1 text-[11px] font-semibold text-[#233b77] hover:bg-[#233b77] hover:text-white transition">
                + New Scheduled Transfer
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-[11px]">
              <thead>
                <tr className="bg-slate-50 text-slate-500">
                  <th className="text-left font-semibold px-4 py-2">ID</th>
                  <th className="text-left font-semibold px-3 py-2">Beneficiary</th>
                  <th className="text-left font-semibold px-3 py-2">From</th>
                  <th className="text-right font-semibold px-3 py-2">Amount</th>
                  <th className="text-left font-semibold px-3 py-2">Freq</th>
                  <th className="text-left font-semibold px-3 py-2">Next Run</th>
                  <th className="text-center font-semibold px-3 py-2">Status</th>
                  <th className="text-right font-semibold px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-slate-400 text-[11px]">
                      No scheduled transfers found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-slate-100 hover:bg-slate-50/60"
                    >
                      <td className="px-4 py-2 align-middle font-medium text-slate-800">
                        {t.id}
                      </td>

                      <td className="px-3 py-2 align-middle text-slate-800">
                        <div className="text-[12px] font-medium">{t.beneficiary}</div>
                      </td>

                      <td className="px-3 py-2 align-middle text-slate-600">
                        {t.fromAccount}
                      </td>

                      <td className="px-3 py-2 align-middle text-right text-slate-800">
                        ₹{t.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-3 py-2 align-middle text-slate-600">
                        <span className="text-[11px]">{t.frequency}</span>
                      </td>

                      <td className="px-3 py-2 align-middle text-slate-600">
                        {t.nextRun}
                      </td>

                      <td className="px-3 py-2 align-middle text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${t.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                            }`}
                        >
                          <span
                            className={`mr-1 h-1.5 w-1.5 rounded-full ${t.status === "Active" ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                          />
                          {t.status}
                        </span>
                      </td>

                      <td className="px-4 py-2 align-middle text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => toggleStatus(t.id)}
                            className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            {t.status === "Active" ? "Pause" : "Resume"}
                          </button>
                          <button
                            onClick={() => cancelTransfer(t.id)}
                            className="rounded-full border border-rose-200 px-2.5 py-1 text-[10px] font-semibold text-rose-600 hover:bg-rose-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2 border-t border-slate-100 text-[11px] text-slate-500">
            Changes made here will reflect immediately in your transfer schedule.
          </div>
        </div>
      </div>
    </div>
  );
}