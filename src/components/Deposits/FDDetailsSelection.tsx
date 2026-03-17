import { ArrowRight, ArrowLeft } from "lucide-react";

function FDDetailsSelection({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  const handleBook = () => {
    onNavigate("fd-form");
  };

  return (
    <div className="mx-auto p-3 text-sm space-y-4">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-2 border-b ">

        <button
          onClick={() => onNavigate("deposit")}
          className="p-2 rounded hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>

        <h2 className="text-md text-[#1F2937] font-medium">
          Fixed Deposit
        </h2>

      </div>

      {/* ===== JUST FOR YOU SECTION ===== */}
      <div className="bg-[#F7F7F7] border border-[#E5E7EB] rounded-lg p-3">

        <div className="grid md:grid-cols-2 gap-4">

          {/* ---- CARD 1 ---- */}
          <div className="bg-[#F7F7F7] border border-[#E5E7EB] rounded-lg p-3 space-y-2">

       <div className="flex justify-between items-center">

  <p className="text-yellow-600 font-medium">
    ★ Just For You
  </p>

  <button
    onClick={handleBook}
    className="bg-yellow-500 hover:bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium"
  >
    Book FD
    <ArrowRight size={16} />
  </button>

</div>
            <p className="font-semibold text-[#1F2937] text-xs">
              ₹ 14,000.00 @ 6.45% for 1 Year 3 Months
            </p>

            <p className="text-[#6B7280] text-xs">
              MATURITY AMOUNT — ₹ 15,168.00
            </p>

            <p className="text-[#6B7280] text-xs">
              ON MATURITY — Auto-Renew
            </p>

            <p className="text-[#6B7280] text-xs">
              NOMINEE — SURYA PRAKASA RAO
            </p>

          

            <p className="text-xs text-[#6B7280]">
              By clicking on "Book FD" I accept the{" "}
              <span className="text-red-600">
                Terms & Conditions
              </span>
            </p>

          </div>

          {/* ---- CARD 2 ---- */}
          <div className="bg-[#F7F7F7] border border-[#E5E7EB] rounded-lg p-3 space-y-2">
       <div className="flex justify-between items-center">

            <p className="text-yellow-600 font-medium">
              ★ Just For You
            </p>
    <button
              onClick={handleBook}
              className="bg-yellow-500 hover:bg-yellow-300 text-black px-4 py-2 rounded-md flex items-center gap-2 font-medium mt-2"
            >
              Book FD
              <ArrowRight size={16} />
            </button>
            </div>
            <p className="font-semibold text-[#1F2937] text-xs">
              ₹ 25,000.00 @ 6.65% for 2 Years
            </p>

            <p className="text-[#6B7280] text-xs">
              MATURITY AMOUNT — ₹ 28,325.00
            </p>

            <p className="text-[#6B7280] text-xs">
              ON MATURITY — Auto-Renew
            </p>

            <p className="text-[#6B7280] text-xs">
              NOMINEE — SURYA PRAKASA RAO
            </p>

        

            <p className="text-xs text-[#6B7280]">
              By clicking on "Book FD" I accept the{" "}
              <span className="text-red-600">
                Terms & Conditions
              </span>
            </p>

          </div>

        </div>

      </div>

      {/* ===== TENURE OPTIONS ===== */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* Popular */}
        <div
          onClick={handleBook}
          className="border border-[#E5E7EB] rounded-lg p-4 cursor-pointer flex justify-between items-center bg-white hover:shadow-sm"
        >
          <div>
            <p className=" mb-1 text-yellow-600 font-medium">
              ★ Popular
            </p>
            <p className="text-[#6B7280]">1.6 YEARS</p>
            <p className="font-semibold text-lg text-[#1F2937]">
              6.45%
            </p>
          </div>

          <ArrowRight size={18} className="text-[#8B1C2E]" />
        </div>

        {/* Tax Saver */}
        <div
          onClick={handleBook}
          className="border border-[#E5E7EB] rounded-lg p-4 cursor-pointer flex justify-between items-center bg-white hover:shadow-sm"
        >
          <div>
            <p className="text-yellow-600 font-medium mb-1">
              ★ Tax saver · 5 year lock-in
            </p>
            <p className="text-[#6B7280]">5 YEARS</p>
            <p className="font-semibold text-lg text-[#1F2937]">
              6.45%
            </p>
          </div>

          <ArrowRight size={18} className="text-[#8B1C2E]" />
        </div>

        {/* Custom */}
        <div
          onClick={handleBook}
          className="border border-[#F5C2C7] rounded-lg p-4 cursor-pointer flex justify-between items-center bg-[#FBE9EC] hover:shadow-sm"
        >
          <div>
            <p className="text-[#6B7280]">
              Enter Your Own Tenure
            </p>
          </div>

          <ArrowRight size={18} className="text-[#8B1C2E]" />
        </div>

      </div>

    </div>
  );
}

export default FDDetailsSelection;