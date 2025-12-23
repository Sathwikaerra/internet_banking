// "use client";

// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Gift, Trophy, Star, ArrowLeft, WalletCards } from "lucide-react";

// export default function RewardPointsPage() {
//   const TOTAL_POINTS = 4250;

//   const POINT_HISTORY = [
//     { id: 1, title: "Dining Cashback", date: "10 Dec, 2025", points: "+150" },
//     { id: 2, title: "Online Shopping", date: "08 Dec, 2025", points: "+320" },
//     { id: 3, title: "Travel Booking", date: "03 Dec, 2025", points: "+500" },
//     { id: 4, title: "Electricity Bill Cashback", date: "01 Dec, 2025", points: "+100" },
//   ];

//   const CATEGORIES = [
//     { label: "Shopping", value: 40 },
//     { label: "Dining", value: 20 },
//     { label: "Travel", value: 25 },
//     { label: "Bills", value: 15 },
//   ];

//   return (
//     <div className="max-w-xl mx-auto px-0  space-y-1">
      
      

//       {/* TOTAL POINTS CARD */}
//       <Card className="rounded-xl shadow-md border border-slate-200 bg-slate-50">
//         <CardHeader className="pb-0 px-2">
//           <CardTitle className="text-sm flex items-center gap-2">
//             <Trophy className="w-4 h-4 text-yellow-500" />
//              Total Reward Points
//           </CardTitle>
//           <CardDescription className="text-[10px]">
//             Track, earn, and redeem across all accounts
//           </CardDescription>
//         </CardHeader>

//         <CardContent className=" px-2">
//           <p className="text-xl font-bold text-slate-800">{TOTAL_POINTS.toLocaleString("en-IN")}</p>

//           {/* Progress Bar */}
//           <div className="mt-1 ">
//             <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-yellow-500"
//                 style={{ width: `${(TOTAL_POINTS / 10000) * 100}%` }}
//               />
//             </div>
//             <p className="text-[10px] text-slate-500 mt-1">
//               Next Reward Tier at 10,000 points
//             </p>
//           </div>

//           <Button className="mt-3 bg-[#233b77] text-white text-[10px] hover:bg-[#1d2f60]">
//             Redeem Rewards →
//           </Button>
//         </CardContent>
//       </Card>

     
//     </div>
//   );
// }



"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export default function RewardPointsPage({ onNavigate }: any) {
  const TOTAL_POINTS = 4250;

  return (
    <div className="max-w-xl mx-auto px-0 space-y-1">
      {/* SUMMARY CARD */}
      <Card className="rounded-xl shadow-md border border-slate-200 bg-slate-50">
        <CardHeader className="pb-0 px-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            Total Reward Points
          </CardTitle>
          <CardDescription className="text-[10px]">
            Track, earn, and redeem across all accounts
          </CardDescription>
        </CardHeader>

        <CardContent className="px-2">
          <p className="text-xl font-bold text-slate-800">
            {TOTAL_POINTS.toLocaleString("en-IN")}
          </p>

          {/* Progress Bar */}
          <div className="mt-1">
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${(TOTAL_POINTS / 10000) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Next Reward Tier at 10,000 points
            </p>
          </div>

          <Button
            className="mt-3 bg-[#233b77] text-white text-[10px] hover:bg-[#1d2f60]"
            onClick={() => onNavigate?.("full-rewards")}
          >
            Redeem Rewards →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
