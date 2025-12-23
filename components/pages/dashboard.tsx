
"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  FileText,
  CreditCard,
  Wallet,
  TrendingUp,
  Smartphone,
  ShoppingCart,
  Target,
  Clock,
  PieChart,
  MapPin,
  EyeOff,
  Eye,
  ChevronDown,
  SmartphoneCharging,
  Zap,
  ArrowLeftRight,
  PiggyBank
} from "lucide-react";
import Rewardpoints from "@/components/pages/Rewardpoints";
import CIBILScoreCard from "./CIBILScoreCard";
import OffersSection from "@/components/pages/OffersSection";
import MerchantOffers from "@/components/pages/MerchantOffers";
import Footer from "@/components/pages/Footer";
import { Search, Calendar, Download, Printer, Filter } from "lucide-react";
import { PageType } from "../layout/dashboard-layout";
import React, { useMemo } from 'react';
const GOLD = "#ebc60a";

const OVERVIEW_DATA = [
  // { label: 'EMI', amount: 25000, colorClass: 'bg-red-500', hex: '#ef4444' },       // Red
  { label: 'Loans', amount: 15000, colorClass: 'bg-orange-500', hex: '#f97316' },  // Orange
  // { label: 'Savings', amount: 50000, colorClass: 'bg-emerald-500', hex: '#10b981' }, // Emerald
  { label: 'Spendings', amount: 35000, colorClass: 'bg-blue-500', hex: '#3b82f6' },  // Blue
  { label: 'Remaining', amount: 25000, colorClass: 'bg-red-500', hex: 'red' }, // Indigo
];

// ─────────────────────────────────────────────
// MASTER STATIC DATA - ACCOUNTS
// ─────────────────────────────────────────────
const accountsData = [
  {
    id: "acc1",
    type: "Savings Account",
    title: "KAEBAUK Savings Account",
    number: "2731",
    balance: "₹1,24,500.00",
    points: "2,450",
    accountHolder: "PRASANTH TAMIRE",
    bankLogo: "/images/jayam-logo.png",
    familyDetails: {
      primaryHolder: "PRASANTH TAMIRE",
      members: [
        {
          name: "PRASANTH TAMIRE",
          relation: "Self",
          role: "Primary Holder",
          share: "100%",
        },
        {
          name: "SANDHYA TAMIRE",
          relation: "Spouse",
          role: "Joint Holder",
          share: "0%",
        },
        {
          name: "RAHUL TAMIRE",
          relation: "Son",
          role: "Nominee",
          share: "100% (Nominee)",
        },
      ],
    },
  },
  {
    id: "acc2",
    type: "Savings Account",
    title: "Salary Savings Account",
    number: "6613",
    balance: "₹86,320.00",
    points: "1,120",
    accountHolder: "PRASANTH TAMIRE",
    bankLogo: "/images/jayam-logo.png",
    familyDetails: {
      primaryHolder: "PRASANTH TAMIRE",
      members: [
        {
          name: "PRASANTH TAMIRE",
          relation: "Self",
          role: "Primary Holder",
          share: "100%",
        },
        {
          name: "RAHUL TAMIRE",
          relation: "Son",
          role: "Nominee",
          share: "100% (Nominee)",
        },
      ],
    },
  },
  {
    id: "acc3",
    type: "Savings Account",
    title: "Premium Savings Account",
    number: "1145",
    balance: "₹2,45,678.50",
    points: "3,250",
    accountHolder: "PRASANTH TAMIRE",
    bankLogo: "/images/jayam-logo.png",
    familyDetails: {
      primaryHolder: "PRASANTH TAMIRE",
      members: [
        {
          name: "PRASANTH TAMIRE",
          relation: "Self",
          role: "Primary Holder",
          share: "100%",
        },
        {
          name: "SANDHYA TAMIRE",
          relation: "Spouse",
          role: "Nominee",
          share: "100% (Nominee)",
        },
      ],
    },
  },
  {
    id: "acc4",
    type: "Loan Account",
    title: "Personal Loan",
    number: "7006",
    balance: "₹4,95,000.00",
    emi: "₹12,500",
    nextDue: "Dec 10, 2025",
    points: "0",
    accountHolder: "PRASANTH TAMIRE",
    familyDetails: {
      primaryHolder: "PRASANTH TAMIRE",
      members: [
        {
          name: "PRASANTH TAMIRE",
          relation: "Self",
          role: "Borrower",
          share: "100%",
        },
        {
          name: "SANDHYA TAMIRE",
          relation: "Spouse",
          role: "Co-applicant",
          share: "0%",
        },
      ],
    },
  },
];

