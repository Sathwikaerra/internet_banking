"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, DollarSign, BarChart3, Plus } from "lucide-react";

export function Loans() {
  const loans = [
    {
      id: 1,
      type: "Personal Loan",
      amount: "₹5,00,000",
      disburseDate: "2023-06-15",
      totalAmount: "₹5,87,500",
      rateOfInterest: "8.5% p.a.",
      tenor: "60 months",
      emi: "₹9,792",
      emiDueDate: "15th of every month",
      emisPaid: 18,
      totalEMIs: 60,
      nextEMIDate: "2024-12-15",
      status: "Active",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      type: "Home Loan",
      amount: "₹20,00,000",
      disburseDate: "2022-01-10",
      totalAmount: "₹26,54,320",
      rateOfInterest: "6.5% p.a.",
      tenor: "240 months",
      emi: "₹11,060",
      emiDueDate: "10th of every month",
      emisPaid: 35,
      totalEMIs: 240,
      nextEMIDate: "2024-12-10",
      status: "Active",
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="md:text-2xl font-bold text-foreground text-[12px]">Loans</h1>
        <p className="text-[10px] text-muted-foreground">Manage your active loans and view payment details</p>
      </div>

      {/* Loan Cards Grid: 2 columns on md+ (each behaves like 6 of 12 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loans.map((loan) => {
          const progressPercent = (loan.emisPaid / loan.totalEMIs) * 100;

          return (
            <Card
              key={loan.id}
              className="w-full border-0 shadow-sm hover:shadow-md transition-all overflow-hidden rounded-2xl"
            >
              {/* <div className={`h-2 bg-gradient-to-r ${loan.color}`} /> */}

              <CardContent className="p-2">
                {/* header row */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-br ${loan.color} p-3 rounded-lg text-white`}>
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-[12px] md:text-[12px] font-semibold text-foreground">{loan.type}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Loan ID: LN{Math.random().toString().slice(2, 10)}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                    {loan.status}
                  </span>
                </div>

                {/* main stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4 p-3 bg-slate-50/50 rounded-lg">
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                      Loan Amount
                    </p>
                    <p className="text-[12px] font-bold text-primary">{loan.amount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                      Monthly EMI
                    </p>
                    <p className="text-[12px]  font-bold text-foreground">{loan.emi}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">
                      Rate of Interest
                    </p>
                    <p className="text-[12px] font-bold text-foreground">{loan.rateOfInterest}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">Tenure</p>
                    <p className="text-[12px] font-bold text-foreground">{loan.tenor}</p>
                  </div>
                </div>

                {/* progress */}
                <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-2 h-2 text-primary" />
                      <p className="font-semibold text-foreground text-[10px]">Repayment Progress</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {loan.emisPaid} of {loan.totalEMIs} EMIs paid
                    </p>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div
                      className={`bg-gradient-to-r ${loan.color} h-full transition-all duration-500 rounded-full shadow-sm`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                    {Math.round(progressPercent)}% Complete
                  </p>
                </div>

                {/* mini cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <p className="text-[10px] text-blue-700 font-semibold">Next EMI Date</p>
                    </div>
                    <p className="font-bold text-blue-900 text-[12px]">{loan.nextEMIDate}</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <p className="text-[10px] text-purple-700 font-semibold">EMI Due Date</p>
                    </div>
                    <p className="font-bold text-purple-900 text-[12px]">{loan.emiDueDate}</p>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <p className="text-[10px] text-green-700 font-semibold">Total Payable</p>
                    </div>
                    <p className="font-bold text-green-900 text-[12px]">{loan.totalAmount}</p>
                  </div>
                </div>

                {/* actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 text-[10px]">
                    Pay EMI Now
                  </Button>
                  <Button className="flex-1 rounded-full bg-white hover:bg-slate-50 text-foreground font-semibold border border-slate-200 py-2 text-[10px]">
                    View Statement
                  </Button>
                  <Button className="flex-1 rounded-full bg-white hover:bg-slate-50 text-foreground font-semibold border border-slate-200 py-2 text-[10px]">
                    Loan Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Apply for New Loan */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden rounded-2xl">
        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
        <CardHeader className="px-5 pt-4">
          <CardTitle className="flex items-center gap-2 text-blue-900 text-[12px] font-semibold">
            <Plus className="w-4 h-4" />
            Apply for New Loan
          </CardTitle>
          <CardDescription className="text-blue-700 text-[10px]">Explore loan products suited for your needs</CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-auto py-2 rounded-lg text-[10px] transition-all shadow-sm">
            Personal Loan
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-auto py-2 rounded-lg text-[10px] transition-all shadow-sm">
            Home Loan
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-auto py-2 rounded-lg text-[10px] transition-all shadow-sm">
            Auto Loan
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-auto py-2 rounded-lg text-[10px] transition-all shadow-sm">
            Education Loan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Loans;
