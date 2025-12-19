"use client";

import { useState } from "react";
import { Plus, Star, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const merchantData = [
  {
    id: 1,
    name: "Lyft",
    icon: <CarIcon />,
    cashback: "10% Back",
    daysLeft: "29d left",
    isNew: false,
  },
  {
    id: 2,
    name: "Macy's",
    icon: <Star className="w-6 h-6 text-red-600" />,
    cashback: "$5 Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 3,
    name: "Walmart",
    icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
    cashback: "4% Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 4,
    name: "Chipotle",
    icon: <ShoppingCart className="w-6 h-6 text-orange-600" />,
    cashback: "10% Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 5,
    name: "BestBuy",
    icon: <ShoppingCart className="w-6 h-6 text-black" />,
    cashback: "3% Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 6,
    name: "Sunoco",
    icon: <ShoppingCart className="w-6 h-6 text-yellow-600" />,
    cashback: "3% Back",
    daysLeft: "29d left",
    isNew: false,
  },
   {
    id: 7,
    name: "Lyft",
    icon: <CarIcon />,
    cashback: "10% Back",
    daysLeft: "29d left",
    isNew: false,
  },
  {
    id: 8,
    name: "Macy's",
    icon: <Star className="w-6 h-6 text-red-600" />,
    cashback: "$5 Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 9,
    name: "Walmart",
    icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
    cashback: "4% Back",
    daysLeft: "29d left",
    isNew: true,
  },
];

export default function MerchantOffers() {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? merchantData : merchantData.slice(0, 9);

  return (
    <Card className="shadow-sm rounded-xl bg-white p-3">
      {/* Header */}
      <CardHeader className="pb-1 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xs font-semibold text-gray-800">
            Save with Merchant Offers
          </CardTitle>
          <p className="text-[9px] text-gray-500">
            Citi ThankYou® Preferred – 2731
          </p>
        </div>

        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 text-[10px] font-semibold hover:underline"
          >
            See All →
          </button>
        )}
      </CardHeader>

      {/* Offers Scroller */}
      <CardContent className="mt-1">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {visible.map((offer) => (
            <div
              key={offer.id}
              className="min-w-[135px] h-[135px] border rounded-xl p-2 relative bg-white shadow-sm"
            >
              {offer.isNew && (
                <span className="absolute top-1 left-2 bg-purple-700 text-white text-[7px] px-1 rounded">
                  New
                </span>
              )}

              <div className="text-center space-y-2">
                <div className="w-full h-8 flex justify-center items-center">
                  {offer.icon}
                </div>

                <p className="text-[10px] font-semibold truncate text-gray-900">
                  {offer.name}
                </p>

                <button className="text-[9px] font-bold text-blue-700 underline">
                  {offer.cashback}
                </button>

                <div className="flex justify-between items-center text-[8px] text-gray-500">
                  <span>{offer.daysLeft}</span>
                  <Plus className="w-3 h-3 text-blue-600 cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Less */}
        {showAll && (
          <div className="flex justify-center mt-3">
            <Button
              size="xs"
              variant="outline"
              onClick={() => setShowAll(false)}
              className="text-[9px] h-6 px-2 border-dashed"
            >
              View Less ↑
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CarIcon() {
  return (
    <svg
      width="22" height="22" fill="none" stroke="#FF1493"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
