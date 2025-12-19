"use client";

import React, { useState } from "react";

type Payee = {
  id: number;
  bankType: "same" | "other";
  mobileNumber?: string;
  accountNumber: string;
  confirmAccountNumber?: string;
  iban?: string;
  payeeName?: string;
  fullName?: string;
  bankNumber?: string;
};

const ManagePayees: React.FC = () => {
  const [payees, setPayees] = useState<Payee[]>([
    {
      id: 1,
      bankType: "same",
      mobileNumber: "9876543210",
      accountNumber: "123456789012",
    },
    {
      id: 2,
      bankType: "other",
      payeeName: "Bob",
      fullName: "Bob Kumar",
      accountNumber: "987654321001",
      confirmAccountNumber: "987654321001",
      iban: "IBAN123456",
      bankNumber: "987650001",
    },
    {
      id: 3,
      bankType: "other",
      payeeName: "Charlie",
      fullName: "Charlie Singh",
      accountNumber: "456712349999",
      confirmAccountNumber: "456712349999",
      iban: "IBAN654321",
      bankNumber: "999880001",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [payeeType, setPayeeType] = useState<"same" | "other">("same");

  const [form, setForm] = useState({
    mobileNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
    iban: "",
    payeeName: "",
    fullName: "",
    bankNumber: "",
  });

  const emptyForm = {
    mobileNumber: "",
    accountNumber: "",
    confirmAccountNumber: "",
    iban: "",
    payeeName: "",
    fullName: "",
    bankNumber: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddClick = () => {
    setMode("add");
    setEditingId(null);
    setPayeeType("same");
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const handleEditClick = (payee: Payee) => {
    setMode("edit");
    setEditingId(payee.id);
    setPayeeType(payee.bankType);

    setForm({
      mobileNumber: payee.mobileNumber || "",
      accountNumber: payee.accountNumber || "",
      confirmAccountNumber: payee.confirmAccountNumber || "",
      iban: payee.iban || "",
      payeeName: payee.payeeName || "",
      fullName: payee.fullName || "",
      bankNumber: payee.bankNumber || "",
    });

    setIsFormOpen(true);
  };

  const handleRemove = (id: number) => {
    setPayees((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setMode("add");
    setEditingId(null);
    setPayeeType("same");
    setForm(emptyForm);
  };

  const handleSave = () => {
    if (!form.accountNumber) return;

    if (mode === "add") {
      setPayees((prev) => [
        ...prev,
        {
          id: Date.now(),
          bankType: payeeType,
          mobileNumber: form.mobileNumber || undefined,
          accountNumber: form.accountNumber,
          confirmAccountNumber: form.confirmAccountNumber || undefined,
          iban: form.iban || undefined,
          payeeName: form.payeeName || undefined,
          fullName: form.fullName || undefined,
          bankNumber: form.bankNumber || undefined,
        },
      ]);
    } else if (mode === "edit" && editingId !== null) {
      setPayees((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                bankType: payeeType,
                mobileNumber: form.mobileNumber || undefined,
                accountNumber: form.accountNumber,
                confirmAccountNumber: form.confirmAccountNumber || undefined,
                iban: form.iban || undefined,
                payeeName: form.payeeName || undefined,
                fullName: form.fullName || undefined,
                bankNumber: form.bankNumber || undefined,
              }
            : p
        )
      );
    }

    handleCancel();
  };

  const formatAccount = (acc: string) => {
    const last4 = acc.slice(-4);
    return `XXXX ${last4}`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow p-5 space-y-4">
      
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Manage Payees</h3>
        <p className="text-[12px] text-slate-600">
          Add, edit, or remove payees linked to your account.
        </p>
      </div>

      {/* PAYEE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {payees.map((payee) => {
          const isSelected = isFormOpen && editingId === payee.id;

          return (
            <div
              key={payee.id}
              onClick={() => handleEditClick(payee)}
              className={`p-4 border rounded-xl shadow-sm cursor-pointer transition-all 
              hover:shadow-md hover:-translate-y-[2px]
              ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="text-sm font-semibold text-slate-800 flex justify-between">
                <span>
                  {payee.bankType === "same"
                    ? payee.mobileNumber
                    : payee.payeeName || payee.fullName}
                </span>

                {isSelected && (
                  <span className="text-[11px] text-blue-600 font-semibold">
                    Editing
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 mt-1">
                Account: {formatAccount(payee.accountNumber)}
              </p>

              <div className="flex gap-3 text-[11px] pt-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(payee);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-red-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(payee.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={handleAddClick}
        className="text-blue-700 font-semibold text-[12px] hover:underline flex items-center gap-1"
      >
        <span className="text-[16px]">＋</span> Add New Payee
      </button>

      {/* FORM CARD */}
      {isFormOpen && (
        <div className="mt-3 p-4 border rounded-xl bg-slate-50 shadow-inner space-y-4">

          {/* TYPE SWITCH */}
          <div className="flex gap-3">
            <button
              onClick={() => setPayeeType("same")}
              className={`px-3 py-1 rounded-full text-[11px] border transition ${
                payeeType === "same"
                  ? "border-blue-600 bg-white text-blue-700 font-semibold"
                  : "border-slate-300 text-slate-600 hover:bg-white"
              }`}
            >
              Same Bank Account
            </button>

            <button
              onClick={() => setPayeeType("other")}
              className={`px-3 py-1 rounded-full text-[11px] border transition ${
                payeeType === "other"
                  ? "border-blue-600 bg-white text-blue-700 font-semibold"
                  : "border-slate-300 text-slate-600 hover:bg-white"
              }`}
            >
              Other Bank Account
            </button>
          </div>

          {/* SAME BANK FORM */}
          {payeeType === "same" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-600">
                  Mobile Number
                </label>
                <input
                  name="mobileNumber"
                  value={form.mobileNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600">
                  Account Number
                </label>
                <input
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                  placeholder="Enter account number"
                />
              </div>
            </div>
          )}

          {/* OTHER BANK FORM */}
          {payeeType === "other" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-600">
                  Account Number
                </label>
                <input
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600">
                  Confirm Account Number
                </label>
                <input
                  name="confirmAccountNumber"
                  value={form.confirmAccountNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600">IBAN</label>
                <input
                  name="iban"
                  value={form.iban}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600">Payee Name</label>
                <input
                  name="payeeName"
                  value={form.payeeName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600">
                  Full Name (as per bank)
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] text-slate-600">
                  Mobile / Bank Number
                </label>
                <input
                  name="bankNumber"
                  value={form.bankNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md px-2 py-1 text-[11px]"
                />
              </div>
            </div>
          )}

          {/* FORM BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-4 py-1 text-[12px] border rounded-md hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-1 text-[12px] bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {mode === "add" ? "Save Payee" : "Update Payee"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePayees;
