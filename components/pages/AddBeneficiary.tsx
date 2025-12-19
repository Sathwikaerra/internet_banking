"use client";

import React, { useState } from "react";

export default function AddBeneficiaryPage() {
  const [form, setForm] = useState({
    beneficiaryType: "Within Bank",
    name: "",
    nickname: "",
    accountNumber: "",
    confirmAccountNumber: "",
    bankName: "",
    ifscCode: "",
    accountType: "Savings",
    mobile: "",
    email: "",
    dailyLimit: "50000",
  });

  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.accountNumber.trim()) newErrors.accountNumber = "Required";
    if (form.accountNumber !== form.confirmAccountNumber)
      newErrors.confirmAccountNumber = "Account numbers do not match";
    if (!form.ifscCode.trim()) newErrors.ifscCode = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Content */}
      <main className="flex-1 flex justify-center items-start px-4 py-6">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[2fr,1.2fr] gap-6">
          {/* Form card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 space-y-4">
            <header className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#6c7ba8] font-semibold">
                Transfer Money
              </p>
              <h1 className="text-[14px] font-semibold text-slate-900">Add Beneficiary</h1>
              <p className="text-xs text-slate-500">
                Register a new payee to send money quickly and safely.
              </p>
            </header>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs"
            >
              {/* Beneficiary type - full width */}
              <div className="md:col-span-3 flex flex-col gap-1">
                <label className="font-medium text-slate-700">Beneficiary Type</label>
                <select
                  name="beneficiaryType"
                  value={form.beneficiaryType}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                >
                  <option>Within Bank</option>
                  <option>Other Bank (NEFT/IMPS/RTGS)</option>
                  <option>International</option>
                </select>
                <p className="text-[10px] text-slate-400">
                  Choose where this beneficiary holds their account.
                </p>
              </div>

              {/* Row 1: Name | Nickname | Account Number */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Beneficiary Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Eg: Rahul Sharma"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
                {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  placeholder="Eg: Rent, Mom, Savings"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Account Number *</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
                {errors.accountNumber && (
                  <span className="text-[10px] text-red-500">{errors.accountNumber}</span>
                )}
              </div>

              {/* Row 2: Confirm Account | IFSC | Bank Name */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Confirm Account Number *</label>
                <input
                  type="text"
                  name="confirmAccountNumber"
                  value={form.confirmAccountNumber}
                  onChange={handleChange}
                  placeholder="Re-enter account number"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
                {errors.confirmAccountNumber && (
                  <span className="text-[10px] text-red-500">{errors.confirmAccountNumber}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">IFSC Code *</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={form.ifscCode}
                  onChange={handleChange}
                  placeholder="Eg: SBIN0001234"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs uppercase tracking-[0.08em] focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
                {errors.ifscCode && <span className="text-[10px] text-red-500">{errors.ifscCode}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  placeholder="Eg: State Bank of India"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
              </div>

              {/* Row 3: Account Type | Mobile | Email */}
              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Account Type</label>
                <select
                  name="accountType"
                  value={form.accountType}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                >
                  <option>Savings</option>
                  <option>Current</option>
                  <option>Salary</option>
                  <option>NRE / NRO</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Beneficiary mobile (optional)"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-slate-700">Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Beneficiary email (optional)"
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
              </div>

              {/* Row 4: Daily limit (span 2) and spacer */}
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="font-medium text-slate-700">Daily Transfer Limit (₹)</label>
                <input
                  type="number"
                  name="dailyLimit"
                  value={form.dailyLimit}
                  onChange={handleChange}
                  className="border border-slate-200 rounded-lg px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#233b77]/30"
                />
                <p className="text-[10px] text-slate-400">
                  Maximum amount you can send to this beneficiary in a day.
                </p>
              </div>

              <div className="hidden md:block" />

              {/* Buttons - full width (span 3) */}
              <div className="md:col-span-3 flex justify-end gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      beneficiaryType: "Within Bank",
                      name: "",
                      nickname: "",
                      accountNumber: "",
                      confirmAccountNumber: "",
                      bankName: "",
                      ifscCode: "",
                      accountType: "Savings",
                      mobile: "",
                      email: "",
                      dailyLimit: "50000",
                    });
                    setErrors({});
                    setSaved(false);
                  }}
                  className="px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[#233b77] text-white text-xs font-semibold shadow-sm hover:bg-[#1c2f61]"
                >
                  Save Beneficiary
                </button>
              </div>
            </form>

            {saved && (
              <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800 flex items-center gap-2">
                <span>✅</span>
                <span>
                  Beneficiary <strong>{form.name || "(no name)"}</strong> has been saved. You can now send funds to this account.
                </span>
              </div>
            )}
          </section>

          {/* Side summary card */}
          <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 space-y-3 text-xs">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#f0f4ff]">
                <span className="text-xs">👤</span>
              </span>
              Beneficiary Snapshot
            </h2>
            <p className="text-[11px] text-slate-500">
              Quick view of the beneficiary details you are about to save.
            </p>

            <dl className="space-y-2 text-[11px]">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Name</dt>
                <dd className="font-medium text-slate-800">{form.name || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Nickname</dt>
                <dd className="text-slate-800">{form.nickname || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Type</dt>
                <dd className="text-slate-800">{form.beneficiaryType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Account No.</dt>
                <dd className="font-mono text-[11px] text-slate-800">{form.accountNumber || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">IFSC</dt>
                <dd className="font-mono text-[11px] text-slate-800 uppercase">{form.ifscCode || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Bank</dt>
                <dd className="text-slate-800">{form.bankName || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Account Type</dt>
                <dd className="text-slate-800">{form.accountType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Daily Limit</dt>
                <dd className="text-slate-800">₹{form.dailyLimit}</dd>
              </div>
            </dl>

            <div className="mt-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-[11px] text-slate-600">
              • Only verified beneficiaries can receive funds.
              <br />
              • Some banks may require OTP approval after adding a new beneficiary.
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
