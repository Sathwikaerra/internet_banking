"use client";
import { useRouter } from "next/navigation";
import {  CreditCard, Globe, DollarSign, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OffersSection() {
  const router = useRouter();

  const offers = [
    {
      id: 1,
      account: "Jayam Bank® Preferred – 2731",
      title: "A loan from your available credit",
      desc: "With Flex Loan, get funds from your card's available credit at a fixed APR.",
      icon: CreditCard,
      buttonText: "View Offer",
      link: "/offers/flex-loan",
    },
    {
      id: 2,
      account: "Costco card",
      title: "Keep us up to date",
      desc: "We may not have your most recent income information.",
      icon: DollarSign,
      buttonText: "Update Now",
      link: "/offers/update-income",
    },
    {
      id: 3,
      account: "Jayam Bank® Preferred – 2731",
      title: "Send foreign wire transfers",
      desc: "No transfer fee for online international wires (in foreign currency).",
      icon: Globe,
      buttonText: "Wire funds",
      link: "/offers/wire-transfer",
    },
    {
      id: 4,
      account: "Personal Loan-7006",
      title: "Jayam Entertainment®",
      desc: "Book tickets and get exclusive discounts on select events and concerts.",
      icon: Ticket,
      buttonText: "Learn More",
      link: "/offers/entertainment",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 mt-4">
      {offers.map((offer) => {
        const Icon = offer.icon;
        return (
          <Card key={offer.id} className="p-4 rounded-xl shadow-sm relative">
            
            {/* Close button */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
              {/* <X className="w-3 h-3" /> */}
            </button>

            {/* Header */}
            <p className="text-xs font-semibold text-gray-500">
              {offer.account}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <Icon className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                {offer.title}
              </h3>
            </div>

            <p className="text-[10px] text-gray-500 ">
              {offer.desc}
            </p>

            <Button
              onClick={() => router.push(offer.link)}
              className=" w-fit text-[10px] px-3 bg-primary hover:bg-blue-800"
            >
              {offer.buttonText}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
