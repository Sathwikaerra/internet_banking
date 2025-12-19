"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, CheckCircle, CreditCard } from "lucide-react";

type LoanProduct = {
    id: string;
    name: string;
    defaultRate: number; // annual %
    minAmount: number;
    maxAmount: number;
    tenorMonthsOptions: number[]; // allowed tenors (months)
};

const PRODUCTS: LoanProduct[] = [
    {
        id: "personal",
        name: "Personal Loan",
        defaultRate: 11.5,
        minAmount: 10000,
        maxAmount: 2000000,
        tenorMonthsOptions: [12, 24, 36, 48, 60],
    },
    {
        id: "home",
        name: "Home Loan",
        defaultRate: 7.0,
        minAmount: 500000,
        maxAmount: 50000000,
        tenorMonthsOptions: [60, 120, 180, 240, 300],
    },
    {
        id: "auto",
        name: "Auto Loan",
        defaultRate: 9.5,
        minAmount: 50000,
        maxAmount: 2000000,
        tenorMonthsOptions: [12, 24, 36, 48, 60],
    },
    {
        id: "education",
        name: "Education Loan",
        defaultRate: 10.0,
        minAmount: 20000,
        maxAmount: 2000000,
        tenorMonthsOptions: [12, 24, 36, 48, 60],
    },
];

// EMI formula: E = P * r * (1+r)^n / ((1+r)^n - 1) where r = monthly rate (decimal), n = months
const calcEMI = (principal: number, annualRate: number, months: number) => {
    if (!principal || !annualRate || !months) return 0;
    const r = annualRate / 12 / 100;
    const n = months;
    const numerator = principal * r * Math.pow(1 + r, n);
    const denom = Math.pow(1 + r, n) - 1;
    return denom === 0 ? principal / n : numerator / denom;
};

