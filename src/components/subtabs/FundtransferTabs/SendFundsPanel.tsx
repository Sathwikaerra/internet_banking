

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
    {
      payee: "John Carter",
      account: "XXXX 3321",
      amount: "$1,250.00",
      status: "Success",
    },
    {
      payee: "Acme Corp",
      account: "XXXX 1198",
      amount: "$3,450.00",
      status: "Pending",
    },
    {
      payee: "Lisa Wong",
      account: "XXXX 7744",
      amount: "$980.50",
      status: "Failed",
    },
    {
      payee: "Global Supplies",
      account: "XXXX 8877",
      amount: "$2,100.00",
      status: "Success",
    },
    {
      payee: "Rent Co",
      account: "XXXX 4455",
      amount: "$950.00",
      status: "Success",
    },
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

const SendFundsPanel: React.FC<SendFundsPanelProps> = ({
  search,
  setSearch,
}) => {
  const allTransfers = useMemo(() => makeMockTransfers(), []);
  const payees = useMemo(
    () =>
      Array.from(new Set(allTransfers.map((t) => t.payee)).add("New Payee")),
    [allTransfers],
  );

  const [fromAccount, setFromAccount] = useState("Savings - XXXX 2020");
  const [selectedPayee, setSelectedPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [transferType, setTransferType] = useState<
    "IMPS" | "NEFT" | "RTGS" | "Internal">("IMPS");
  const [schedule, setSchedule] = useState<"Now" | "Later">("Now");
  const [scheduledDate, setScheduledDate] = useState<string>("");

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);

  const [visibleCount, setVisibleCount] = useState<number>(CHUNK);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [tableSearch, setTableSearch] = useState("");
  const [toast, setToast] = useState<{ id: number; message: string } | null>(
    null,
  );

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
      (t) =>
        t.payee.toLowerCase().includes(q) ||
        t.account.toLowerCase().includes(q),
    );
  }, [allTransfers, tableSearch]);

  const visibleTransfers = filteredTransfers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransfers.length;

  
// OTP Sta
const [showOtpModal, setShowOtpModal] = useState(false);
const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
const [otpTimer, setOtpTimer] = useState(90);
const [otpVerified, setOtpVerified] = useState(false);

