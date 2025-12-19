"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Search,
  Edit2,
  XCircle,
  Calendar,
  Clock,
} from "lucide-react";

type UpcomingTxn = {
  id: number;
  label: string;
  dueDate: string;
  amount: string;
  status: "Scheduled" | "Auto Debit";
  category: string;
  frequency: string;
};

const statusColor = {
  Scheduled: "bg-blue-50 border-blue-200 text-blue-700",
  "Auto Debit": "bg-green-50 border-green-200 text-green-700",
};
const initialEntries: UpcomingTxn[] = [
  {
    id: 1,
    label: "Electricity Bill",
    dueDate: "28 Feb 2025",
    amount: "₹1,200.00",
    status: "Auto Debit",
    category: "Utilities",
    frequency: "Monthly",
  },
  {
    id: 2,
    label: "Car EMI",
    dueDate: "05 Mar 2025",
    amount: "₹12,500.00",
    status: "Scheduled",
    category: "Loan",
    frequency: "Monthly",
  },
  {
    id: 3,
    label: "House Rent",
    dueDate: "01 Mar 2025",
    amount: "₹20,000.00",
    status: "Auto Debit",
    category: "Rent",
    frequency: "Monthly",
  },
  {
    id: 4,
    label: "Mobile Postpaid Bill",
    dueDate: "15 Mar 2025",
    amount: "₹499.00",
    status: "Scheduled",
    category: "Utilities",
    frequency: "Monthly",
  },
  {
    id: 5,
    label: "SIP Investment",
    dueDate: "10 Mar 2025",
    amount: "₹3,000.00",
    status: "Auto Debit",
    category: "Investment",
    frequency: "Monthly",
  },
  {
    id: 6,
    label: "Internet Broadband",
    dueDate: "25 Feb 2025",
    amount: "₹999.00",
    status: "Scheduled",
    category: "Utilities",
    frequency: "Monthly",
  },
  {
    id: 7,
    label: "Gym Membership",
    dueDate: "01 Mar 2025",
    amount: "₹1,499.00",
    status: "Auto Debit",
    category: "Health",
    frequency: "Monthly",
  },
  {
    id: 8,
    label: "Credit Card Payment",
    dueDate: "18 Mar 2025",
    amount: "₹7,850.00",
    status: "Scheduled",
    category: "Loan",
    frequency: "Monthly",
  },
  {
    id: 9,
    label: "Netflix Subscription",
    dueDate: "20 Feb 2025",
    amount: "₹649.00",
    status: "Auto Debit",
    category: "Entertainment",
    frequency: "Monthly",
  },
  {
    id: 10,
    label: "Mutual Fund Auto Debit",
    dueDate: "12 Mar 2025",
    amount: "₹2,500.00",
    status: "Auto Debit",
    category: "Investment",
    frequency: "Monthly",
  },
  {
    id: 11,
    label: "Water Bill",
    dueDate: "05 Mar 2025",
    amount: "₹350.00",
    status: "Scheduled",
    category: "Utilities",
    frequency: "Monthly",
  },
  {
    id: 12,
    label: "Property Maintenance",
    dueDate: "28 Mar 2025",
    amount: "₹2,200.00",
    status: "Scheduled",
    category: "Rent",
    frequency: "Monthly",
  },
];