export function ApplyLoan() {
    const productMap = useMemo(
        () =>
            PRODUCTS.reduce<Record<string, LoanProduct>>((acc, p) => {
                acc[p.id] = p;
                return acc;
            }, {}),
        []
    );

    // form state
    const [productId, setProductId] = useState<string>(PRODUCTS[0].id);
    const [amount, setAmount] = useState<string>(""); // plain numeric string
    const [tenor, setTenor] = useState<number>(PRODUCTS[0].tenorMonthsOptions[0]);
    const [rate, setRate] = useState<number>(PRODUCTS[0].defaultRate);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [income, setIncome] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [idDoc, setIdDoc] = useState<File | null>(null);
    const [incomeDoc, setIncomeDoc] = useState<File | null>(null);

    const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
    const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

    // update rate & tenor options when product changes
    React.useEffect(() => {
        const p = productMap[productId];
        if (p) {
            setRate(p.defaultRate);
            setTenor(p.tenorMonthsOptions[0]);
            // adjust amount if out of bounds
            const amtNum = Number(amount.replace(/[^0-9.]/g, ""));
            if (amtNum && (amtNum < p.minAmount || amtNum > p.maxAmount)) {
                // do not overwrite, just keep but user will see validation error
            }
        }
        setErrors((e) => {
            const copy = { ...e };
            delete copy.productId;
            delete copy.rate;
            return copy;
        });
    }, [productId, amount, productMap]);

    const numericAmount = Number(amount.replace(/[^0-9.]/g, ""));
    const emi = calcEMI(numericAmount || 0, rate || 0, tenor || 0);
    const emiRounded = Math.round(emi);

    const validate = (): boolean => {
        const next: Partial<Record<string, string>> = {};
        const p = productMap[productId];

        if (!productId) next.productId = "Choose a loan product.";
        if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0)
            next.amount = "Enter a valid amount.";
        else if (p && (numericAmount < p.minAmount || numericAmount > p.maxAmount))
            next.amount = `Allowed ${p.minAmount.toLocaleString()} - ${p.maxAmount.toLocaleString()}.`;
        if (!tenor || tenor <= 0) next.tenor = "Select loan tenure.";
        if (!rate || rate <= 0) next.rate = "Interest rate required.";
        if (!name.trim()) next.name = "Applicant name required.";
        if (!mobile.trim() || !/^[0-9]{7,15}$/.test(mobile.trim()))
            next.mobile = "Enter valid mobile (7-15 digits).";
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim()))
            next.email = "Enter valid email.";
        if (!income.trim() || Number.isNaN(Number(income)) || Number(income) <= 0)
            next.income = "Enter monthly income.";
        if (!acceptTerms) next.acceptTerms = "You must accept terms to proceed.";

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const resetForm = () => {
        setProductId(PRODUCTS[0].id);
        setAmount("");
        setTenor(PRODUCTS[0].tenorMonthsOptions[0]);
        setRate(PRODUCTS[0].defaultRate);
        setName("");
        setMobile("");
        setEmail("");
        setIncome("");
        setAcceptTerms(false);
        setIdDoc(null);
        setIncomeDoc(null);
        setErrors({});
    };

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!validate()) return;

        setToast({
            id: Date.now(),
            message: `Application submitted for ${productMap[productId].name}`,
        });
        window.setTimeout(() => setToast(null), 3500);

        setTimeout(resetForm, 700);
    };

    return (
        <>
            {/* toast */}
            {toast && (
                <div role="status" aria-live="polite" className="fixed top-4 right-4 z-50">
                    <div className="max-w-xs px-3 py-2 rounded-md shadow-md bg-emerald-600 text-white text-[10px] font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{toast.message}</span>
                        <button
                            onClick={() => setToast(null)}
                            className="ml-2 text-[10px] underline"
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Increased width and added top padding */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
                <Card className="border-0 shadow-sm rounded-2xl overflow-hidden w-full">
                    {/* removed the decorative blue line here (deleted the h-1 gradient div) */}
                    <CardHeader className="px-4 py-3">
                        <CardTitle className="flex items-center gap-2 text-[12px] font-semibold">
                            <CreditCard className="w-4 h-4" />
                            Apply for a Loan
                        </CardTitle>
                        <CardDescription className="text-[10px]">
                            Quick application — fill minimal details below
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4">
                        <form onSubmit={submit} className="space-y-3 text-[10px]">
                            {/* product + amount row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Loan Product
                                    </label>
                                    <select
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}
                                        className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] focus:outline-none"
                                    >
                                        {PRODUCTS.map((p) => (
                                            <option value={p.id} key={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.productId && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.productId}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Amount (INR)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-500 text-[10px]">₹</span>
                                        <input
                                            value={amount}
                                            onChange={(e) => {
                                                const v = e.target.value;
                                                if (/^[0-9,]*\.?[0-9]*$/.test(v) || v === "") setAmount(v);
                                            }}
                                            placeholder="0"
                                            className={`w-full h-10 rounded-xl pl-7 pr-3 text-[10px] border ${errors.amount ? "border-rose-400" : "border-slate-200"
                                                } bg-white`}
                                        />
                                    </div>
                                    {errors.amount && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.amount}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Tenure (months)
                                    </label>
                                    <select
                                        value={tenor}
                                        onChange={(e) => setTenor(Number(e.target.value))}
                                        className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[10px] focus:outline-none"
                                    >
                                        {productMap[productId].tenorMonthsOptions.map((m) => (
                                            <option key={m} value={m}>
                                                {m} months
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tenor && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.tenor}</div>
                                    )}
                                </div>
                            </div>

                            {/* rate, emi preview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Rate (% p.a.)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className={`w-full h-10 rounded-xl border ${errors.rate ? "border-rose-400" : "border-slate-200"
                                            } bg-white px-3 text-[10px]`}
                                    />
                                    {errors.rate && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.rate}</div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 h-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bar small />
                                                <p className="text-[10px] font-semibold">Estimated EMI</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[14px] font-bold text-foreground">
                                                    ₹ {isFinite(emiRounded) ? emiRounded.toLocaleString() : "0"}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">{tenor} months</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* applicant info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Full name
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={`w-full h-10 rounded-xl border ${errors.name ? "border-rose-400" : "border-slate-200"
                                                } bg-white px-3 text-[10px]`}
                                            placeholder="Your name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.name}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Mobile
                                    </label>
                                    <input
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                        placeholder="10 digits"
                                        className={`w-full h-10 rounded-xl border ${errors.mobile ? "border-rose-400" : "border-slate-200"
                                            } bg-white px-3 text-[10px]`}
                                    />
                                    {errors.mobile && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.mobile}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Email
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className={`w-full h-10 rounded-xl border ${errors.email ? "border-rose-400" : "border-slate-200"
                                            } bg-white px-3 text-[10px]`}
                                    />
                                    {errors.email && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.email}</div>
                                    )}
                                </div>
                            </div>

                            {/* income & docs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Monthly income (INR)
                                    </label>
                                    <input
                                        value={income}
                                        onChange={(e) => setIncome(e.target.value.replace(/[^0-9.]/g, ""))}
                                        placeholder="0"
                                        className={`w-full h-10 rounded-xl border ${errors.income ? "border-rose-400" : "border-slate-200"
                                            } bg-white px-3 text-[10px]`}
                                    />
                                    {errors.income && (
                                        <div className="mt-1 text-rose-500 text-[10px]">{errors.income}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        ID Document
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        <input
                                            type="file"
                                            onChange={(e) => setIdDoc(e.target.files?.[0] ?? null)}
                                            className="text-[10px]"
                                        />
                                    </div>
                                    <div className="text-[9px] text-slate-400 mt-1">Aadhaar / PAN (optional)</div>
                                </div>

                                <div>
                                    <label className="block text-[10px] text-slate-700 mb-1 font-medium">
                                        Income Proof
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        <input
                                            type="file"
                                            onChange={(e) => setIncomeDoc(e.target.files?.[0] ?? null)}
                                            className="text-[10px]"
                                        />
                                    </div>
                                    <div className="text-[9px] text-slate-400 mt-1">
                                        Payslip / Bank statement (optional)
                                    </div>
                                </div>
                            </div>

                            {/* terms */}
                            <div className="flex items-start gap-2">
                                <input
                                    id="terms"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    type="checkbox"
                                    className="accent-slate-900 mt-1"
                                />
                                <label htmlFor="terms" className="text-[10px]">
                                    I confirm that the information is correct and I accept the{" "}
                                    <span className="underline">terms</span>.
                                </label>
                            </div>
                            {errors.acceptTerms && (
                                <div className="text-rose-500 text-[10px]">{errors.acceptTerms}</div>
                            )}

                            {/* actions */}
                            <div className="flex gap-2 items-center">
                                <Button
                                    type="submit"
                                    className="flex-1 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] py-2"
                                >
                                    Submit Application
                                </Button>
                                <Button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-full bg-white border border-slate-200 text-[10px] text-foreground px-3 py-2"
                                >
                                    Reset
                                </Button>
                            </div>

                            {/* short required docs note */}
                            <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-2">
                                <small>Required: ID & Income proof (optional for small loans)</small>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

/* Small inline icon used in the EMI preview (keeps bundle minimal) */
function Bar({ small }: { small?: boolean }) {
    return (
        <svg
            className={`${small ? "w-3 h-3" : "w-4 h-4"} text-slate-400`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >
            <rect x="3" y="11" width="3" height="7" rx="1" />
            <rect x="9" y="7" width="3" height="11" rx="1" />
            <rect x="15" y="4" width="3" height="14" rx="1" />
        </svg>
    );
}
