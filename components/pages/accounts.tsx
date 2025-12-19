"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";

export function Accounts() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const accounts = [
    {
      id: 1,
      name: "Savings Account",
      accountNumber: "2314001234567890",
      type: "Savings",
      balance: "₹2,45,678.50",
      interest: "3.5% p.a.",
    },
    {
      id: 2,
      name: "Current Account",
      accountNumber: "2314009876543210",
      type: "Current",
      balance: "₹5,50,000.00",
      interest: "No Interest",
    },
    {
      id: 3,
      name: "Fixed Deposit",
      accountNumber: "2314005555555555",
      type: "Fixed Deposit",
      balance: "₹10,00,000.00",
      interest: "6.5% p.a.",
    },
  ];

  const handleCopy = async (num: string, id: number) => {
    await navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-6 pb-8 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-2">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Your Accounts</h1>
          <p className="text-xs text-muted-foreground">
            Manage your banking accounts in one place.
          </p>
        </div>
      </div>

      {/* 1. Accounts Grid (Only existing accounts) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <Card
            key={acc.id}
            className="rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:border-black/20"
          >
            {/* Compact Padding: p-2 */}
            <CardContent className="p-2 space-y-2">
              {/* Account Title and Type */}
              <div className="pb-1 border-b">
                <p className="text-sm font-semibold truncate">{acc.name}</p>
                <p className="text-[10px] text-muted-foreground">{acc.type}</p>
              </div>

              {/* Account Number */}
              <div>
                <p className="text-[9px] uppercase text-slate-500 font-medium tracking-widest">
                  Account No
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs">
                    **** **** ****{acc.accountNumber.slice(-4)}
                  </p>
                  <button
                    onClick={() => handleCopy(acc.accountNumber, acc.id)}
                    className="text-slate-500 hover:text-black transition-colors"
                    title="Copy Account Number"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                {copiedId === acc.id && (
                  <p className="text-[9px] text-green-600 font-medium mt-1">
                    Copied!
                  </p>
                )}
              </div>
              
              {/* Balance */}
              <div>
                <p className="text-[9px] uppercase text-slate-500 font-medium tracking-widest">
                  Balance
                </p>
                <p className="text-base font-bold text-gray-900">{acc.balance}</p>
              </div>

              {/* Interest */}
              <div>
                <p className="text-[9px] uppercase text-slate-500 font-medium tracking-widest">
                  Interest
                </p>
                <p className="text-xs text-green-700 font-semibold">
                  {acc.interest}
                </p>
              </div>

              {/* View Button */}
              <div className="flex justify-end pt-1">
                <Button className="h-6 px-3 text-[10px] bg-black hover:bg-gray-800 text-white rounded-md">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* 2. Open New Account Card (Full Width and Half Height) */}
      <Card className="rounded-lg border-2 border-dashed border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 w-full">
        {/*
          Using 'flex items-center justify-between' and vertical padding 'py-3'
          to achieve a compact, full-width banner look.
        */}
        <CardContent className="p-3 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold">Open a New Account</h3>
                    <p className="text-xs text-muted-foreground">Start growing your wealth today.</p>
                </div>
            </div>
            <Button className="h-7 text-xs px-4 bg-black hover:bg-gray-800 text-white rounded-md">
                Apply Now
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}