const UpcomingTransactions = () => {
  const [entries, setEntries] = useState(initialEntries);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);

  /** FILTER STATES */
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFrequency, setFilterFrequency] = useState("all");
  const [sortBy, setSortBy] = useState("date-new");
  const [search, setSearch] = useState("");

  /* ---------------------- FILTER LOGIC ---------------------- */
  const filteredTxns = useMemo(() => {
    let data = [...entries];

    if (filterCategory !== "all") {
      data = data.filter((t) => t.category === filterCategory);
    }

    if (filterStatus !== "all") {
      data = data.filter((t) => t.status === filterStatus);
    }

    if (filterFrequency !== "all") {
      data = data.filter((t) => t.frequency === filterFrequency);
    }

    if (search.trim().length > 0) {
      data = data.filter(
        (t) =>
          t.label.toLowerCase().includes(search.toLowerCase()) ||
          t.amount.includes(search) ||
          t.dueDate.includes(search)
      );
    }

    // Sort
    if (sortBy === "date-new") data = data.reverse();
    if (sortBy === "date-old") data = [...data];

    if (sortBy === "amount-high") {
      data = data.sort(
        (a, b) =>
          parseFloat(b.amount.replace(/[₹,-]/g, "")) -
          parseFloat(a.amount.replace(/[₹,-]/g, ""))
      );
    }

    if (sortBy === "amount-low") {
      data = data.sort(
        (a, b) =>
          parseFloat(a.amount.replace(/[₹,-]/g, "")) -
          parseFloat(b.amount.replace(/[₹,-]/g, ""))
      );
    }

    return data;
  }, [filterCategory, filterStatus, filterFrequency, sortBy, search, entries]);

  const displayedTxns = showAll ? filteredTxns : filteredTxns.slice(0, 6);

  /* ---------------------- CANCEL ---------------------- */
  const handleCancel = (id: number) => {
    setEntries((prev) => prev.filter((txn) => txn.id !== id));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow p-4 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-800">
          Upcoming Transactions
        </h3>

        <div className="flex items-center gap-2">
          {/* FILTER BUTTON */}
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[11px]"
          >
            <Filter size={12} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* DOWNLOAD BUTTON */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded">
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="border rounded-lg p-3 bg-slate-50 text-[11px] grid grid-cols-1 md:grid-cols-5 gap-3">

          {/* Category */}
          <div>
            <label className="text-slate-600">Category</label>
            <select
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option>Utilities</option>
              <option>Loan</option>
              <option>Rent</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-slate-600">Status</label>
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option>Scheduled</option>
              <option>Auto Debit</option>
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="text-slate-600">Frequency</label>
            <select
              onChange={(e) => setFilterFrequency(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option>Monthly</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-slate-600">Sort</label>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
              <option value="amount-high">Amount High → Low</option>
              <option value="amount-low">Amount Low → High</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="text-slate-600">Search</label>
            <div className="flex items-center border rounded px-2 py-1 mt-1 bg-white">
              <Search size={12} className="text-slate-400" />
              <input
                placeholder="Search..."
                className="w-full px-2 text-[11px] outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-auto min-h-[240px] border rounded-lg">
        <table className="w-full text-[11px]">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="p-2  text-leftw-[40px]">Click</th>
              <th className="p-2 w-[50px] text-left">S.NO</th>
              <th className="p-2 text-left">Label</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Due Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            {displayedTxns.map((txn, index) => {
              const isOpen = expandedRow === txn.id;

              return (
                <React.Fragment key={txn.id}>
                  {/* Main Row */}
                  <tr
                    onClick={() => setExpandedRow(isOpen ? null : txn.id)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-2">
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </td>

                    <td className="p-2">{index + 1}</td>

                    <td className="p-2 font-semibold">{txn.label}</td>

                    <td className="p-2">{txn.category}</td>

                    <td className="p-2">{txn.dueDate}</td>

                    <td className="p-2">
                      <span
                        className={`px-2 py-0.5 rounded-full border ${statusColor[txn.status]}`}
                      >
                        {txn.status}
                      </span>
                    </td>

                    <td className="p-2 font-bold">{txn.amount}</td>
                  </tr>

                  {/* Expanded Row */}
                  {isOpen && (
                    <tr>
                      <td colSpan={7} className="p-3 bg-slate-50">
                        <div className="border rounded-lg p-3 space-y-2">

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
                            <div className="flex gap-1 items-center">
                              <Calendar className="w-3 h-3 text-blue-600" />
                              <span>
                                Frequency: <b>{txn.frequency}</b>
                              </span>
                            </div>

                            <div className="flex gap-1 items-center">
                              <Clock className="w-3 h-3 text-green-600" />
                              <span>
                                Category: <b>{txn.category}</b>
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-[10px]"
                            >
                              <Edit2 className="w-3 h-3 mr-1" />
                              Modify
                            </Button>

                            <Button
                              size="sm"
                              className="h-7 text-[10px] bg-red-600 text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancel(txn.id);
                              }}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* VIEW ALL BUTTON */}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-[10px] mt-1 border-dashed"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll
          ? `Show Less`
          : `View All Upcoming Transactions (${entries.length}) →`}
      </Button>
    </div>
  );
};

export default UpcomingTransactions;
