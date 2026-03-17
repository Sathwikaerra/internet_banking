import { useState, useMemo } from "react";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";

function RDFormPage({
  onNavigate,
}: {
  onNavigate: (page: string, data?: any) => void;
}) {
  /* ================= STATE ================= */

  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [showRates, setShowRates] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [success, setSuccess] = useState(false);

  const rate = 6.5; // annual %

  /* ================= MATURITY ================= */

  const maturity = useMemo(() => {
    if (!amount || !months) return "-";

    const P = Number(amount);
    const n = Number(months);
    const r = rate / 100 / 12;

    const M =
      P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    return "₹ " + M.toFixed(0);
  }, [amount, months]);

  const isValid = amount && months && acceptTerms;

  /* ================= UI ================= */

  return (
    <div className="mx-auto p-4 text-xs space-y-5">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-2 border-b pb-2">
        <button onClick={() => onNavigate("rd-open")}>
          <ArrowLeft size={16} />
        </button>

        <h2 className="text-sm font-semibold">
          Add RD Details
        </h2>
      </div>

      {/* ===== INPUT ROW ===== */}
      <div className="grid grid-cols-3 gap-4">

        {/* MONTHLY AMOUNT */}
        <div className="space-y-1">
          <p className="font-medium">
            Monthly Deposit *
          </p>

          <input
            className="input h-7 w-full"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
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
          <p className="font-medium">
            Tenure (Months) *
          </p>

          <input
            className="input h-7 w-full"
            placeholder="Months"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>

      </div>

      {/* ===== TERMS + SUMMARY ===== */}
      <div className="flex justify-between items-center">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() =>
              setAcceptTerms(!acceptTerms)
            }
          />
          I accept Terms & Conditions
        </label>

        {/* SUMMARY CARD */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2">

          <p className="text-[10px] text-slate-500">
            Interest Rate
          </p>

          <p className="font-semibold">
            {rate}% p.a
          </p>

          <p className="text-[10px] text-slate-500 mt-1">
            Maturity Amount
          </p>

          <p className="font-semibold">
            {maturity}
          </p>

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
        Book RD
      </button>

      {/* ===== PANELS ===== */}

      {showReview && (
        <ReviewPanel
          amount={amount}
          months={months}
          maturity={maturity}
          rate={rate}
          onClose={() => setShowReview(false)}
          onConfirm={() => {
            setShowReview(false);
            setSuccess(true);
          }}
        />
      )}

      {success && (
        <SuccessPanel
          amount={amount}
          months={months}
          maturity={maturity}
          rate={rate}
          onDone={() => {
            setSuccess(false);

            onNavigate("deposit", {
              type: "RD",
              amount: Number(amount),
            });
          }}
        />
      )}

    </div>
  );
}

export default RDFormPage;

/* ================= REVIEW PANEL ================= */

function ReviewPanel({
  amount,
  months,
  maturity,
  rate,
  onClose,
  onConfirm,
}: any) {
  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l p-4 z-50 mt-28">

      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">
          Confirm RD Details
        </h3>

        <button onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <InfoRow
        label="Monthly Deposit"
        value={`₹ ${amount}`}
      />

      <InfoRow
        label="Tenure"
        value={`${months} Months`}
      />

      <InfoRow
        label="Interest Rate"
        value={`${rate}%`}
      />

      <InfoRow
        label="Maturity Amount"
        value={maturity}
      />

    
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

/* ================= SUCCESS PANEL ================= */

function SuccessPanel({
  amount,
  months,
  maturity,
  rate,
  onDone,
}: any) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center">

      <div className="bg-white w-[520px] rounded-lg shadow-2xl">

        <div className="p-6 text-center">

          <div className="bg-green-100 p-4 rounded-full inline-block mb-3">
            <CheckCircle2
              size={36}
              className="text-green-600"
            />
          </div>

          <h2 className="text-xl font-semibold">
            RD Created Successfully
          </h2>

          <p className="text-slate-600 mt-2">
            Monthly ₹ {amount} for {months} months
          </p>

        </div>

        <div className="p-4 border-t space-y-2 text-xs">

          <DetailRow
            label="Monthly Deposit"
            value={`₹ ${amount}`}
          />

          <DetailRow
            label="Tenure"
            value={`${months} Months`}
          />

          <DetailRow
            label="Interest Rate"
            value={`${rate}%`}
          />

          <DetailRow
            label="Maturity Amount"
            value={maturity}
          />

        </div>

        <div className="p-4 text-center">
          <button
            onClick={onDone}
            className="bg-yellow-500 text-black px-8 py-2 rounded-md font-medium"
          >
            Done
          </button>
        </div>

      </div>

    </div>
  );
}

/* ================= COMMON ROWS ================= */

function InfoRow({ label, value }: any) {
  return (
    <div className="flex justify-between border-b py-1 text-[11px]">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function DetailRow({ label, value }: any) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}