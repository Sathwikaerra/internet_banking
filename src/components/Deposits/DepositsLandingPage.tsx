// import { useState } from "react";
// import {
//   Landmark,
//   CalendarClock,
//   ArrowRight,
//   Wallet,
//   ShieldCheck,
//   RotateCcw,
//   CheckCircle2,
// } from "lucide-react";

// type DepositType = "FD" | "RD";

// export default function DepositsLanding({
//   onNavigate,
// }: {
//   onNavigate: (page: string) => void;
// }) {
//   const [activeTab, setActiveTab] = useState<DepositType>("FD");
// const hasFD = newDeposit?.type === "FD";
// const hasRD = newDeposit?.type === "RD";
//   const handleNewDeposit = () => {
//     onNavigate(activeTab === "FD" ? "fd-open" : "rd-open");
//   };
// {page === "deposits-landing" && (
//   <DepositsLanding
//     onNavigate={handleNavigate}
//     newDeposit={depositData}
//   />
// )}
// export default function DepositsLanding({
//   onNavigate,
//   newDeposit,
// }: {
//   onNavigate: (page: string) => void;
//   newDeposit?: any;
// })
//   return (
//     <div className="mx-auto p-2 text-xs space-y-4 mt-4">

//       {/* ===== SUMMARY ===== */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border rounded-lg p-4">

//         <StatCard title="TOTAL DEPOSITS" value="₹ 500.00" icon={<Wallet size={14} />} />
//         // <StatCard title="TOTAL FD" value="-" icon={<Landmark size={14} />} />
//         <StatCard
//   title="TOTAL FD"
//   value={hasFD ? `₹ ${newDeposit.amount}` : "-"}
//   icon={<Landmark size={14} />}
// />
// <StatCard
//   title="TOTAL RD"
//   value={hasRD ? `₹ ${newDeposit.amount}` : "-"}
//   icon={<CalendarClock size={14} />}
// />        <StatCard title="TOTAL TSD" value="-" icon={<ShieldCheck size={14} />} />

//       </div>

//       {/* ===== TABS ===== */}
//       <div className="flex gap-8 border-b">

//         <TabButton
//           label="Fixed Deposit"
//           active={activeTab === "FD"}
//           onClick={() => setActiveTab("FD")}
//         />

//         <TabButton
//           label="Recurring Deposit"
//           active={activeTab === "RD"}
//           onClick={() => setActiveTab("RD")}
//         />

//       </div>

//       {/* ===== CONTENT ===== */}
//       {activeTab === "FD"
//         ? <FDInfoCard />
//         : hasRD
//           ? <RDDetails />
//           : <EmptyState text="No Recurring Deposits" />}

//       {/* ===== DEPOSIT BUTTON ===== */}
//       <div className="flex justify-center">

//         <button
//           onClick={handleNewDeposit}
//           className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full flex items-center gap-2 shadow-md font-medium"
//         >
//           <span className="text-lg">+</span>
//           New Deposit
//         </button>

//       </div>

//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function TabButton({ label, active, onClick }: any) {
//   return (
//     <button
//       onClick={onClick}
//       className={`pb-2 font-medium ${
//         active
//           ? "border-b-2 border-yellow-500 text-black"
//           : "text-slate-500"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// /* ===== STAT CARD ===== */

// function StatCard({ title, value, icon }: any) {
//   return (
//     <div className="bg-white border rounded-lg p-3 shadow-sm flex justify-between">
//       <div>
//         <p className="text-[10px] text-slate-500">{title}</p>
//         <p className="text-sm font-semibold text-black">{value}</p>
//       </div>

//       <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
//         {icon}
//       </div>
//     </div>
//   );
// }

// /* ===== FD INFO (NO FD EXISTS) ===== */

// function FDInfoCard() {
//   return (
//     <div className="bg-slate-50 border rounded-lg p-5 space-y-3">

//       <div className="flex justify-between items-start">

//         <h3 className="text-sm font-semibold text-black max-w-xl">
//            Bank's Fixed Deposit helps you build your savings
//           through systematic deposits, every month
//         </h3>

//         <RotateCcw size={18} className="text-slate-500" />

//       </div>

//       <p className="font-medium text-slate-700">Key Highlights</p>

//       <Highlight text="Flexible tenure from 7 days to 10 years" />
//       <Highlight text="Assured returns to reach your financial goals" />
//       <Highlight text="Minimum Amount of Rs.5000 and in multiples of 100" />

//     </div>
//   );
// }

// /* ===== RD DETAILS ===== */

// function RDDetails() {
//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-4 flex justify-between items-center">

//       <div className="space-y-1">

//         <p className="font-semibold text-sm text-black">
//           926050059508825
//         </p>

//         <p className="text-slate-500">
//           ₹ 500.00 @ 6.5%
//         </p>

//         <div className="flex gap-8 pt-2">

//           <div>
//             <p className="text-[10px] text-slate-500 uppercase">
//               Maturity Amount
//             </p>

//             <p className="font-semibold text-black">
//               ₹ 3,049.00
//             </p>
//           </div>

//           <div>
//             <p className="text-[10px] text-slate-500 uppercase">
//               Maturity Date
//             </p>

//             <p className="font-semibold text-black">
//               11 Sep 26
//             </p>
//           </div>

//         </div>

//       </div>

//       <ArrowRight size={18} className="text-yellow-600" />

//     </div>
//   );
// }

// /* ===== EMPTY STATE ===== */

// function EmptyState({ text }: any) {
//   return (
//     <div className="bg-slate-50 border rounded-lg p-6 text-center text-slate-500">
//       {text}
//     </div>
//   );
// }

