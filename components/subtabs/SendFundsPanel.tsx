"use client";

import React, { useMemo, useState } from "react";

type TransferStatus = "Success" | "Pending" | "Failed";
type RecentTransfer = {
    id: string;
    payee: string;
    account: string;
    amount: string;
    status: TransferStatus;
    date: string;
    reference: string;
    remarks?: string;
};

interface SendFundsPanelProps {
    search: string;
    setSearch: (v: string) => void;
}

type BankDetails = {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    branch?: string;
};

const MOCK_BANK_INFO: Record<string, BankDetails> = {
    "John Carter": {
        accountNumber: "1234567890",
        ifsc: "SBIN0001234",
        bankName: "State Bank",
        branch: "MG Road",
    },
    "Acme Corp": {
        accountNumber: "9876543210",
        ifsc: "HDFC0005678",
        bankName: "HDFC Bank",
        branch: "Business Park",
    },
    "Lisa Wong": {
        accountNumber: "5566778899",
        ifsc: "ICIC0004321",
        bankName: "ICICI Bank",
        branch: "Central",
    },
    "Global Supplies": {
        accountNumber: "2223334445",
        ifsc: "AXIS0001112",
        bankName: "Axis Bank",
        branch: "Industrial",
    },
    "Rent Co": {
        accountNumber: "3334445556",
        ifsc: "PNB0002223",
        bankName: "PNB",
        branch: "North",
    },
};

const makeMockTransfers = (): RecentTransfer[] => {
    const base: Omit<RecentTransfer, "id" | "date" | "reference">[] = [
        { payee: "John Carter", account: "XXXX 3321", amount: "$1,250.00", status: "Success" },
        { payee: "Acme Corp", account: "XXXX 1198", amount: "$3,450.00", status: "Pending" },
        { payee: "Lisa Wong", account: "XXXX 7744", amount: "$980.50", status: "Failed" },
        { payee: "Global Supplies", account: "XXXX 8877", amount: "$2,100.00", status: "Success" },
        { payee: "Rent Co", account: "XXXX 4455", amount: "$950.00", status: "Success" },
        { payee: "Gym Membership", account: "XXXX 2266", amount: "$55.00", status: "Pending" },
        { payee: "Fiona", account: "XXXX 9988", amount: "$120.00", status: "Success" },
        { payee: "Taxi Service", account: "XXXX 3344", amount: "$23.75", status: "Success" },
        { payee: "Coffee Shop", account: "XXXX 5566", amount: "$8.50", status: "Success" },
        { payee: "Cloud Host", account: "XXXX 7788", amount: "$45.00", status: "Pending" },
        { payee: "Vendor X", account: "XXXX 9900", amount: "$560.00", status: "Failed" },
        { payee: "Insurance", account: "XXXX 1112", amount: "$75.00", status: "Success" },
    ];

    return base.map((b, idx) => {
        const daysAgo = idx + 1;
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return {
            id: `tx-${1000 + idx}`,
            payee: b.payee,
            account: b.account,
            amount: b.amount,
            status: b.status,
            date: d.toISOString(),
            reference: `REF${Math.floor(100000 + Math.random() * 899999)}`,
            remarks:
                idx % 3 === 0
                    ? "Monthly subscription"
                    : idx % 3 === 1
                        ? "Invoice payment"
                        : "Personal transfer",
        };
    });
};

const CHUNK = 5;

// internal accounts list (used for Internal transfer UI)
const INTERNAL_ACCOUNTS = [
    "Savings - XXXX 2020",
    "Salary Savings - XXXX 6613",
    "Premium Savings - XXXX 1145",
];