// ─────────────────────────────────────────────
// COMPREHENSIVE TRANSACTION DATA GENERATION (3 MONTHS)
// ─────────────────────────────────────────────
const generateHistoricalTransactions = () => {
  const currentDate = new Date("2025-12-10");
  const accounts = [
    { id: "acc1", title: "KAEBAUK Savings Account", number: "2731", balance: "₹1,24,500.00" },
    { id: "acc2", title: "Salary Savings Account", number: "6613", balance: "₹86,320.00" },
    { id: "acc3", title: "Premium Savings Account", number: "1145", balance: "₹2,45,678.50" },
    { id: "acc4", title: "Personal Loan", number: "7006", balance: "₹4,95,000.00" },
  ];

  const transactionTemplates = [
    // Income
    { label: "Salary Credit", category: "Income", type: "credit", min: 50000, max: 100000 },
    { label: "Freelance Payment", category: "Income", type: "credit", min: 5000, max: 30000 },
    { label: "Interest Credit", category: "Interest", type: "credit", min: 300, max: 800 },
    { label: "UPI Credit", category: "Transfer", type: "credit", min: 1000, max: 10000 },
    { label: "Dividend", category: "Investment", type: "credit", min: 500, max: 5000 },
    { label: "Cashback", category: "Rewards", type: "credit", min: 50, max: 500 },

    // Expenses - Food
    { label: "Zomato Order", category: "Food & Beverages", type: "debit", min: 300, max: 800 },
    { label: "Swiggy Order", category: "Food & Beverages", type: "debit", min: 400, max: 1200 },
    { label: "Restaurant Bill", category: "Dining Out", type: "debit", min: 800, max: 3000 },
    { label: "Groceries", category: "Groceries", type: "debit", min: 500, max: 3000 },
    { label: "Coffee Shop", category: "Food & Beverages", type: "debit", min: 150, max: 400 },

    // Expenses - Shopping
    { label: "Amazon Purchase", category: "Shopping - Online", type: "debit", min: 500, max: 5000 },
    { label: "Flipkart Purchase", category: "Shopping - Online", type: "debit", min: 1000, max: 8000 },
    { label: "Myntra Fashion", category: "Shopping - Fashion", type: "debit", min: 800, max: 4000 },
    { label: "Electronics Store", category: "Shopping - Electronics", type: "debit", min: 2000, max: 20000 },
    { label: "Supermarket", category: "Shopping - General", type: "debit", min: 800, max: 5000 },

    // Expenses - Bills
    { label: "Electricity Bill", category: "Bills & Utilities", type: "debit", min: 1500, max: 3000 },
    { label: "Mobile Recharge", category: "Bills & Utilities", type: "debit", min: 299, max: 699 },
    { label: "Internet Bill", category: "Bills & Utilities", type: "debit", min: 800, max: 1200 },
    { label: "Rent Payment", category: "Rent", type: "debit", min: 15000, max: 25000 },
    { label: "Water Bill", category: "Bills & Utilities", type: "debit", min: 300, max: 800 },
    { label: "Gas Bill", category: "Bills & Utilities", type: "debit", min: 400, max: 1000 },

    // Expenses - Entertainment
    { label: "Netflix Subscription", category: "Entertainment", type: "debit", min: 499, max: 499 },
    { label: "Prime Video", category: "Entertainment", type: "debit", min: 299, max: 299 },
    { label: "Movie Tickets", category: "Entertainment", type: "debit", min: 400, max: 1200 },
    { label: "Concert Ticket", category: "Entertainment", type: "debit", min: 1500, max: 5000 },
    { label: "Sports Event", category: "Entertainment", type: "debit", min: 500, max: 3000 },

    // Expenses - Travel
    { label: "Uber Ride", category: "Transport", type: "debit", min: 200, max: 800 },
    { label: "Fuel", category: "Transport", type: "debit", min: 1000, max: 3000 },
    { label: "Metro Recharge", category: "Transport", type: "debit", min: 200, max: 500 },
    { label: "Flight Ticket", category: "Travel", type: "debit", min: 3000, max: 15000 },
    { label: "Hotel Booking", category: "Travel", type: "debit", min: 2000, max: 10000 },

    // Transfers
    { label: "UPI Transfer", category: "Fund Transfer", type: "debit", min: 500, max: 5000 },
    { label: "NEFT Transfer", category: "Fund Transfer", type: "debit", min: 1000, max: 20000 },
    { label: "ATM Withdrawal", category: "Cash", type: "debit", min: 2000, max: 10000 },
    { label: "Loan Repayment", category: "Loan EMI", type: "debit", min: 10000, max: 15000 },

    // Healthcare
    { label: "Medical Bill", category: "Healthcare", type: "debit", min: 500, max: 5000 },
    { label: "Pharmacy", category: "Healthcare", type: "debit", min: 300, max: 2000 },
    { label: "Doctor Consultation", category: "Healthcare", type: "debit", min: 500, max: 2000 },
  ];

  const locations = [
    "Hyderabad, IN",
    "Bengaluru, IN",
    "Mumbai, IN",
    "Delhi, IN",
    "Chennai, IN",
    "Kolkata, IN",
    "Pune, IN",
    "Ahmedabad, IN",
    "",
    "",
    "",
  ];

  const transactions = [];
  let idCounter = 1000;

  // Generate transactions for the last 90 days
  for (let dayOffset = 0; dayOffset < 90; dayOffset++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - dayOffset);

    // Skip Sundays for fewer transactions
    if (date.getDay() === 0) continue;

    // Generate 2-8 transactions per day
    const transactionsToday = Math.floor(Math.random() * 7) + 2;

    for (let i = 0; i < transactionsToday; i++) {
      const account = accounts[Math.floor(Math.random() * accounts.length)];
      const template = transactionTemplates[Math.floor(Math.random() * transactionTemplates.length)];
      const amount = Math.floor(Math.random() * (template.max - template.min + 1)) + template.min;

      const formattedDate = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const purchaseHour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const purchaseMinute = Math.floor(Math.random() * 60);
      const purchased = `${formattedDate} - ${purchaseHour.toString().padStart(2, '0')}:${purchaseMinute.toString().padStart(2, '0')}`;

      // Generate dynamic current balance based on transaction
      const baseBalance = parseFloat(account.balance.replace(/[^0-9.]/g, ''));
      const transactionAmount = template.type === 'credit' ? amount : -amount;
      const currentBalance = baseBalance + (transactionAmount * (Math.random() * 3 + 1)); // Simulate balance changes

      transactions.push({
        id: idCounter++,
        label: template.label,
        date: formattedDate,
        amount: `${template.type === 'credit' ? '+' : '-'}₹${amount.toLocaleString('en-IN')}`,
        type: template.type,
        purchased: purchased,
        category: template.category,
        location: template.category.includes("Transfer") || template.category.includes("Bill") || template.category === "Loan EMI"
          ? ""
          : locations[Math.floor(Math.random() * locations.length)],
        accountId: account.id,
        accountTitle: account.title,
        accountNumber: account.number,
        currentBalance: `₹${currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        rawAmount: transactionAmount,
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// ─────────────────────────────────────────────
// FILTER OPTIONS
// ─────────────────────────────────────────────
const dateRangeOptions = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "last7", label: "Last 7 Days" },
  { id: "last30", label: "Last 30 Days" },
  { id: "last90", label: "Last 3 Months" },
  { id: "custom", label: "Custom Range" },
];

const categoryOptions = [
  "All Categories",
  "Income",
  "Food & Beverages",
  "Shopping - Online",
  "Shopping - Fashion",
  "Shopping - Electronics",
  "Bills & Utilities",
  "Entertainment",
  "Transport",
  "Travel",
  "Rent",
  "Fund Transfer",
  "Cash",
  "Interest",
  "Loan EMI",
  "Healthcare",
  "Dining Out",
  "Groceries",
  "Investment",
  "Rewards",
];

// DEBIT CARDS
const debitCards = [
  {
    id: "debit1",
    label: "Visa Gold Debit",
    masked: "•••• 1145",
    linkedAccountId: "acc3",
    network: "VISA",
  },
  {
    id: "debit2",
    label: "Platinum Debit",
    masked: "•••• 6613",
    linkedAccountId: "acc2",
    network: "RUPAY",
  },
];

const quickActions = [
  { icon: Send, label: "Make a Payment" },
  { icon: FileText, label: "View Statements" },
  { icon: SmartphoneCharging, label: "Mobile Recharge" },
  { icon: ShoppingCart, label: "Shopping Payments" },
  { icon: ArrowLeftRight, label: "Fund Transfer" },
  { icon: PiggyBank, label: "Savings Goal" },
];




const exploreProducts = [
  { icon: SmartphoneCharging, label: "Mobile Recharge" },
  { icon: Zap, label: "Electricity Bill" },

  { icon: CreditCard, label: "Cards" },
  { icon: Wallet, label: "Banking" },
  { icon: Target, label: "Investing" },
  { icon: TrendingUp, label: "Lending" },
  { icon: ShoppingCart, label: "Shopping" },
  { icon: PieChart, label: "Wealth" },
  { icon: Clock, label: "Loans" },
];
const parseAmount = (val?: string) => {
  if (!val) return 0;
  return Number(val.replace(/[^0-9.-]/g, "")) || 0;
};

const printRecentTransactions = (html: string) => {
  const win = window.open("", "PRINT", "height=700,width=900");
  if (!win) return;
  win.document.write(`
    <html>
      <head>
        <title>Recent Transactions</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 16px; color: #1f2937; }
          h2 { margin: 0 0 12px; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; }
          th, td { padding: 8px 6px; border: 1px solidrgb(47, 113, 211); text-align: left; }
          th { background: #f3f4f6; font-weight: 600; }
          .amount-credit { color: #15803d; font-weight: 600; text-align: right; }
          .amount-debit { color: #b91c1c; font-weight: 600; text-align: right; }
          .right { text-align: right; }
        </style>
      </head>
      <body>
        <h2>Recent Transactions</h2>
        ${html}
      </body>
    </html>
  `);
  win.document.close();
  win.focus();
  win.print();
  win.close();
};

export function Dashboard({ onNavigate }: { onNavigate?: (page: PageType) => void }) {
  const { user } = useAuth();

    const totalAmount = useMemo(() => {
    return OVERVIEW_DATA.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const gradientString = useMemo(() => {
    let currentPercentage = 0;
    const parts = OVERVIEW_DATA.map((item) => {
      const start = currentPercentage;
      const percentage = (item.amount / totalAmount) * 100;
      const end = currentPercentage + percentage;
     
      currentPercentage = end;
     
      return `${item.hex} ${start}% ${end}%`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }, [totalAmount]);

  // State management
  const [selectedAccountId, setSelectedAccountId] = useState<"overview" | string>("overview");
  const [showAll, setShowAll] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [showBalanceFor, setShowBalanceFor] = useState<{ [key: string]: boolean }>({});
  const [showMoreProducts, setShowMoreProducts] = useState(false);
  const [selectedCardFilter, setSelectedCardFilter] = useState<"all" | string>("all");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");
  const [dateRange, setDateRange] = useState("last30");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [transactionType, setTransactionType] = useState<"all" | "credit" | "debit">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Generate comprehensive transactions
  const [allTransactions] = useState(() => generateHistoricalTransactions());

  const selectedAccount = selectedAccountId === "overview"
    ? null
    : accountsData.find((a) => a.id === selectedAccountId) || null;

  const isOverview = selectedAccountId === "overview";

  // Filter transactions based on selected account
  const baseTransactions = isOverview
    ? allTransactions
    : allTransactions.filter(txn => txn.accountId === selectedAccountId);

  // Apply all filters
  const filteredTransactions = baseTransactions.filter((txn) => {
    // Search query
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery = !q ||
      txn.label?.toLowerCase().includes(q) ||
      txn.category?.toLowerCase().includes(q) ||
      txn.amount?.toLowerCase().includes(q) ||
      txn.date?.toLowerCase().includes(q) ||
      txn.accountTitle?.toLowerCase().includes(q);

    // Specific date
    if (selectedDate) {
      const txnDate = new Date(txn.date);
      const filterDate = new Date(selectedDate);
      const sameDay =
        txnDate.getFullYear() === filterDate.getFullYear() &&
        txnDate.getMonth() === filterDate.getMonth() &&
        txnDate.getDate() === filterDate.getDate();
      if (!sameDay) return false;
    }

    // Date range
    const txnDate = new Date(txn.date);
    const today = new Date("2025-12-10");

    // Set start date based on selected range
    let rangeStartDate = new Date(today);
    let rangeEndDate = new Date(today);

    switch (dateRange) {
      case "today":
        rangeStartDate.setDate(today.getDate());
        rangeEndDate.setDate(today.getDate());
        break;
      case "yesterday":
        rangeStartDate.setDate(today.getDate() - 1);
        rangeEndDate.setDate(today.getDate() - 1);
        break;
      case "last7":
        rangeStartDate.setDate(today.getDate() - 7);
        break;
      case "last30":
        rangeStartDate.setDate(today.getDate() - 30);
        break;
      case "last90":
        rangeStartDate.setDate(today.getDate() - 90);
        break;
      case "custom":
        if (startDate && endDate) {
          rangeStartDate = new Date(startDate);
          rangeEndDate = new Date(endDate);
        }
        break;
    }

    // Check if transaction is within date range
    if (dateRange !== "all" && (txnDate < rangeStartDate || txnDate > rangeEndDate)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== "All Categories" && txn.category !== selectedCategory) {
      return false;
    }

    // Transaction type filter
    if (transactionType !== "all" && txn.type !== transactionType) {
      return false;
    }

    return matchesQuery;
  });

  // Sort transactions
  const orderedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date-desc" || sortBy === "date-asc") {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return sortBy === "date-desc" ? bTime - aTime : aTime - bTime;
    }
    const aAmt = Math.abs(a.rawAmount);
    const bAmt = Math.abs(b.rawAmount);
    return sortBy === "amount-desc" ? bAmt - aAmt : aAmt - bAmt;
  });

  const limitedTransactions = showAll
    ? orderedTransactions
    : orderedTransactions.slice(0, 10);

  const handleDownload = () => {
    const data = {
      filters: {
        account: selectedAccount?.title || "Overview",
        dateRange,
        category: selectedCategory,
        type: transactionType,
        search: searchQuery,
      },
      transactions: limitedTransactions.map(txn => ({
        date: txn.date,
        name: txn.label,
        description: txn.category,
        amount: txn.amount,
        account: txn.accountTitle,
        balance: txn.currentBalance,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const totalBalance = accountsData.reduce(
    (sum, acc) => sum + parseAmount(acc.balance),
    0
  );

  const totalPoints = accountsData.reduce((sum, acc) => {
    if (!acc.points) return sum;
    const n = Number(acc.points.replace(/,/g, "")) || 0;
    return sum + n;
  }, 0);

  const handleSelectAccount = (id: string | "overview") => {
    setSelectedAccountId(id);
    setShowAll(false);
    setExpandedRow(null);
  };

  const handleServiceNavigation = (label: string) => {
    switch (label) {
      case "Mobile Recharge":
        onNavigate?.("mobile-recharge");
        break;
      case "Electricity Bill":
        onNavigate?.("electricity-bills");
        break;
      default:
        break;
    }
  }

  // Calculate summary statistics
  const totalCredits = filteredTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + Math.abs(t.rawAmount), 0);

  const totalDebits = filteredTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.rawAmount), 0);

  const netFlow = totalCredits - totalDebits;
  const [showMoreQuick, setShowMoreQuick] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-12 gap-2">
        {/* ───────── LEFT – OVERVIEW + ACCOUNTS + DEBIT + PRODUCTS + CIBIL ───────── */}
        <div className="col-span-12 md:col-span-3">
          {/* HEADER */}
          <div className="mb-1">
            <h1 className="text-[10px] text-foreground">
              Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
            </h1>
            <p className="text-muted-foreground text-[8px]">
              Last Sign-in on: Dec 2, 2025 from mobile device.
            </p>
          </div>

          {/* All Bank Accounts */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-[11px] uppercase font-semibold text-yellow-500 mb-1">
                All Bank Accounts
              </p>
              {/* Overview Button */}
              <div className="mt-1 mb-1 flex justify-start">
                <button
                  onClick={() => handleSelectAccount("overview")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[10px] font-semibold border transition-all
                    ${isOverview
                      ? "bg-[#233b77] text-white border-[#233b77]"
                      : "bg-white text-[#233b77] border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <PieChart className="w-3.5 h-3.5" style={{ color: GOLD }} />
                  Overview
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
            {accountsData.map((acc) => {
              const isSelected = selectedAccountId === acc.id;
              const isBalanceVisible = showBalanceFor[acc.id] ?? false;

              return (
                <Card
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc.id)}
                  className={`cursor-pointer border rounded-lg transition-all p-0 overflow-hidden gap-1
                    ${isSelected
                      ? "border-[#233b77] bg-[#233b77] shadow-md scale-[1.01]"
                      : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex justify-between px-3 pt-1 pb-1">
                    <div className="leading-tight">
                      <p
                        className={`font-semibold text-[11px] truncate max-w-[150px]
                          ${isSelected ? "text-white" : "text-[#233b77]"}`}
                      >
                        {acc.title}
                      </p>
                      <p
                        className={`text-[9px] pt-2
                          ${isSelected ? "text-gray-200" : "text-gray-400"}`}
                      >
                        ******** {acc.number}
                      </p>
                      <p
                        className={`text-[8px] mt-0.5
                          ${isSelected ? "text-gray-100" : "text-gray-500"}`}
                      >
                        {acc.type}
                      </p>
                    </div>

                    <div className="text-right leading-tight">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowBalanceFor((prev) => ({
                              ...prev,
                              [acc.id]: !isBalanceVisible,
                            }));
                          }}
                          className="p-1"
                        >
                          {isBalanceVisible ? (
                            <Eye
                              className={`w-3 h-3 ${isSelected ? "text-white" : ""}`}
                              style={{
                                color: isSelected ? "#ffffff" : GOLD,
                              }}
                            />
                          ) : (
                            <EyeOff
                              className="w-3 h-3"
                              style={{
                                color: isSelected ? "#e5e7eb" : "#9ca3af",
                              }}
                            />
                          )}
                        </button>

                        <span
                          className={`text-[8px]
                            ${isSelected ? "text-gray-200" : "text-gray-500"}`}
                        >
                          Balance
                        </span>
                      </div>

                      <p
                        className={`font-semibold text-[10px]
                          ${isSelected ? "text-white" : "text-gray-900"}`}
                      >
                        {isBalanceVisible ? acc.balance : "******"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-1 text-end px-3 font-semibold text-[9.5px] bg-gray-100 text-blue-700 hover:bg-gray-200"
                  >
                    View Offers -
                  </button>
                </Card>
              );
            })}
          </div>

          {/* Debit Cards Section */}
          <div className="space-y-2 mt-4">
            <p className="text-[11px] uppercase font-semibold text-gray-500 mb-1">
              Debit Cards
            </p>

            {debitCards.map((card) => {
              const linkedAccount = accountsData.find(
                (a) => a.id === card.linkedAccountId
              );
              const isSelected = selectedAccountId === card.linkedAccountId;

              return (
                <Card
                  key={card.id}
                  onClick={() => handleSelectAccount(card.linkedAccountId)}
                  className={`cursor-pointer border rounded-lg transition-all p-3 overflow-hidden
                    ${isSelected
                      ? "border-[#233b77] bg-[#111827] shadow-md scale-[1.01]"
                      : "border-gray-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CreditCard
                          className="w-4 h-4"
                          style={{ color: GOLD }}
                        />
                        <span className="text-[10px] font-semibold text-gray-100">
                          {card.label}
                        </span>
                      </div>
                      <p className="text-[9px] text-gray-300">
                        {card.masked}
                      </p>
                      <p className="text-[8px] text-gray-400">
                        Linked to: {linkedAccount?.title || "Savings Account"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-gray-400 uppercase">
                        {card.network}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>



          <CIBILScoreCard />
        </div>

        {/* ───────── MIDDLE – OVERVIEW / CARD + TRANSACTIONS ───────── */}
        <div className="col-span-12 md:col-span-6">
          <div className="space-y-3">
            {/* OVERVIEW CARD OR BIG ACCOUNT CARD */}
            {isOverview ? (
               <Card className="rounded-xl shadow-md p-3 bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200">
      <CardHeader className="px-0 pt-0 pb-1">
        <CardTitle className="text-xs font-semibold text-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-0 bg-white-100 rounded-md">
                <Wallet className="w-4 h-4 text-yellow-500" />
            </div>
            Financial Overview
          </div>
          {/* <span className="text-[10px] font-normal text-slate-500 bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm">
            Current Month
          </span> */}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0 py-0">
<div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
         
          {/* ─── LEFT: DONUT CHART ─── */}
          <div className="relative w-40 h-40 flex-shrink-0">
            {/* The Pie Chart Circle */}
            <div
              className="w-full h-full rounded-full shadow-inner"
              style={{ background: gradientString }}
            />
           
            {/* The Center Hole (makes it a donut) */}
            <div className="absolute inset-0 m-auto w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Total</span>
              <span className="text-sm font-bold text-slate-800">
                ₹{(totalAmount / 1000).toFixed(1)}k
              </span>
            </div>
          </div>

          {/* ─── RIGHT: LEGEND ─── */}
          <div className="flex-1 w-full grid grid-cols-1 gap-3">
            {OVERVIEW_DATA.map((item) => {
              const percentage = ((item.amount / totalAmount) * 100).toFixed(1);
             
              return (
                <div key={item.label} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    {/* Color Dot */}
                    <div className={`w-3 h-3 rounded-full ${item.colorClass} ring-2 ring-white shadow-sm`} />
                   
                    {/* Label & Percent */}
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-700">{item.label}</span>
                      <span className="text-[9px] text-slate-400">{percentage}%</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-slate-800">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
           
            {/* Divider */}
            {/* <div className="h-px bg-slate-200 w-full my-1"></div> */}
           
            {/* Total Row */}
            {/* <div className="flex justify-between items-center px-1">
                <span className="text-[11px] font-medium text-slate-500">Total Budget</span>
                <span className="text-xs font-bold text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div> */}
          </div>

        </div>
      </CardContent>
    </Card>
            ) : selectedAccount ? (
              <Card className="rounded-xl shadow-md text-white p-5 relative overflow-hidden bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#020617] border border-white/10">
                {/* Decorative glows */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute w-2/3 h-1/2 bg-[rgba(235,198,10,0.20)] rounded-full blur-3xl -top-10 -left-10" />
                  <div className="absolute w-1/2 h-1/2 bg-[rgba(255,255,255,0.08)] rounded-full blur-3xl top-10 right-0" />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Top row: title + type */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-gray-300 mb-0.5">
                        {selectedAccount.accountHolder || "Primary Account Holder"}
                      </p>
                      <p className="text-sm font-semibold">
                        {selectedAccount.title}
                      </p>
                      <p className="text-[9px] text-gray-300 mt-0.5">
                        •••• {selectedAccount.number}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] px-2 py-1 rounded-full border border-white/20 bg-white/5">
                        {selectedAccount.type}
                      </span>
                    </div>
                  </div>

                  {/* Gold line */}
                  <div className="w-full h-[1px] bg-white/20 rounded-full" />

                  {/* Stats */}
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-[10px] text-gray-300">Current Balance</p>
                      <p className="text-lg font-bold">
                        {selectedAccount.balance}
                      </p>
                    </div>

                    <div className="h-12 w-px bg-white/20" />

                    {selectedAccount.type.toLowerCase().includes("loan") ? (
                      <>
                        <div>
                          <p className="text-[10px] text-gray-300">EMI Amount</p>
                          <p className="text-sm font-semibold">
                            {selectedAccount.emi || "₹0.00"}
                          </p>
                        </div>
                        <div className="h-12 w-px bg-white/20" />
                        <div>
                          <p className="text-[10px] text-gray-300">Next Due</p>
                          <p className="text-sm font-semibold">
                            {selectedAccount.nextDue || "-"}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-[10px] text-gray-300">
                            Available Balance
                          </p>
                          <p className="text-sm font-semibold">
                            {selectedAccount.balance}
                          </p>
                        </div>
                        <div className="h-12 w-px bg-white/20" />
                        <div>
                          <p className="text-[10px] text-gray-300">
                            Account Number
                          </p>
                          <p className="text-sm font-semibold">
                            •••• {selectedAccount.number}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ) : null}

            {/* ───────── Enhanced Transactions Card ───────── */}
            {/* ───────── Enhanced Transactions Card ───────── */}
<Card className="rounded-xl shadow-sm">
  {/* HEADER WITH FILTERS */}
  <CardHeader className="pb-0 px-2">
            <CardTitle className="text-xs font-semibold text-gray-800 ">

<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 ">
      <div className="flex-1">
  <div className="flex items-center gap-2">
            <div className="p-0 bg-white-100 rounded-md ">
                <ArrowLeftRight className="w-4 h-4 text-yellow-500" />
            </div>
            Recent Transactions
          </div>     
            <div className="flex items-center gap-2 mt-2">
          <label className="text-[10px] font-semibold text-gray-700">
            Select Card/Account:
          </label>
          <select
            className="text-[10px] p-1.5 border rounded bg-white"
            value={selectedCardFilter}
            onChange={(e) => setSelectedCardFilter(e.target.value)}
          >
            <option value="all">All Accounts</option>
            {accountsData.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.title} (••••{acc.number})
              </option>
            ))}
          </select>
         
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Show/Hide Filters Button */}
        <Button
          variant="outline"
          size="sm"
          className="text-[10px] h-7"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-3 h-3 mr-1" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        
      </div>
    </div>

    {/* EXPANDABLE FILTERS SECTION */}
    {showFilters && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg mb-3 border">
        {/* Date Range Dropdown */}
<div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
            Date Range
          </label>
          <select
            className="w-full text-[10px] p-1.5 border rounded bg-white"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            {dateRangeOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Date Range - Only show when "custom" is selected */}
        {dateRange === "custom" && (
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
                From
              </label>
              <input
                type="date"
                className="w-full text-[10px] p-1.5 border rounded bg-white"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
                To
              </label>
              <input
                type="date"
                className="w-full text-[10px] p-1.5 border rounded bg-white"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div>
          <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
            Category
          </label>
          <select
            className="w-full text-[10px] p-1.5 border rounded bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type */}
        <div>
          <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
            Type
          </label>
          <select
            className="w-full text-[10px] p-1.5 border rounded bg-white"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value as any)}
          >
            <option value="all">All Transactions</option>
            <option value="credit">Credits Only</option>
            <option value="debit">Debits Only</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
            Sort By
          </label>
          <select
            className="w-full text-[10px] p-1.5 border rounded bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
          </select>
        </div>

        {/* Search and Date Inputs */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-semibold text-gray-700 mb-1 block">
            Search
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border rounded px-2 py-1 bg-white">
              <Search className="w-3 h-3 text-[#233b77]" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="text-[10px] ml-1 flex-1 bg-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center border rounded px-2 py-1 bg-white">
              <Calendar className="w-3 h-3 text-[#233b77]" />
              <input
                type="date"
                className="text-[10px] bg-transparent outline-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="md:col-span-2 flex items-end">
          <Button
            variant="outline"
            size="sm"
            className="text-[10px] h-7 w-full"
            onClick={() => {
              setSearchQuery("");
              setSelectedDate("");
              setDateRange("last30");
              setSelectedCategory("All Categories");
              setTransactionType("all");
              setSortBy("date-desc");
              setStartDate("");
              setEndDate("");
              setSelectedCardFilter("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    )}

    </CardTitle>
  </CardHeader>

  <CardContent className=" pb-1 max-h-120 overflow-y-auto no-scrollbar px-2">
    <div id="recent-transactions-table">
      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 px-2 py-2 text-[10px] font-semibold bg-gray-100 text-gray-700 border-b rounded-t">
        <span className="flex items-center gap-1">
          Date
          <ChevronDown className="w-3 h-3" />
        </span>
        <span>Name</span>
        <span>Description</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Current Balance</span>
      </div>

      {/* TRANSACTION ROWS */}
      {limitedTransactions.length > 0 ? (
        limitedTransactions.map((txn) => {
          const rowKey = `${txn.accountId}-${txn.id}`;
          const isOpen = expandedRow === rowKey;

          return (
            <div key={rowKey}>
              <div
                className="grid grid-cols-5 gap-2 px-2 py-2.5 text-[10px] border-b hover:bg-blue-50 transition cursor-pointer"
                onClick={() => setExpandedRow(isOpen ? null : rowKey)}
              >
               <span className="font-medium">{txn.date}</span>
<span className="font-semibold truncate">{txn.label}</span>
<span className="truncate text-gray-600">{txn.category}</span>

<span className={`font-bold sm:text-right ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>
  {txn.amount}
</span>

<span className="sm:text-right font-semibold truncate">
  {txn.currentBalance}
</span>

              </div>

              {/* EXPANDED DETAILS */}
              {isOpen && (
                <div className="bg-white border border-gray-200 rounded-md p-3 mt-1 text-[10px] space-y-3 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-500">Transaction ID</p>
                      <p className="font-semibold text-gray-900">{txn.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Account</p>
                      <p className="font-semibold text-gray-900">
                        {txn.accountTitle} (••••{txn.accountNumber})
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Purchased On</p>
                      <p className="font-semibold text-gray-900">{txn.purchased}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Posted On</p>
                      <p className="font-semibold text-gray-900">{txn.date}</p>
                    </div>
                  </div>

                  {txn.location && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3" style={{ color: GOLD }} />
                      <span className="font-medium text-[#233b77]">
                        {txn.location}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#233b77] hover:bg-[#1d2f60] text-[9px] h-6 px-2"
                    >
                      Dispute Transaction
                    </Button>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-[#233b77] text-[9px] hover:underline">
                        <FileText className="w-3 h-3" /> Receipt
                      </button>
                      <button className="flex items-center gap-1 text-[#233b77] text-[9px] hover:underline">
                        <Download className="w-3 h-3" /> Export
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No transactions found</p>
          <p className="text-gray-400 text-xs mt-1">
            Try changing your filters or search terms
          </p>
        </div>
      )}
    </div>

    {filteredTransactions.length > 10 && (
      <Button
        variant="outline"
        size="sm"
        className="w-full text-[10px] mt-3 border-dashed"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll
          ? `Show Less (Viewing ${limitedTransactions.length} of ${filteredTransactions.length})`
          : `View All Transactions (${filteredTransactions.length}) →`}
      </Button>
    )}
  </CardContent>

  {/* FOOTER WITH DOWNLOAD OPTION */}
  <div className="px-4 py-2 border-t bg-gray-50 flex justify-between items-center">
    <span className="text-[10px] text-gray-500">
      Showing {limitedTransactions.length} of {filteredTransactions.length} transactions
    </span>
    <Button
      variant="ghost"
      size="sm"
      className="text-[10px] h-7"
      onClick={handleDownload}
    >
      <Download className="w-3 h-3 mr-1" />
      Download
    </Button>
  </div>
</Card>

            {/* <OffersSection /> */}
          </div>
        </div>



        {/* ───────── RIGHT – CONTEXTUAL ACCOUNT INSIGHTS + QUICK + POINTS + SERVICES ───────── */}
        <div className="col-span-12 md:col-span-3">
          <div className="space-y-3">
            {/* 👨‍👩‍👧 FAMILY DETAILS - Only show if specific account is selected */}
            {!isOverview && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm font-semibold flex items-center justify-between text-[#233b77]">
                    Holders & Nominees
                    <span className="text-[10px] font-normal text-gray-500">
                      Linked to account •••• {selectedAccount?.number || ""}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 text-[10px]">
                  {selectedAccount?.familyDetails?.members &&
                    selectedAccount.familyDetails.members.length > 0 ? (
                    <>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-600 block mb-1">
                          Primary Holder
                        </span>
                        <div className="p-2 rounded-lg border border-slate-100 bg-gray-50 font-bold text-[#233b77]">
                          {selectedAccount.familyDetails.primaryHolder}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {selectedAccount.familyDetails.members.map(
                          (member: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex justify-between items-start p-2 rounded-lg border border-slate-100 bg-white"
                            >
                              <div>
                                <p className="font-bold text-gray-800">
                                  {member.name}
                                </p>
                                <p className="text-gray-500">
                                  Relation: {member.relation}
                                </p>
                                {member.share && (
                                  <p className="text-gray-500">
                                    Share: {member.share}
                                  </p>
                                )}
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                                {member.role}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-gray-400 italic">
                      No family details are updated for this account yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}



            {/* Bill Payments */}
            <Card className="shadow-sm rounded-xl mt-0 ">
              <CardHeader className="px-2">
                <CardTitle className="text-xs font-semibold text-gray-800">
                  Bill Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[10px] space-y-3 px-2">
                <div className="grid grid-cols-4 gap-4 place-items-center">
                  {(showMoreProducts ? exploreProducts : exploreProducts.slice(0, 4)).map(
                    (item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleServiceNavigation(item.label)}
                          className="flex flex-col items-center cursor-pointer hover:opacity-80"
                        >
                          <div className="w-10 h-10 border rounded-full flex items-center justify-center border-[#233b77]">
                            <Icon
                              className="w-4 h-4"
                              style={{ color: GOLD }}
                            />
                          </div>
                          <p className="text-[#233b77] font-medium mt-1 text-[8px] text-center">
                            {item.label}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>

                <button
                  onClick={() => setShowMoreProducts(!showMoreProducts)}
                  className="w-full flex items-center justify-between text-[10px] font-semibold text-[#233b77] py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-md"
                >
                  {showMoreProducts
                    ? "View Less"
                    : "View All Offers for You"}{" "}
                  →
                </button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm rounded-xl mt-3">
              <CardHeader className="px-2">
                <CardTitle className="text-xs font-semibold text-gray-800">
                  Quick Actions
                </CardTitle>
              </CardHeader>

              <CardContent className="text-[10px] space-y-3 px-2">
                <div className="grid grid-cols-4 gap-4 place-items-center ">
                  {(showMoreQuick ? quickActions : quickActions.slice(0, 4)).map(
                    (item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center cursor-pointer hover:opacity-80"
                        >
                          <div className="w-10 h-10 border rounded-full flex items-center justify-center border-[#233b77]">
                            <Icon className="w-4 h-4" style={{ color: GOLD }} />
                          </div>

                          <p className="text-[#233b77] font-medium mt-1 text-[8px] text-center">
                            {item.label}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* View More / View Less Button */}
                <button
                  onClick={() => setShowMoreQuick(!showMoreQuick)}
                  className="w-full flex items-center justify-between text-[10px] font-semibold text-[#233b77] py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-md"
                >
                  {showMoreQuick ? "View Less" : "View All Quick Actions"} →
                </button>
              </CardContent>
            </Card>
            {/* Reward Points */}
           
            {/* </Rewardpoints> */}
            <Rewardpoints />
                        <OffersSection />

          </div>
        </div>
      </div>

      <MerchantOffers />
      <Footer />
    </div>
  );
}