// /* ===== HIGHLIGHT ITEM ===== */

// function Highlight({ text }: any) {
//   return (
//     <div className="flex items-center gap-2 text-slate-700">
//       <CheckCircle2 size={14} className="text-green-600" />
//       {text}
//     </div>
//   );
// }


import { useState } from "react";
import {
  Landmark,
  CalendarClock,
  ArrowRight,
  Wallet,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

type DepositType = "FD" | "RD";

export default function DepositsLanding({
  onNavigate,
  newDeposit,
}: {
  onNavigate: (page: string) => void;
  newDeposit?: {
    type: DepositType;
    amount: number;
  };
}) {
  const [activeTab, setActiveTab] = useState<DepositType>("FD");

  const hasFD = newDeposit?.type === "FD";
  const hasRD = newDeposit?.type === "RD";

  const totalFD = hasFD ? `₹ ${newDeposit?.amount}` : "-";
  const totalRD = hasRD ? `₹ ${newDeposit?.amount}` : "-";

  const totalDeposits =
    hasFD || hasRD ? `₹ ${newDeposit?.amount}` : "-";

  const handleNewDeposit = () => {
    onNavigate(activeTab === "FD" ? "fd-open" : "rd-open");
  };

  return (
    <div className="mx-auto p-2 text-xs space-y-4 mt-4">

      {/* ===== SUMMARY ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 border rounded-lg p-4">

        <StatCard
          title="TOTAL DEPOSITS"
          value={totalDeposits}
          icon={<Wallet size={14} />}
        />

        <StatCard
          title="TOTAL FD"
          value={totalFD}
          icon={<Landmark size={14} />}
        />

        <StatCard
          title="TOTAL RD"
          value={totalRD}
          icon={<CalendarClock size={14} />}
        />

        <StatCard
          title="TOTAL TSD"
          value="-"
          icon={<ShieldCheck size={14} />}
        />

      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-8 border-b">

        <TabButton
          label="Fixed Deposit"
          active={activeTab === "FD"}
          onClick={() => setActiveTab("FD")}
        />

        <TabButton
          label="Recurring Deposit"
          active={activeTab === "RD"}
          onClick={() => setActiveTab("RD")}
        />

      </div>

      {/* ===== CONTENT ===== */}
      {activeTab === "FD" ? (
        hasFD ? (
          <FDDetails amount={newDeposit?.amount} />
        ) : (
          <FDInfoCard />
        )
      ) : hasRD ? (
        <RDDetails amount={newDeposit?.amount} />
      ) : (
          <RDInfoCard />
      )}

      {/* ===== NEW DEPOSIT BUTTON ===== */}
      <div className="flex justify-center">

        <button
          onClick={handleNewDeposit}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-full flex items-center gap-2 shadow-md font-medium"
        >
          <span className="text-lg">+</span>
          New Deposit
        </button>

      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function TabButton({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 font-medium ${
        active
          ? "border-b-2 border-yellow-500 text-black"
          : "text-slate-500"
      }`}
    >
      {label}
    </button>
  );
}

/* ===== STAT CARD ===== */

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white border rounded-lg p-3 shadow-sm flex justify-between">
      <div>
        <p className="text-[10px] text-slate-500">{title}</p>
        <p className="text-sm font-semibold text-black">{value}</p>
      </div>

      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
        {icon}
      </div>
    </div>
  );
}

/* ===== FD DETAILS (WHEN FD EXISTS) ===== */

function FDDetails({ amount }: any) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm">FD Account</p>
        <p className="text-slate-500">Amount: ₹ {amount}</p>
      </div>

      <ArrowRight size={18} className="text-yellow-600" />
    </div>
  );
}

/* ===== FD INFO (NO FD) ===== */

function FDInfoCard() {
  return (
    <div className="bg-slate-50 border rounded-lg p-5 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-black max-w-xl">
          Bank's Fixed Deposit helps you build savings through systematic deposits
        </h3>
        <RotateCcw size={18} className="text-slate-500" />
      </div>

      <p className="font-medium text-slate-700">Key Highlights</p>

      <Highlight text="Flexible tenure from 7 days to 10 years" />
      <Highlight text="Assured returns to reach your goals" />
      <Highlight text="Minimum Amount Rs.5000" />
    </div>
  );
}


// RD info card

function RDInfoCard() {
  return (
    <div className="bg-slate-50 border rounded-lg p-5 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-black max-w-xl">
          Bank's Recurring Deposit helps you build savings through systematic deposits
        </h3>
        <RotateCcw size={18} className="text-slate-500" />
      </div>

      <p className="font-medium text-slate-700">Key Highlights</p>

      <Highlight text="Flexible tenure from 7 days to 10 years" />
      <Highlight text="Assured returns to reach your goals" />
      <Highlight text="Minimum Amount Rs.5000" />
    </div>
  );
}


/* ===== RD DETAILS ===== */

function RDDetails({ amount }: any) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm">RD Account</p>
        <p className="text-slate-500">Monthly: ₹ {amount}</p>
      </div>

      <ArrowRight size={18} className="text-yellow-600" />
    </div>
  );
}

/* ===== EMPTY STATE ===== */

function EmptyState({ text }: any) {
  return (
    <div className="bg-slate-50 border rounded-lg p-6 text-center text-slate-500">
      {text}
    </div>
  );
}

/* ===== HIGHLIGHT ===== */

function Highlight({ text }: any) {
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <CheckCircle2 size={14} className="text-green-600" />
      {text}
    </div>
  );
}