const SendFundsPanel: React.FC<SendFundsPanelProps> = ({ search, setSearch }) => {
    const allTransfers = useMemo(() => makeMockTransfers(), []);
    const payees = useMemo(
        () => Array.from(new Set(allTransfers.map((t) => t.payee)).add("New Payee")),
        [allTransfers]
    );

    const [fromAccount, setFromAccount] = useState("Savings - XXXX 2020");
    const [selectedPayee, setSelectedPayee] = useState("");
    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");
    const [transferType, setTransferType] = useState<"IMPS" | "NEFT" | "RTGS" | "Internal">(
        "IMPS"
    );
    const [schedule, setSchedule] = useState<"Now" | "Later">("Now");
    const [scheduledDate, setScheduledDate] = useState<string>("");

    const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
    const [isEditingBank, setIsEditingBank] = useState(false);
    const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);

    const [visibleCount, setVisibleCount] = useState<number>(CHUNK);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [tableSearch, setTableSearch] = useState("");
    const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

    // 🔹 NEW: extra fields based on transfer type
    const [impsMobileOrUpi, setImpsMobileOrUpi] = useState("");
    const [neftPurpose, setNeftPurpose] = useState("");
    const [rtgsPurpose, setRtgsPurpose] = useState("");
    const [internalToAccount, setInternalToAccount] = useState("");

    const dismissToast = () => setToast(null);

    const filteredTransfers = useMemo(() => {
        const q = tableSearch.trim().toLowerCase();
        if (!q) return allTransfers;
        return allTransfers.filter(
            (t) => t.payee.toLowerCase().includes(q) || t.account.toLowerCase().includes(q)
        );
    }, [allTransfers, tableSearch]);

    const visibleTransfers = filteredTransfers.slice(0, visibleCount);
    const hasMore = visibleCount < filteredTransfers.length;

    React.useEffect(() => {
        if (!selectedPayee) {
            setBankDetails(null);
            setIsEditingBank(false);
            return;
        }
        const info = MOCK_BANK_INFO[selectedPayee];
        if (info) {
            setBankDetails({ ...info });
            setIsEditingBank(false);
        } else {
            setBankDetails({ accountNumber: "", ifsc: "", bankName: "", branch: "" });
            setIsEditingBank(true);
        }
        setErrors((e) => {
            const copy = { ...e };
            delete copy.payee;
            delete copy.accountNumber;
            delete copy.ifsc;
            delete copy.bankName;
            return copy;
        });
    }, [selectedPayee]);

    const prettyDate = (iso: string) => new Date(iso).toLocaleString();

    const validateAll = (): boolean => {
        const next: Partial<Record<string, string>> = {};

        if (!selectedPayee) next.payee = "Select or search for a payee.";
        if (!amount || Number(amount) <= 0)
            next.amount = "Enter a valid amount greater than 0.";
        if (schedule === "Later" && !scheduledDate)
            next.scheduledDate = "Select date & time for scheduled transfer.";

        // For external transfers, bank details are required
        if (transferType !== "Internal") {
            if (!bankDetails || !bankDetails.accountNumber)
                next.accountNumber = "Beneficiary account number is required.";
            if (!bankDetails || !bankDetails.ifsc) next.ifsc = "IFSC is required.";
            if (!bankDetails || !bankDetails.bankName) next.bankName = "Bank name is required.";
        }

        // Extra validation per transfer type (realistic)
        if (transferType === "RTGS") {
            if (!rtgsPurpose.trim())
                next.rtgsPurpose = "Mention purpose for high value RTGS transfer.";
            if (Number(amount) < 200000)
                next.amount = "RTGS is allowed for amounts ₹2,00,000 and above.";
        }

        if (transferType === "NEFT" && !neftPurpose.trim()) {
            next.neftPurpose = "Enter purpose of transfer for NEFT.";
        }

        if (transferType === "Internal" && !internalToAccount) {
            next.internalToAccount = "Select the internal account to credit.";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSend = () => {
        if (!validateAll()) return;

        const prettyType =
            transferType === "Internal" ? "Internal transfer" : `${transferType} transfer`;

        setToast({
            id: Date.now(),
            message: `Sent $${amount} to ${selectedPayee} via ${prettyType}`,
        });
        window.setTimeout(() => setToast(null), 3000);

        setAmount("");
        setRemarks("");
        setSchedule("Now");
        setScheduledDate("");
        setImpsMobileOrUpi("");
        setNeftPurpose("");
        setRtgsPurpose("");
        setInternalToAccount("");
        setErrors({});
    };

    const handleShowMore = () => {
        setVisibleCount((s) => Math.min(filteredTransfers.length, s + CHUNK));
    };

    const toggleExpandByVisibleIndex = (visibleIdx: number) => {
        setExpandedIndex((cur) => (cur === visibleIdx ? null : visibleIdx));
    };

    return (
        <>
            {/* Toast */}
            {toast && (
                <div role="status" aria-live="polite" className="fixed top-4 right-4 z-50">
                    <div className="max-w-xs px-3 py-2 rounded-md shadow-md bg-green-600 text-white text-sm font-semibold flex items-center gap-2">
                        <span>{toast.message}</span>
                        <button onClick={dismissToast} className="text-xs underline" type="button">
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Two-column layout: left = send, right = recent */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {/* LEFT: Search + Send money + bank details */}
                <div className="space-y-3">
                    {/* Top search area */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-slate-700 text-[10px]">
                                Transfer to
                            </label>
                            <div className="relative">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Type payee name"
                                    className="w-full bg-white border border-slate-200 rounded-md pl-9 pr-20 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-[10px]"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                                        />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const match = payees.find((p) =>
                                            p.toLowerCase().includes(search.toLowerCase())
                                        );
                                        if (match) setSelectedPayee(match);
                                    }}
                                    className="text-[10px] absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 text-xs font-semibold"
                                >
                                    Search
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="text-slate-500 text-[10px]">
                                    Add payee feature is disabled
                                </span>
                                <button className="text-blue-700 font-semibold hover:underline text-[10px]">
                                    ENABLE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Send money + bank card */}
                    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-6 py-5 space-y-5">
                        <div className="flex items-end justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 text-[12px]">
                                    Send Money
                                </h3>
                                <p className="mt-1 text-xs text-slate-500 text-[10px]">
                                    Please fill in the details below to process your transfer.
                                </p>
                            </div>
                            <p className="text-[9px] font-medium text-rose-500">
                                * All fields are required
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {/* form */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* From account */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-[10px]">
                                            From Account
                                        </label>
                                        <select
                                            value={fromAccount}
                                            onChange={(e) => setFromAccount(e.target.value)}
                                            className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                        px-3.5 text-sm text-slate-800
                        focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                        transition text-[10px]"
                                        >
                                            <option>Savings - XXXX 2020</option>
                                            <option>Current - XXXX 5544</option>
                                        </select>
                                    </div>

                                    {/* Payee */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-[10px]">
                                            Payee
                                        </label>
                                        <select
                                            value={selectedPayee}
                                            onChange={(e) => setSelectedPayee(e.target.value)}
                                            className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                        px-3.5 text-sm text-slate-800
                        focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                        transition text-[10px]"
                                        >
                                            <option value="">Choose a payee</option>
                                            {payees.map((p) => (
                                                <option key={p} value={p}>
                                                    {p}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.payee && (
                                            <div className="text-[9px] mt-0.5 text-rose-500">
                                                {errors.payee}
                                            </div>
                                        )}
                                    </div>

                                    {/* Amount */}
                                    <div>
                                        <label className="text-[10px] block text-xs font-semibold text-slate-700 mb-1.5">
                                            Amount (USD)
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2.5 text-slate-500 text-xs">
                                                $
                                            </span>
                                            <input
                                                value={amount}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^[0-9]*\.?[0-9]*$/.test(val) || val === "")
                                                        setAmount(val);
                                                }}
                                                placeholder="0.00"
                                                className={`w-full h-11 rounded-xl pl-7 pr-3 text-sm
                          border bg-slate-50/70
                          focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                          transition text-[10px]
                          ${errors.amount
                                                        ? "border-rose-400"
                                                        : "border-slate-200"
                                                    }`}
                                            />
                                        </div>
                                        {errors.amount && (
                                            <div className="mt-0.5 text-[9px] text-rose-500">
                                                {errors.amount}
                                            </div>
                                        )}
                                    </div>

                                    {/* Transfer type */}
                                    <div>
                                        <label className="text-[10px] block text-xs font-semibold text-slate-700 mb-1.5">
                                            Transfer Type
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {(["IMPS", "NEFT", "RTGS", "Internal"] as const).map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setTransferType(type)}
                                                    className={`px-3 py-1.5 rounded-full border text-xs font-medium
                            transition text-[10px]
                            ${transferType === type
                                                            ? "bg-slate-900 text-white border-slate-900"
                                                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Remarks */}
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-[10px]">
                                            Remarks (optional)
                                        </label>
                                        <input
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            placeholder="Payment reason or notes"
                                            className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
                        px-3.5 text-sm text-slate-800
                        focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                        transition text-[10px]"
                                        />
                                    </div>

                                    {/* 🔹 Transfer-type specific fields */}
                                    <div className="md:col-span-2">
                                        {transferType === "IMPS" && (
                                            <div className="space-y-1">
                                                <label className="block text-[10px] font-semibold text-slate-700">
                                                    Beneficiary mobile / UPI ID (optional)
                                                </label>
                                                <input
                                                    value={impsMobileOrUpi}
                                                    onChange={(e) => setImpsMobileOrUpi(e.target.value)}
                                                    placeholder="e.g. 9876543210 or name@upi"
                                                    className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300"
                                                />
                                                <p className="text-[9px] text-slate-500">
                                                    IMPS is available 24x7 with instant credit (subject to bank
                                                    limits).
                                                </p>
                                            </div>
                                        )}

                                        {transferType === "NEFT" && (
                                            <div className="space-y-1">
                                                <label className="block text-[10px] font-semibold text-slate-700">
                                                    Purpose of transfer
                                                </label>
                                                <input
                                                    value={neftPurpose}
                                                    onChange={(e) => setNeftPurpose(e.target.value)}
                                                    placeholder="e.g. Salary, Vendor payment, Rent"
                                                    className={`w-full h-10 rounded-xl border bg-slate-50 px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                            ${errors.neftPurpose
                                                            ? "border-rose-400"
                                                            : "border-slate-200"
                                                        }`}
                                                />
                                                {errors.neftPurpose && (
                                                    <p className="text-[9px] text-rose-500 mt-0.5">
                                                        {errors.neftPurpose}
                                                    </p>
                                                )}
                                                <p className="text-[9px] text-slate-500">
                                                    NEFT is processed in batches during banking hours. Credit
                                                    may take a few hours.
                                                </p>
                                            </div>
                                        )}

                                        {transferType === "RTGS" && (
                                            <div className="space-y-1">
                                                <label className="block text-[10px] font-semibold text-slate-700">
                                                    High value transfer purpose
                                                </label>
                                                <input
                                                    value={rtgsPurpose}
                                                    onChange={(e) => setRtgsPurpose(e.target.value)}
                                                    placeholder="e.g. Property payment, Business settlement"
                                                    className={`w-full h-10 rounded-xl border bg-slate-50 px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                            ${errors.rtgsPurpose
                                                            ? "border-rose-400"
                                                            : "border-slate-200"
                                                        }`}
                                                />
                                                {errors.rtgsPurpose && (
                                                    <p className="text-[9px] text-rose-500 mt-0.5">
                                                        {errors.rtgsPurpose}
                                                    </p>
                                                )}
                                                <p className="text-[9px] text-slate-500">
                                                    RTGS is for amounts ₹2,00,000 and above and is processed
                                                    in real time during RTGS hours.
                                                </p>
                                            </div>
                                        )}

                                        {transferType === "Internal" && (
                                            <div className="space-y-1">
                                                <label className="block text-[10px] font-semibold text-slate-700">
                                                    To account (within this bank)
                                                </label>
                                                <select
                                                    value={internalToAccount}
                                                    onChange={(e) => setInternalToAccount(e.target.value)}
                                                    className={`w-full h-10 rounded-xl border bg-slate-50 px-3 text-[10px] focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                            ${errors.internalToAccount
                                                            ? "border-rose-400"
                                                            : "border-slate-200"
                                                        }`}
                                                >
                                                    <option value="">Select internal account</option>
                                                    {INTERNAL_ACCOUNTS.map((acc) => (
                                                        <option key={acc} value={acc}>
                                                            {acc}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.internalToAccount && (
                                                    <p className="text-[9px] text-rose-500 mt-0.5">
                                                        {errors.internalToAccount}
                                                    </p>
                                                )}
                                                <p className="text-[9px] text-slate-500">
                                                    Internal transfers between your own NetBank accounts are
                                                    credited instantly with no IFSC required.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Schedule */}
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-[10px]">
                                            Schedule
                                        </label>
                                        <div className="flex gap-4 text-xs text-slate-700 ">
                                            <label className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="schedule"
                                                    checked={schedule === "Now"}
                                                    onChange={() => setSchedule("Now")}
                                                    className="accent-slate-900 text-[10px]"
                                                />
                                                <span>Now</span>
                                            </label>
                                            <label className="flex items-center gap-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="schedule"
                                                    checked={schedule === "Later"}
                                                    onChange={() => setSchedule("Later")}
                                                    className="accent-slate-900 text-[10px]"
                                                />
                                                <span>Later</span>
                                            </label>
                                        </div>
                                        {schedule === "Later" && (
                                            <>
                                                <input
                                                    type="datetime-local"
                                                    value={scheduledDate}
                                                    onChange={(e) => setScheduledDate(e.target.value)}
                                                    className={`mt-2 w-full h-11 rounded-xl px-3.5 text-sm
                            border bg-slate-50/70
                            focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                            transition text-[10px]
                            ${errors.scheduledDate
                                                            ? "border-rose-400"
                                                            : "border-slate-200"
                                                        }`}
                                                />
                                                {errors.scheduledDate && (
                                                    <div className="mt-0.5 text-[9px] text-rose-500">
                                                        {errors.scheduledDate}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom note + actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                                    <p className="text-[11px] text-slate-500">
                                        A confirmation SMS will be sent to your registered number.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleSend}
                                            className="inline-flex items-center justify-center
                        px-5 py-2 rounded-full text-sm font-semibold
                        bg-slate-900 text-white
                        hover:bg-slate-800
                        transition text-[10px]"
                                        >
                                            Send
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedPayee("");
                                                setAmount("");
                                                setRemarks("");
                                                setSchedule("Now");
                                                setScheduledDate("");
                                                setImpsMobileOrUpi("");
                                                setNeftPurpose("");
                                                setRtgsPurpose("");
                                                setInternalToAccount("");
                                                setErrors({});
                                                setToast(null);
                                            }}
                                            className="inline-flex items-center justify-center
                        px-4 py-2 rounded-full text-xs font-medium
                        border border-slate-200 text-slate-600
                        hover:bg-slate-50 transition text-[10px]"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* bank details card (unchanged logic, only slightly compact already) */}
                            {/* ... your existing bank details card code stays as-is ... */}


                            {/* bank details card (kept same structure, slightly softened) */}
                            <div>
                                <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/70 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-[10px] text-slate-500">Bank Details</div>
                                            <div className="text-sm font-semibold text-slate-900 text-[10px]">
                                                {selectedPayee || "No payee selected"}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!selectedPayee) {
                                                    setSelectedPayee("");
                                                    setBankDetails({
                                                        accountNumber: "",
                                                        ifsc: "",
                                                        bankName: "",
                                                        branch: "",
                                                    });
                                                }
                                                setIsEditingBank((s) => !s);
                                                setErrors((e) => {
                                                    const copy = { ...e };
                                                    delete copy.accountNumber;
                                                    delete copy.ifsc;
                                                    delete copy.bankName;
                                                    return copy;
                                                });
                                            }}
                                            className="text-[10px] text-xs font-semibold text-slate-800 hover:underline"
                                        >
                                            {isEditingBank ? "Done" : "Edit"}
                                        </button>
                                    </div>

                                    {!isEditingBank && bankDetails ? (
                                        <div className="space-y-1.5 text-xs ">
                                            <div className="text-[10px] text-slate-500">Account</div>
                                            <div className="text-[10px]font-semibold text-slate-900 text-sm">
                                                {bankDetails.accountNumber}
                                            </div>

                                            <div className="text-[10px]text-slate-500">IFSC</div>
                                            <div className="text-[10px] font-semibold text-slate-900 text-sm">
                                                {bankDetails.ifsc}
                                            </div>

                                            <div className="text-slate-500 text-[10px] ">Bank</div>
                                            <div className="text-[10px] font-semibold text-slate-900 text-sm">
                                                {bankDetails.bankName}
                                                {bankDetails.branch ? ` · ${bankDetails.branch}` : ""}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 text-xs">
                                            <div>
                                                <label className="text-[10px] text-slate-500">
                                                    Account number
                                                </label>
                                                <input
                                                    value={bankDetails?.accountNumber ?? ""}
                                                    onChange={(e) =>
                                                        setBankDetails((b) => ({
                                                            ...(b ?? {}),
                                                            accountNumber: e.target.value,
                                                        }) as BankDetails)
                                                    }
                                                    className={`
                  mt-0.5 w-full h-10 rounded-lg px-3 text-sm
                  border bg-white
                  focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                  text-[10px]
                  ${errors.accountNumber
                                                            ? "border-rose-400 text-[10px] "
                                                            : "border-slate-200 text-[10px] "
                                                        }
                `}
                                                    placeholder="Enter account number"
                                                />
                                                {errors.accountNumber && (
                                                    <div className="mt-0.5 text-[11px] text-rose-500">
                                                        {errors.accountNumber}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-[11px] text-slate-500">IFSC</label>
                                                <input
                                                    value={bankDetails?.ifsc ?? ""}
                                                    onChange={(e) =>
                                                        setBankDetails((b) => ({
                                                            ...(b ?? {}),
                                                            ifsc: e.target.value,
                                                        }) as BankDetails)
                                                    }
                                                    className={`
                  mt-0.5 w-full h-10 rounded-lg px-3 text-sm
                  border bg-white
                  focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                  text-[10px]
                  ${errors.ifsc ? "border-rose-400" : "border-slate-200"}
                `}
                                                    placeholder="Enter IFSC"
                                                />
                                                {errors.ifsc && (
                                                    <div className="mt-0.5 text-[11px] text-rose-500">
                                                        {errors.ifsc}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-[11px] text-slate-500">Bank name</label>
                                                <input
                                                    value={bankDetails?.bankName ?? ""}
                                                    onChange={(e) =>
                                                        setBankDetails((b) => ({
                                                            ...(b ?? {}),
                                                            bankName: e.target.value,
                                                        }) as BankDetails)
                                                    }
                                                    className={`
                  mt-0.5 w-full h-10 rounded-lg px-3 text-sm
                  border bg-white
                  focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                  text-[10px]
                  ${errors.bankName ? "border-rose-400" : "border-slate-200"}
                `}
                                                    placeholder="Enter bank name"
                                                />
                                                {errors.bankName && (
                                                    <div className="mt-0.5 text-[11px]  text-rose-500">
                                                        {errors.bankName}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="text-[11px] text-slate-500">
                                                    Branch (optional)
                                                </label>
                                                <input
                                                    value={bankDetails?.branch ?? ""}
                                                    onChange={(e) =>
                                                        setBankDetails((b) => ({
                                                            ...(b ?? {}),
                                                            branch: e.target.value,
                                                        }) as BankDetails)
                                                    }
                                                    className="
                  mt-0.5 w-full h-10 rounded-lg px-3 text-sm
                  border border-slate-200 bg-white
                  text-[10px]
                  focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300
                "
                                                    placeholder="Enter branch"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* RIGHT: Recent transfers table */}
                {/* RIGHT: Recent transfers table */}
                <div className="space-y-2">
                    {/* Top bar: title + search */}
                    <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <h3 className="text-base text-[10px] font-semibold text-slate-800">
                            You have recently transferred money to
                        </h3>

                        <div className="w-full sm:w-64">
                            <div className="relative">
                                <input
                                    value={tableSearch}
                                    onChange={(e) => {
                                        setTableSearch(e.target.value);
                                        setExpandedIndex(null);
                                        setVisibleCount(CHUNK);
                                    }}
                                    type="text"
                                    placeholder="Search recent transfers"
                                    className="w-full text-[10px] bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-300 outline-none"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table card */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Toolbar like in screenshot (optional) */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-white">
                            <div className="flex items-center gap-2 text-xs text-[10px] text-slate-500">
                                <span>Showing</span>
                                <select className="text-[10px] border border-slate-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-slate-200">
                                    <option>8 rows</option>
                                    <option>10 rows</option>
                                    <option>20 rows</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="text-[10px] px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                                >
                                    Export All
                                </button>
                                <button
                                    type="button"
                                    className="text-[10px] px-3 py-1.5 rounded-full bg-slate-900 text-xs font-medium text-white hover:bg-slate-800 transition"
                                >
                                    + New Transfer
                                </button>
                            </div>
                        </div>

                        {/* Header row */}
                        <div className="hidden md:grid grid-cols-4 px-4 py-2.5 text-[9px] font-semibold text-slate-500 bg-slate-50 border-b border-slate-100 uppercase tracking-wide">
                            <span className="flex  items-center gap-1">
                                Date
                            </span>
                            <span>Payee / Account</span>
                            <span>Amount</span>
                            <span className="text-right pr-1">Status / Actions</span>
                        </div>

                        {/* Body */}
                        <div className="divide-y divide-slate-100">
                            {visibleTransfers.map((item, idx) => {
                                const isExpanded = expandedIndex === idx;
                                return (
                                    <div key={item.id} className="px-3 md:px-4 group">
                                        {/* main row */}
                                        <div
                                            className="
                grid grid-cols-1 md:grid-cols-4 items-center gap-2
                py-3
                transition
                rounded-lg
                text-[10px]
                group-hover:bg-slate-50
                group-hover:shadow-[0_1px_3px_rgba(15,23,42,0.08)]
              "
                                        >
                                            {/* Payee + expand button */}
                                            <div className="flex items-start gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleExpandByVisibleIndex(idx)}
                                                    className={`
                    mt-0.5 w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold
                    transition
                    text-[10px]
                    ${isExpanded
                                                            ? 'bg-slate-900 text-white border-slate-900 text-[10px]'
                                                            : 'bg-white text-slate-700 border-slate-200 group-hover:bg-slate-100 text-[10px] '
                                                        }
                  `}
                                                    aria-expanded={isExpanded}
                                                    aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                                                >
                                                    {isExpanded ? '−' : '+'}
                                                </button>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-slate-900 text-[10px] ">
                                                        {item.payee}
                                                    </span>
                                                    <span className="text-[11px] text-slate-500 md:hidden">
                                                        {item.account} · {prettyDate(item.date)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Account + date (desktop) */}
                                            <div className="hidden md:flex flex-col text-sm">
                                                <span className="text-[10px] text-slate-700">{item.account}</span>
                                                <span className="text-[11px] text-slate-500">
                                                    {prettyDate(item.date)}
                                                </span>
                                            </div>

                                            {/* Amount */}
                                            <div className="text-[10px]text-sm font-semibold text-slate-900">
                                                {item.amount}
                                            </div>

                                            {/* Status + actions */}
                                            <div className="flex md:justify-end items-center gap-2">
                                                <span
                                                    className={`
                                                        
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold
                    ${item.status === 'Success'
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : item.status === 'Pending'
                                                                ? 'bg-amber-50 text-amber-700text-[10px]'
                                                                : 'bg-rose-50 text-rose-700 text-[10px]'
                                                        }
                  `}
                                                >
                                                    {item.status}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert(`Transfer to ${item.payee} of ${item.amount}`);
                                                    }}
                                                    className="text-xs text-[10px] font-semibold text-slate-700 hover:text-slate-900 hover:underline"
                                                    type="button"
                                                >
                                                    Transfer
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded details card */}
                                        {isExpanded && (
                                            <div className="mb-3 mt-1">
                                                <div className="p-3 md:p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                                                    <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <div>
                                                                    <div className="text-sm text-[10px] font-semibold text-slate-900">
                                                                        {item.payee}
                                                                    </div>
                                                                    <div className="text-xs text-[10px] text-slate-500">
                                                                        {item.account}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-[11px] text-slate-500">Date</div>
                                                                    <div className="text-xs font-semibold text-[10px] text-slate-900">
                                                                        {prettyDate(item.date)}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                                                <div>
                                                                    <div className="text-[11px] text-slate-500">Amount</div>
                                                                    <div className="font-semibold text-[10px] text-slate-900">
                                                                        {item.amount}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-[11px] text-slate-500">Reference</div>
                                                                    <div className="font-semibold text-[10px] text-slate-900">
                                                                        {item.reference}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-[11px] text-slate-500">Status</div>
                                                                    <div
                                                                        className={`
                              inline-flex mt-0.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold
                              text-[10px]
                              ${item.status === 'Success'
                                                                                ? 'bg-emerald-50 text-emerald-700 text-[10px]'
                                                                                : item.status === 'Pending'
                                                                                    ? 'bg-amber-50 text-amber-700 text-[10px]'
                                                                                    : 'bg-rose-50 text-rose-700 text-[10px]'
                                                                            }
                            `}
                                                                    >
                                                                        {item.status}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="text-xs">
                                                                <div className="text-[11px] text-slate-500">Remarks</div>
                                                                <div className="text-slate-700 text-[10px]">{item.remarks}</div>
                                                            </div>

                                                            {MOCK_BANK_INFO[item.payee] && (
                                                                <div className="text-xs">
                                                                    <div className="text-[11px] text-slate-500">
                                                                        Beneficiary bank
                                                                    </div>
                                                                    <div className="text-slate-700 text-[10px]">
                                                                        {MOCK_BANK_INFO[item.payee].bankName} ·{' '}
                                                                        {MOCK_BANK_INFO[item.payee].accountNumber} · IFSC{' '}
                                                                        {MOCK_BANK_INFO[item.payee].ifsc}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="w-full md:w-44 flex-shrink-0 flex flex-col gap-1.5">
                                                            <button
                                                                type="button"
                                                                className="w-full text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedPayee(item.payee);
                                                                    setAmount(item.amount.replace(/[^0-9.]/g, ''));
                                                                    setExpandedIndex(null);
                                                                }}
                                                            >
                                                                Quick Transfer
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="text-[10px] w-full border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    alert(`Download receipt for ${item.reference}`);
                                                                }}
                                                            >
                                                                Download Receipt
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className=" text-[10px] w-full text-[11px] text-slate-500 underline"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    alert(`Open full details for ${item.reference}`);
                                                                }}
                                                            >
                                                                View full details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer / pagination */}
                        <div className="px-4 py-2.5 bg-white border-t border-slate-100">
                            {filteredTransfers.length === 0 ? (
                                <div className="text-xs text-slate-500 text-[10px]">
                                    No recent transfers match your search.
                                </div>
                            ) : (
                                <div className="flex items-center justify-between text-xs text-slate-500 text-[10px]">
                                    <span>
                                        Showing {Math.min(visibleCount, filteredTransfers.length)} of{' '}
                                        {filteredTransfers.length}
                                    </span>
                                    {hasMore ? (
                                        <button
                                            onClick={handleShowMore}
                                            className="text-slate-800 font-semibold hover:underline text-[10px]"
                                            type="button"
                                        >
                                            Show more
                                        </button>
                                    ) : (
                                        <span className="text-slate-400 text-[10px]">End of list</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default SendFundsPanel;
