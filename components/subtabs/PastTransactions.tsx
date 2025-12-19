"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Search,
} from "lucide-react";

/* ---------------------- TRANSACTION TYPE ---------------------- */
type PastTxn = {
  id: number;
  reference: string;
  beneficiary: string;
  bank: string;
  date: string;
  time: string;
  amount: string;
  mode: "NEFT" | "IMPS" | "UPI" | "RTGS";
  status: "Success" | "Pending" | "Failed";
  remarks?: string;
  accountLast4: string;
  category: "Bills" | "Shopping" | "Self Transfer" | "Other";
};

/* ---------------------- SAMPLE DATA ---------------------- */
const transactions: PastTxn[] = [
  {
    id: 1,
    reference: "TXN82451390",
    beneficiary: "Rahul Verma",
    bank: "HDFC Bank • NEFT",
    date: "12 Dec 2025",
    time: "10:25 AM",
    amount: "-₹12,500.00",
    mode: "NEFT",
    status: "Success",
    remarks: "House rent - Dec",
    accountLast4: "2731",
    category: "Bills",
  },
  {
    id: 2,
    reference: "TXN82451421",
    beneficiary: "Zomato Payments",
    bank: "UPI • zomato@upi",
    date: "11 Dec 2025",
    time: "08:15 PM",
    amount: "-₹650.00",
    mode: "UPI",
    status: "Success",
    remarks: "Dinner order",
    accountLast4: "6613",
    category: "Shopping",
  },
  {
    id: 3,
    reference: "TXN82451477",
    beneficiary: "Amazon Seller Services",
    bank: "ICICI Bank • IMPS",
    date: "09 Dec 2025",
    time: "06:40 PM",
    amount: "-₹3,999.00",
    mode: "IMPS",
    status: "Success",
    remarks: "Electronics purchase",
    accountLast4: "1145",
    category: "Shopping",
  },
  {
    id: 4,
    reference: "TXN82451509",
    beneficiary: "Self Transfer",
    bank: "NetBank • Own account",
    date: "08 Dec 2025",
    time: "02:05 PM",
    amount: "-₹25,000.00",
    mode: "NEFT",
    status: "Success",
    remarks: "Transfer to Salary Account",
    accountLast4: "6613",
    category: "Self Transfer",
  },
   {
    id: 1,
    reference: "TXN82451390",
    beneficiary: "Rahul Verma",
    bank: "HDFC Bank • NEFT",
    date: "12 Dec 2025",
    time: "10:25 AM",
    amount: "-₹12,500.00",
    mode: "NEFT",
    status: "Success",
    remarks: "House rent - Dec",
    accountLast4: "2731",
    category: "Bills",
  },
  {
    id: 2,
    reference: "TXN82451421",
    beneficiary: "Zomato Payments",
    bank: "UPI • zomato@upi",
    date: "11 Dec 2025",
    time: "08:15 PM",
    amount: "-₹650.00",
    mode: "UPI",
    status: "Success",
    remarks: "Dinner order",
    accountLast4: "6613",
    category: "Shopping",
  },
  {
    id: 3,
    reference: "TXN82451477",
    beneficiary: "Amazon Seller Services",
    bank: "ICICI Bank • IMPS",
    date: "09 Dec 2025",
    time: "06:40 PM",
    amount: "-₹3,999.00",
    mode: "IMPS",
    status: "Success",
    remarks: "Electronics purchase",
    accountLast4: "1145",
    category: "Shopping",
  },
  {
    id: 4,
    reference: "TXN82451509",
    beneficiary: "Self Transfer",
    bank: "NetBank • Own account",
    date: "08 Dec 2025",
    time: "02:05 PM",
    amount: "-₹25,000.00",
    mode: "NEFT",
    status: "Success",
    remarks: "Transfer to Salary Account",
    accountLast4: "6613",
    category: "Self Transfer",
  },
   {
    id: 1,
    reference: "TXN82451390",
    beneficiary: "Rahul Verma",
    bank: "HDFC Bank • NEFT",
    date: "12 Dec 2025",
    time: "10:25 AM",
    amount: "-₹12,500.00",
    mode: "NEFT",
    status: "Success",
    remarks: "House rent - Dec",
    accountLast4: "2731",
    category: "Bills",
  },
  {
    id: 2,
    reference: "TXN82451421",
    beneficiary: "Zomato Payments",
    bank: "UPI • zomato@upi",
    date: "11 Dec 2025",
    time: "08:15 PM",
    amount: "-₹650.00",
    mode: "UPI",
    status: "Success",
    remarks: "Dinner order",
    accountLast4: "6613",
    category: "Shopping",
  },
  {
    id: 3,
    reference: "TXN82451477",
    beneficiary: "Amazon Seller Services",
    bank: "ICICI Bank • IMPS",
    date: "09 Dec 2025",
    time: "06:40 PM",
    amount: "-₹3,999.00",
    mode: "IMPS",
    status: "Success",
    remarks: "Electronics purchase",
    accountLast4: "1145",
    category: "Shopping",
  },
  {
    id: 4,
    reference: "TXN82451509",
    beneficiary: "Self Transfer",
    bank: "NetBank • Own account",
    date: "08 Dec 2025",
    time: "02:05 PM",
    amount: "-₹25,000.00",
    mode: "NEFT",
    status: "Success",
    remarks: "Transfer to Salary Account",
    accountLast4: "6613",
    category: "Self Transfer",
  },
   {
    id: 1,
    reference: "TXN82451390",
    beneficiary: "Rahul Verma",
    bank: "HDFC Bank • NEFT",
    date: "12 Dec 2025",
    time: "10:25 AM",
    amount: "-₹12,500.00",
    mode: "NEFT",
    status: "Success",
    remarks: "House rent - Dec",
    accountLast4: "2731",
    category: "Bills",
  },
  {
    id: 2,
    reference: "TXN82451421",
    beneficiary: "Zomato Payments",
    bank: "UPI • zomato@upi",
    date: "11 Dec 2025",
    time: "08:15 PM",
    amount: "-₹650.00",
    mode: "UPI",
    status: "Success",
    remarks: "Dinner order",
    accountLast4: "6613",
    category: "Shopping",
  },
  {
    id: 3,
    reference: "TXN82451477",
    beneficiary: "Amazon Seller Services",
    bank: "ICICI Bank • IMPS",
    date: "09 Dec 2025",
    time: "06:40 PM",
    amount: "-₹3,999.00",
    mode: "IMPS",
    status: "Success",
    remarks: "Electronics purchase",
    accountLast4: "1145",
    category: "Shopping",
  },
  {
    id: 4,
    reference: "TXN82451509",
    beneficiary: "Self Transfer",
    bank: "NetBank • Own account",
    date: "08 Dec 2025",
    time: "02:05 PM",
    amount: "-₹25,000.00",
    mode: "NEFT",
    status: "Success",
    remarks: "Transfer to Salary Account",
    accountLast4: "6613",
    category: "Self Transfer",
  },
];

