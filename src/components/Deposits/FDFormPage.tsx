

import { useState, useMemo } from "react";
import { ArrowLeft, X } from "lucide-react";
import { CheckCircle2 } from "lucide-react";


function FDFormPage({ onNavigate }: { onNavigate: (page: string, data?: any) =>  void }) {
  /* ================= STATE ================= */

  const [amount, setAmount] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");

  const [interestType, setInterestType] = useState("maturity");
  const [reinvest, setReinvest] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [showRates, setShowRates] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [success, setSuccess] = useState(false);

  const rate = 6.45;
  const balance = 18727.96;

  /* ================= MATURITY ================= */

  const maturity = useMemo(() => {
    if (!amount || (!years && !months && !days)) return "-";

    const p = Number(amount);
    const t =
      Number(years || 0) +
      Number(months || 0) / 12 +
      Number(days || 0) / 365;

    const m = p * Math.pow(1 + rate / 100, t);

    return "₹ " + m.toFixed(0);
  }, [amount, years, months, days]);

  const isValid =
    amount && (years || months || days) && acceptTerms;

  const quickAmounts = [1000, 10000, 100000];

  const period = `${years || 0}Y ${months || 0}M ${days || 0}D`;

  /* ================= UI ================= */

  return (
    <div className="mx-auto p-4 text-xs space-y-5">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-2 border-b pb-2">
        <button onClick={() => onNavigate("fd-open")}>
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-sm font-semibold">Add FD Details</h2>
      </div>

    
      {/* ===== THREE FIELDS ROW ===== */}
      <div className="grid grid-cols-3 gap-4">

        {/* AMOUNT */}
        <div className="space-y-1">
          <p className="font-medium">Deposit Amount *</p>
          {/* <p className="text-[10px] text-slate-500">
            Balance ₹{balance.toLocaleString()}
          </p> */}

          <input
            className="input h-7 w-full"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex gap-1 mt-1">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(String(amt))}
                className="border px-2 py-[2px] rounded text-[10px]"
              >
                ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* NOMINEE */}
                 <div className="space-y-1">
          <p className="font-medium">Nominee</p>
          <select className="input h-7 w-full">
            <option>SURYA PRAKASA RAO</option>
          </select>
        </div>

        {/* TENURE */}
        <div className="space-y-1">
          <p className="font-medium">Tenure *</p>

          <div className="grid grid-cols-3 gap-1">
            <input className="input h-7" placeholder="Y" value={years}
              onChange={(e) => setYears(e.target.value)} />
            <input className="input h-7" placeholder="M" value={months}
              onChange={(e) => setMonths(e.target.value)} />
            <input className="input h-7" placeholder="D" value={days}
              onChange={(e) => setDays(e.target.value)} />
          </div>
        </div>

      </div>

     {/* ===== INTEREST TYPE + REINVEST (ONE ROW) ===== */}
<div className="flex items-end gap-48">

  {/* INTEREST PAYABLE */}
  <div>
    <p className="font-medium mb-1">Interest Payable *</p>

    <div className="flex gap-4 text-[11px]">
      {["maturity", "monthly", "quarterly"].map((t) => (
        <label key={t} className="flex items-center gap-1">
          <input
            type="radio"
            checked={interestType === t}
            onChange={() => setInterestType(t)}
          />
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </label>
      ))}
    </div>
  </div>

  {/* REINVEST TOGGLE */}
  <Toggle
    label="Re-invest after maturity"
    value={reinvest}
    onChange={setReinvest}
  />

</div>

   {/* ===== 3 ITEMS IN ONE ROW ===== */}
<div className="flex items-center justify-between gap-4">

 
  {/* ===== CENTER — TERMS + RATES ===== */}
  <div className="flex items-center gap-4 text-[11px]">

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={acceptTerms}
        onChange={() => setAcceptTerms(!acceptTerms)}
      />
      I accept Terms & Conditions
    </label>

    <button
      onClick={() => setShowRates(true)}
      className="text-yellow-600 font-medium underline whitespace-nowrap"
    >
      View Interest Rates
    </button>

  </div>

  {/* ===== RIGHT — SUMMARY CARD ===== */}
  <div className="ml-auto">

    <div className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2 shadow-sm">

      <div>
        <p className="text-[10px] text-slate-500 mb-1">
          Interest Rate
        </p>

        <span className="bg-yellow-500 text-black px-2 py-[2px] rounded text-[11px] font-semibold">
          {rate}% p.a
        </span>
      </div>

      <div className="text-right">
        <p className="text-[10px] text-slate-500 mb-1">
          Maturity Amount
        </p>

        <p className="font-semibold text-sm">
          {maturity}
        </p>
      </div>

    </div>

  </div>

</div>

      {/* ===== BOOK BUTTON ===== */}
      <button
        disabled={!isValid}
        onClick={() => setShowReview(true)}
        className={`w-full py-2 rounded-md font-medium ${
          isValid
            ? "bg-yellow-500 text-black"
            : "bg-gray-300 text-white"
        }`}
      >
        Book FD
      </button>



      {/* ===== PANELS ===== */}
      {showRates && <RatesPanel onClose={() => setShowRates(false)} />}

      {showReview && (
        <ReviewPanel
          data={{ amount, period, rate, maturity, interestType, reinvest }}
          onClose={() => setShowReview(false)}
          onEdit={() => setShowReview(false)}
          onConfirm={() => {
            setShowReview(false);
            setSuccess(true);
          }}
        />
      )}

{success && (
  <SuccessPanel
    onDone={() => {
      setSuccess(false);

      onNavigate("deposit", {
        type: "FD",
        amount: Number(amount),
        maturity,
        period,
        rate,
      });
    }}
  />
)}
    </div>
  );
}