React.useEffect(() => {
  if (!showOtpModal) return;

  if (otpTimer <= 0) return;

  const interval = setInterval(() => {
    setOtpTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [showOtpModal, otpTimer]);
const handleOtpChange = (value: string, index: number) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // Auto focus next
  if (value && index < 5) {
    const next = document.getElementById(`otp-${index + 1}`);
    next?.focus();
  }
};

const verifyOtp = () => {
  const enteredOtp = otp.join("");

  // Demo correct OTP
  if (enteredOtp === "123456") {
    setOtpVerified(true);

    setTimeout(() => {
      setShowOtpModal(false);

      setToast({
        id: Date.now(),
        message: `Transfer Successful to ${selectedPayee}`,
      });

      // reset form
      setAmount("");
      setRemarks("");
      setSchedule("Now");
      setScheduledDate("");
    }, 1500);
  } else {
    alert("Invalid OTP. Try 123456 (Demo)");
  }
};

const resendOtp = () => {
  setOtp(["", "", "", "", "", ""]);
  setOtpTimer(90);
};

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
      if (!bankDetails || !bankDetails.bankName)
        next.bankName = "Bank name is required.";
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
  const maskAccountNumber = (acc?: string) => {
    if (!acc) return "";
    const last4 = acc.slice(-4);
    return `XXXX XXXX ${last4}`;
  };
const handleSend = () => {
  if (!validateAll()) return;

  // Instead of final success → open OTP modal
  setShowOtpModal(true);
  setOtp(["", "", "", "", "", ""]);
  setOtpTimer(90);
  setOtpVerified(false);
};


  const handleShowMore = () => {
    setVisibleCount((s) => Math.min(filteredTransfers.length, s + CHUNK));
  };

  const toggleExpandByVisibleIndex = (visibleIdx: number) => {
    setExpandedIndex((cur) => (cur === visibleIdx ? null : visibleIdx));
  };

  return (
    <>
      {/* Send money + bank card */}
      <div className=" px-3 py-3 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

  {/* ================= LEFT SIDE - FORM ================= */}
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
          px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2
          focus:ring-slate-200 transition text-[10px]"
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
          px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2
          focus:ring-slate-200 transition text-[10px]"
        >
          <option value="">Choose a payee</option>
          {payees.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="text-[10px] block text-xs font-semibold text-slate-700 mb-1.5">
          Amount (USD)
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
          px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 text-[10px]"
        />
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
              className={`px-3 py-1.5 rounded-full border text-xs
                ${transferType === type
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 border-slate-200"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-[10px]">
          Remarks (optional)
        </label>
        <input
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Payment reason or notes"
          className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50/70
          px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 text-[10px]"
        />
      </div>

      {/* Schedule */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-[10px]">
          Schedule
        </label>

        <div className="flex gap-4 text-xs">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              checked={schedule === "Now"}
              onChange={() => setSchedule("Now")}
            />
            <span>Now</span>
          </label>

          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              checked={schedule === "Later"}
              onChange={() => setSchedule("Later")}
            />
            <span>Later</span>
          </label>
        </div>

        {schedule === "Later" && (
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="mt-2 w-full h-11 rounded-xl border border-slate-200
            bg-slate-50/70 px-3.5 text-sm focus:outline-none focus:ring-2
            focus:ring-slate-200 text-[10px]"
          />
        )}
      </div>

    </div>

    {/* Transfer Type Extra Fields */}
    <div className="mt-4">
      {transferType === "NEFT" && (
        <input
          value={neftPurpose}
          onChange={(e) => setNeftPurpose(e.target.value)}
          placeholder="Purpose for NEFT transfer"
          className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px]"
        />
      )}
    </div>

  </div>

  {/* ================= RIGHT SIDE - PAYEE DETAILS ================= */}
 {/* ================= RIGHT SIDE - PAYEE DETAILS ================= */}
<div>
  {selectedPayee && bankDetails && (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm 
    hover:shadow-md transition-all duration-300 p-6 space-y-5">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-slate-500">
            Beneficiary Details
          </p>
          <h4 className="text-[13px] font-semibold text-slate-900 mt-1">
            {selectedPayee}
          </h4>
        </div>

        {/* ✅ Verified Badge */}
        <div className="flex items-center gap-1 px-3 py-1 rounded-full 
        bg-emerald-50 text-emerald-600 text-[10px] font-semibold">

          {/* Check Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>

          Verified
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100"></div>

      {/* Details */}
      <div className="space-y-4 text-[11px]">

        {/* Account */}
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Account Number</span>
          <span className="font-semibold text-slate-900 tracking-wider">
            {maskAccountNumber(bankDetails.accountNumber)}
          </span>
        </div>

        {/* IFSC */}
        <div className="flex justify-between items-center">
          <span className="text-slate-500">IFSC Code</span>
          <span className="font-semibold text-slate-900">
            {bankDetails.ifsc}
          </span>
        </div>

        {/* Bank */}
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Bank Name</span>
          <span className="font-semibold text-slate-900 text-right">
            {bankDetails.bankName}
            {bankDetails.branch ? ` · ${bankDetails.branch}` : ""}
          </span>
        </div>

      </div>

      {/* Bottom subtle note */}
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[9px] text-slate-400">
          Beneficiary details verified and securely stored.
        </p>
      </div>

    </div>
  )}
</div>
</div>
        {/* Bottom note + actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center  gap-3 pt-2 border-t border-slate-100">
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
      {/* ================= OTP MODAL ================= */}
{showOtpModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6">

      <h3 className="text-lg font-semibold text-slate-900 text-center">
        Enter OTP
      </h3>

      <p className="text-xs text-slate-500 text-center">
        OTP sent to your registered mobile number
      </p>

      {/* OTP Boxes */}
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, index)}
            className="w-12 h-12 text-center border rounded-lg text-lg font-semibold
            focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        ))}
      </div>

      {/* Timer */}
      <div className="text-center text-sm text-slate-500">
        {otpTimer > 0 ? (
<span
  className={`font-semibold ${
    otpTimer > 30
      ? "text-emerald-600"
      : otpTimer > 10
      ? "text-amber-500"
      : "text-rose-600"
  }`}
>
  Expires in {otpTimer}s
</span>
        ) : (
          <span className="text-red-500">OTP Expired</span>
        )}
      </div>

      {/* Resend */}
      {otpTimer === 0 && (
        <div className="text-center">
          <button
            onClick={resendOtp}
            className="text-sm text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      )}

      {/* Verify Button */}
      <button
        onClick={verifyOtp}
        className={`w-full py-2 rounded-xl font-semibold transition
        ${
          otpVerified
            ? "bg-emerald-600 text-white"
            : "bg-slate-900 text-white hover:bg-slate-800"
        }`}
      >
        {otpVerified ? "OTP Verified ✓" : "Verify OTP"}
      </button>

    </div>
  </div>
)}

    </>
  );
};

export default SendFundsPanel;