/* ---------------------- STATUS COLORS ---------------------- */
const statusColor: Record<PastTxn["status"], string> = {
  Success: "text-green-600 bg-green-50 border-green-200",
  Pending: "text-amber-600 bg-amber-50 border-amber-200",
  Failed: "text-red-600 bg-red-50 border-red-200",
};

/* ---------------------- MAIN COMPONENT ---------------------- */
const PastTransactions = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAll, setShowAll] = useState(false);

  /* FILTER STATES */
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date-new");
  const [search, setSearch] = useState("");

  /* EXPAND ROW WHEN CLICK ANYWHERE */
  const toggleRow = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  /* ---------------------- FILTER LOGIC ---------------------- */
  const filteredTxns = useMemo(() => {
    let data = [...transactions];

    if (filterCategory !== "all") {
      data = data.filter((t) => t.category === filterCategory);
    }

    if (filterType !== "all") {
      data = data.filter((t) => t.mode === filterType);
    }

    if (search.trim().length > 0) {
      data = data.filter(
        (t) =>
          t.beneficiary.toLowerCase().includes(search.toLowerCase()) ||
          t.bank.toLowerCase().includes(search.toLowerCase()) ||
          t.amount.includes(search)
      );
    }

    if (sortBy === "date-new") data = data.reverse();
    if (sortBy === "amount-high")
      data = data.sort(
        (a, b) =>
          parseFloat(b.amount.replace(/[₹,-]/g, "")) -
          parseFloat(a.amount.replace(/[₹,-]/g, ""))
      );

    if (sortBy === "amount-low")
      data = data.sort(
        (a, b) =>
          parseFloat(a.amount.replace(/[₹,-]/g, "")) -
          parseFloat(b.amount.replace(/[₹,-]/g, ""))
      );

    return data;
  }, [filterCategory, filterType, sortBy, search]);

  const displayedTxns = showAll ? filteredTxns : filteredTxns.slice(0, 6);

  /* ---------------------- PDF DOWNLOAD ---------------------- */
  const downloadPDF = (txn: PastTxn) => {
    alert(`Downloading receipt for ${txn.reference}`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow p-4 space-y-4">

      {/* HEADER + FILTER BUTTON */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-800">Past Transactions</h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[11px]"
          >
            <Filter size={12} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded">
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="border rounded-lg p-3 bg-slate-50 text-[11px] grid grid-cols-1 md:grid-cols-4 gap-3">

          <div>
            <label className="text-slate-600">Category</label>
            <select
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option>Bills</option>
              <option>Shopping</option>
              <option>Self Transfer</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-slate-600">Type</label>
            <select
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="all">All</option>
              <option>NEFT</option>
              <option>IMPS</option>
              <option>UPI</option>
              <option>RTGS</option>
            </select>
          </div>

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

          <div>
            <label className="text-slate-600">Search</label>
            <div className="flex items-center border rounded px-2 py-1 mt-1 bg-white">
              <Search size={12} className="text-slate-400" />
              <input
                placeholder="Search transactions..."
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
                              <th className="p-2 text-left">Click</th>
              <th className="p-2 text-left">S.NO</th>
              <th className="p-2 text-left">Beneficiary</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Mode</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>

      <tbody>
  {displayedTxns.map((txn, idx) => {
    const isOpen = expandedRow === txn.id;

    return (
      <React.Fragment key={txn.id}>
        
        {/* MAIN ROW */}
        <tr
          onClick={() => toggleRow(txn.id)}
          className="hover:bg-slate-50 cursor-pointer"
        >
          {/* CLICK ICON COLUMN */}
          <td className="p-2 w-[40px]">
            {isOpen ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </td>

          {/* SERIAL NUMBER */}
          <td className="p-2">{idx + 1}</td>

          {/* BENEFICIARY */}
          <td className="p-2 font-semibold">{txn.beneficiary}</td>

          {/* AMOUNT */}
          <td
            className={`p-2 font-semibold ${
              txn.amount.startsWith("-") ? "text-red-600" : "text-green-600"
            }`}
          >
            {txn.amount}
          </td>

          {/* MODE */}
          <td className="p-2">{txn.mode}</td>

          {/* STATUS */}
          <td className="p-2">
            <span
              className={`px-2 py-0.5 rounded-full border ${statusColor[txn.status]}`}
            >
              {txn.status}
            </span>
          </td>

          {/* DATE */}
          <td className="p-2">
            {txn.date} • {txn.time}
          </td>
        </tr>

        {/* EXPANDED DETAILS */}
        {isOpen && (
          <tr>
            <td colSpan={7} className="p-3 bg-slate-50">
              <div className="border rounded-lg p-3 space-y-2">
                <p className="font-semibold text-[12px]">{txn.beneficiary}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
                  <div>
                    <p className="text-slate-500">Reference</p>
                    <p className="font-semibold">{txn.reference}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Debited From</p>
                    <p className="font-semibold">A/C •••• {txn.accountLast4}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Remarks</p>
                    <p className="font-semibold">{txn.remarks}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Mode</p>
                    <p className="font-semibold">{txn.mode}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[10px]"
                    onClick={() => downloadPDF(txn)}
                  >
                    Download Receipt
                  </Button>

                  <Button
                    size="sm"
                    className="h-7 text-[10px] bg-blue-600 text-white"
                  >
                    Repeat Transfer
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
          ? `Show Less (Viewing ${displayedTxns.length} of ${filteredTxns.length})`
          : `View All Transactions (${filteredTxns.length}) →`}
      </Button>
    </div>
  );
};

export default PastTransactions;