export default FDFormPage;


function RatesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed top-0 right-0 h-full w-72 mt-30 bg-white shadow-2xl border-l p-4 z-50 space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold text-yellow-600">Interest Rates</h3>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <table className="w-full text-[11px] border">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2 border">Tenure</th>
            <th className="p-2 border">Rate</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2 border text-center">7 — 45 days</td>
            <td className="p-2 border text-center text-red-600">3.5%</td>
          </tr>

          <tr>
            <td className="p-2 border text-center">6 months — 1 year</td>
            <td className="p-2 border text-center text-red-600">6.25%</td>
          </tr>

          <tr>
            <td className="p-2 border text-center">1 — 5 years</td>
            <td className="p-2 border text-center text-red-600">6.45%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ReviewPanel({ data, onClose, onEdit, onConfirm }: any) {
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l p-4 z-50 space-y-4 mt-28 overflow-y-auto">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Confirm FD Details</h3>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* ================= DEPOSIT DETAILS ================= */}
      <div className="space-y-2">

        <h4 className="font-semibold text-[12px] text-slate-700">
          Deposit Details
        </h4>

        <InfoRow label="Deposit Amount" value={`₹ ${data.amount}`} />
        <InfoRow label="Deposit Period" value={data.period} />
        <InfoRow label="Interest Rate" value={`${data.rate}%`} />
        <InfoRow label="Interest Payable" value={data.interestType} />
        <InfoRow label="Maturity Amount" value={data.maturity} />
        <InfoRow label="Reinvest After Maturity" value={data.reinvest ? "Yes" : "No"} />

      </div>

      {/* ================= BANK DETAILS ================= */}
      <div className="space-y-2 pt-3 border-t">

        <h4 className="font-semibold text-[12px] text-slate-700">
          Bank Details
        </h4>

        <InfoRow
          label="Account Holder"
          value="NEMANI SHANMUKH"
        />

        <InfoRow
          label="Account Number"
          value="XXXX XXXX 5187"
        />

        <InfoRow
          label="Account Type"
          value="Savings Account"
        />

        {/* <InfoRow
          label="Branch"
          value="Hyderabad Main Branch"
        /> */}

      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-2 pt-4">

        <button
          onClick={onEdit}
          className="flex-1 border border-slate-300 py-2 rounded-md text-slate-700 hover:bg-slate-50"
        >
          Edit details
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 bg-red-700 text-white py-2 rounded-md hover:bg-red-800"
        >
          Confirm FD
        </button>

      </div>

    </div>
  );
}
function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between border-b pb-1 text-[11px]">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
function SuccessPanel({ onDone }: any) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center">

      {/* MAIN CARD */}
      <div className="bg-white w-[550px] h-[550px] rounded-lg shadow-2xl flex flex-col overflow-hidden">

        {/* ===== TOP SUCCESS SECTION (FIXED) ===== */}
        <div className="bg-gray-50 p-6 text-center shrink-0">

          <div className="flex flex-col items-center gap-3">

            <div className="flex items-center gap-5">
              <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 size={36} className="text-green-600" />
            </div>

            <h2 className="text-xl font-semibold">
              Congratulations!
            </h2>

            </div>
            <p className="text-slate-600 text-sm">
              YOU HAVE SUCCESSFULLY INVESTED ₹ 500 IN RD
            </p>

            <p className="text-xs text-slate-400">
              11 Mar 2026 04:34 PM
            </p>

          </div>
        </div>

        {/* ===== SCROLLABLE DETAILS AREA ===== */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-4
            space-y-4
            scrollbar-hide
          "
        >
          {/* <h3 className="font-semibold text-lg">RD Details</h3> */}

          <div className="space-y-3 text-xs">

            <DetailRow label="RD NUMBER" value="926050059508825" />
            <DetailRow label="MONTHLY DEPOSIT AMOUNT" value="₹ 500" />
            <DetailRow label="MATURITY AMOUNT" value="₹ 3,049" />
            <DetailRow label="START DATE" value="11 Mar 2026" />
            <DetailRow label="MATURITY DATE" value="11 Sep 2026" />
            <DetailRow label="RD TENURE" value="6 Months" />
            <DetailRow label="INTEREST RATE" value="5.50%" />
            <DetailRow label="DATE OF INSTALLMENT" value="1st of each month" />

          </div>

          {/* NOTE */}
          <div className="flex items-start gap-2 text-xs text-slate-600 pt-2 border-t">
            <span>📄</span>
            Deposit Advice will be sent to registered mail ID within next working day
          </div>
        </div>

        {/* ===== FIXED FOOTER BUTTON ===== */}
        <div className="p-4 border-t shrink-0 text-center">

         <button
  onClick={onDone}
            className="bg-yellow-200 hover:bg-yellow-500 text-black px-8 py-2 rounded-md font-medium"
          >
            Done
          </button>

        </div>

      </div>

    </div>
  );
}


/* ===== REUSABLE ROW ===== */

function DetailRow({ label, value }: any) {
  return (
    <div className="flex justify-between border-b pb-1">

      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-medium text-right">
        {value}
      </span>

    </div>
  );
}

function Toggle({ label, value, onChange }: any) {
  return (
    <div className="flex gap-4 items-center">
      <p className="font-medium">{label}</p>

      <button
        onClick={() => onChange(!value)}
        className={`w-9 h-4 rounded-full relative ${
          value ? "bg-yellow-300" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-3 h-3 bg-white rounded-full absolute top-0.5 ${
            value ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}