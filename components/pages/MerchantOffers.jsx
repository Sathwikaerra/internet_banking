"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const merchantData = [
  {
    id: 1,
    name: "Wallmart",
    icon: "/icons/wallmartpng.jpg",
    cashback: "10% Back",
    daysLeft: "29d left",
    isNew: false,
  },
  {
    id: 2,
    name: "Macy's",
    icon: "/icons/11390730.jpg",
    cashback: "$5 Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 3,
    name: "Walmart",
    icon: "/icons/11390733.jpg",
    cashback: "4% Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 4,
    name: "Chipotle",
    icon: "/icons/person-shopping.jpg",
    cashback: "10% Back",
    daysLeft: "29d left",
    isNew: true,
  },
  {
    id: 5,
    name: "BestBuy",
    icon: "/icons/wallmartpng.jpg",
    cashback: "3% Back",
    daysLeft: "29d left",
    isNew: true,
  },
];

export default function MerchantOffers() {
  const [showAll, setShowAll] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [activated, setActivated] = useState(false);

  const visible = showAll ? merchantData : merchantData.slice(0, 6);

  return (
    <>
      <Card className="shadow-sm rounded-xl bg-white p-3 px-0">
        <CardHeader className="pb-1 flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-xs font-semibold text-gray-800">
              Save with Merchant Offers
            </CardTitle>
            <p className="text-[9px] text-gray-500">
              KAEBAUK ThankYou® Preferred – 2731
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

        <CardContent className="mt-1">
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x">
            {visible.map((offer) => (
              <motion.div
                key={offer.id}
                onClick={() => {
                  setSelectedOffer(offer);
                  setActivated(false);
                }}
                whileHover={{ rotate: 1, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[135px] h-[125px] border rounded-xl p-2 bg-white shadow-sm relative snap-center cursor-pointer"
              >
                {offer.isNew && (
                  <span className="absolute top-1 left-2 bg-purple-700 text-white text-[7px] px-1 rounded">
                    New
                  </span>
                )}

                <div className="text-center space-y-1">
                  {/* PNG Icon */}
                  <div className="w-full flex justify-center items-center h-8">
                    <img
                      src={offer.icon}
                      alt={offer.name}
                      className="w-10 h-13 object-contain"
                    />
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
              </motion.div>
            ))}
          </div>

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

      {/* Center Popup Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedOffer(null);
              setActivated(false);
            }}
          >
            <motion.div
              className="bg-white w-[85%] max-w-xs p-6 rounded-2xl shadow-2xl"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold">{selectedOffer.name}</h3>
                <X
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    setSelectedOffer(null);
                    setActivated(false);
                  }}
                />
              </div>

              {/* PNG Icon Inside Popup */}
              <div className="flex justify-center mb-4">
                <img
                  src={selectedOffer.icon}
                  alt={selectedOffer.name}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <p className="text-xs text-gray-700 mb-1">
                Cashback:{" "}
                <span className="text-blue-600 font-medium">
                  {selectedOffer.cashback}
                </span>
              </p>

              <p className="text-[10px] text-gray-500 mb-4">
                Offer Validity: {selectedOffer.daysLeft}
              </p>

              {!activated ? (
                <motion.button
                  onClick={() => setActivated(true)}
                  className="w-full text-xs h-9 bg-blue-600 text-white rounded-lg font-medium"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                >
                  Activate Offer
                </motion.button>
              ) : (
                <motion.div
                  className="w-full text-xs h-9 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 12 }}
                >
                  ✓ Activated
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CarIcon() {
  return null; // You no longer need this
}
