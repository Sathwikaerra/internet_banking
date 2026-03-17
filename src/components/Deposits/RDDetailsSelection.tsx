import { ArrowRight, ArrowLeft } from "lucide-react";

function RDDetailsSelection({
  onNavigate,
}: {
  onNavigate: (page: string, data?: any) => void;
}) {
  const handleBook = (data?: any) => {
    onNavigate("rd-form", data);
  };

  return (
    <div className="mx-auto p-3 text-sm space-y-4">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-2 border-b pb-2">

        <button
          onClick={() => onNavigate("deposit")}
          className="p-2 rounded hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>

        <h2 className="text-md font-medium">
          Recurring Deposit
        </h2>

      </div>

      {/* ===== JUST FOR YOU ===== */}
      
      <SectionTitle title="Recommended Plans" />

      <div className="grid md:grid-cols-2 gap-4">

        <OfferCard
          amount="₹ 1,000 / month"
          rate="6.5%"
          tenure="12 Months"
          maturity="₹ 12,720"
          onClick={() =>
            handleBook({ amount: 1000, months: 12 })
          }
        />

        <OfferCard
          amount="₹ 2,000 / month"
          rate="6.5%"
          tenure="24 Months"
          maturity="₹ 52,480"
          onClick={() =>
            handleBook({ amount: 2000, months: 24 })
          }
        />

      </div>

      {/* ===== TENURE OPTIONS ===== */}
      <SectionTitle title="Tenure Options" />

      <div className="grid md:grid-cols-3 gap-4">

        <PlanCard
          tag="★ Popular"
          tenure="12 MONTHS"
          rate="6.5%"
          onClick={() => handleBook({ months: 12 })}
        />

        <PlanCard
          tag="★ Long Term"
          tenure="36 MONTHS"
          rate="6.5%"
          onClick={() => handleBook({ months: 36 })}
        />

        <CustomCard onClick={() => handleBook()} />

      </div>

    </div>
  );
}

export default RDDetailsSelection;

/* ===== SAME COMPONENTS REUSED ===== */

function SectionTitle({ title }: any) {
  return (
    <p className="text-yellow-600 font-medium">
      ★ {title}
    </p>
  );
}

function OfferCard({ amount, rate, tenure, maturity, onClick }: any) {
  return (
    <div className="border rounded-lg p-3 space-y-2 bg-slate-50">

      <div className="flex justify-between items-center">

        <p className="text-yellow-600 font-medium">
          ★ Recommended
        </p>

        <button
          onClick={onClick}
          className="bg-yellow-500 hover:bg-yellow-300 px-4 py-2 rounded-md flex items-center gap-2 font-medium"
        >
          Start RD <ArrowRight size={16} />
        </button>

      </div>

      <p className="font-semibold text-xs">
        {amount} @ {rate} for {tenure}
      </p>

      <p className="text-xs text-slate-600">
        MATURITY — {maturity}
      </p>

      <p className="text-xs text-slate-600">
        Auto debit from savings account
      </p>

    </div>
  );
}

function PlanCard({ tag, tenure, rate, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 cursor-pointer flex justify-between bg-white hover:shadow-sm"
    >
      <div>
        <p className="text-yellow-600 font-medium mb-1">
          {tag}
        </p>

        <p className="text-slate-500">{tenure}</p>

        <p className="font-semibold text-lg">
          {rate}
        </p>
      </div>

      <ArrowRight size={18} className="text-red-700" />
    </div>
  );
}

function CustomCard({ onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="border border-pink-200 rounded-lg p-4 cursor-pointer flex justify-between bg-pink-50 hover:shadow-sm"
    >
      <p className="text-slate-600">
        Enter Your Own Tenure
      </p>

      <ArrowRight size={18} className="text-red-700" />
    </div>
  );
}