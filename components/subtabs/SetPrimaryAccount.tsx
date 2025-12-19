"use client";

import React, { useState } from "react";

type AccountOption = {
    id: string;
    label: string;
    type: "Savings" | "Current";
    last4: string;
    balance: string;
    recommended?: boolean;
};

const accounts: AccountOption[] = [
    {
        id: "savings-main",
        label: "Salary Savings Account",
        type: "Savings",
        last4: "2020",
        balance: "₹1,24,500.00",
        recommended: true,
    },
    {
        id: "current-biz",
        label: "Business Current Account",
        type: "Current",
        last4: "5544",
        balance: "₹5,50,000.00",
    },
];

const SetPrimaryAccount: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string>("savings-main");
    const [savedId, setSavedId] = useState<string>("savings-main");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setSavedId(selectedId);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow p-3 space-y-3">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                        Set Primary Account
                    </h3>
                    <p className="text-[11px] text-slate-500">
                        This account will be used by default for fund transfers & bill
                        payments.
                    </p>
                </div>
                {showSuccess && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                        Saved
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {accounts.map((acc) => {
                    const isSelected = selectedId === acc.id;
                    const isPrimary = savedId === acc.id;

                    return (
                        <label
                            key={acc.id}
                            className={`flex items-center justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-all
                ${isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <input
                                    type="radio"
                                    name="primary-account"
                                    className="w-3.5 h-3.5 accent-blue-600"
                                    checked={isSelected}
                                    onChange={() => setSelectedId(acc.id)}
                                />
                                <div className="leading-tight">
                                    <p className="text-[12px] font-semibold text-slate-800">
                                        {acc.label}
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                        {acc.type} • A/C •••• {acc.last4}
                                    </p>
                                    <p className="text-[10px] text-slate-500">
                                        Balance:{" "}
                                        <span className="font-semibold text-slate-800">
                                            {acc.balance}
                                        </span>
                                    </p>
                                    {acc.recommended && (
                                        <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                                            Recommended for salary credits
                                        </span>
                                    )}
                                </div>
                            </div>

                            {isPrimary && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold">
                                    Primary
                                </span>
                            )}
                        </label>
                    );
                })}
            </div>

            <div className="flex items-center justify-between pt-1">
                <p className="text-[10px] text-slate-500 max-w-xs">
                    You can change this anytime. Future transfers will pick this account
                    automatically, but you can still choose a different one during
                    payment.
                </p>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white text-[12px] font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
                >
                    Save primary
                </button>
            </div>
        </div>
    );
};

export default SetPrimaryAccount;
