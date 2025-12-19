"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle } from "lucide-react";

type Query = {
    id: number;
    subject: string;
    date: string;
    status: "Open" | "In Progress" | "Resolved";
    reference: string;
    remarks?: string;
};

const initialQueries: Query[] = [
    {
        id: 1,
        subject: "Fund not credited",
        date: "12 Dec 2025",
        status: "Open",
        reference: "QRY-78521",
        remarks: "Payment to Rahul for rent transfer",
    },
    {
        id: 2,
        subject: "Duplicate debit shown",
        date: "10 Dec 2025",
        status: "In Progress",
        reference: "QRYS-95412",
        remarks: "Shopping transaction deducted twice",
    },
    {
        id: 3,
        subject: "Failed UPI payment refund",
        date: "08 Dec 2025",
        status: "Resolved",
        reference: "QRYP-44820",
        remarks: "UPI transaction refund not posted",
    },
];

const statusColor: Record<Query["status"], string> = {
    Open: "bg-amber-50 border-amber-200 text-amber-700",
    "In Progress": "bg-blue-50 border-blue-200 text-blue-700",
    Resolved: "bg-green-50 border-green-200 text-green-700",
};

const MyQueries: React.FC = () => {
    const [queries, setQueries] = useState(initialQueries);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newQuery, setNewQuery] = useState({ subject: "", remarks: "" });

    const selectedQuery = queries.find((q) => q.id === selectedId) || null;

    const handleCloseQuery = (id: number) => {
        setQueries((prev) =>
            prev.map((q) =>
                q.id === id ? { ...q, status: "Resolved" } : q
            )
        );
    };

    const handleRaiseQuery = () => {
        if (!newQuery.subject.trim()) return;

        setQueries((prev) => [
            {
                id: Date.now(),
                subject: newQuery.subject,
                remarks: newQuery.remarks,
                reference: `QR-${Date.now().toString().slice(-6)}`,
                date: new Date().toLocaleDateString(),
                status: "Open",
            },
            ...prev,
        ]);

        setNewQuery({ subject: "", remarks: "" });
        setIsFormOpen(false);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow p-3 space-y-3">
            <div>
                <h3 className="text-sm font-semibold text-slate-800">My Queries</h3>
                <p className="text-[11px] text-slate-500">
                    Track responses or raise a new request.
                </p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                {queries.map((q) => {
                    const isSelected = selectedId === q.id;

                    return (
                        <button
                            key={q.id}
                            onClick={() => setSelectedId(q.id === selectedId ? null : q.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer
                ${isSelected
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-[11px] font-semibold text-slate-800">
                                        {q.subject}
                                    </p>
                                    <p className="text-[9px] text-slate-500">
                                        Ref: {q.reference} • {q.date}
                                    </p>
                                </div>
                                <span
                                    className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold ${statusColor[q.status]}`}
                                >
                                    {q.status}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Expanded details */}
            {selectedQuery && (
                <div className="border border-slate-200 bg-slate-50 rounded-lg p-3 text-[10px] space-y-2">
                    <p className="font-semibold text-slate-800">Details</p>
                    <p className="text-slate-600">{selectedQuery.remarks}</p>

                    <div className="flex gap-2 justify-end pt-1">
                        <Button
                            size="sm"
                            className="h-6 px-2 text-[9px]"
                            variant="outline"
                            onClick={() => alert("Download triggered")}
                        >
                            <Download className="w-3 h-3 mr-1" />
                            Download reply
                        </Button>
                        <Button
                            size="sm"
                            className="h-6 px-2 text-[9px] bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => handleCloseQuery(selectedQuery.id)}
                        >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Close query
                        </Button>
                    </div>
                </div>
            )}

            {/* Raise new query button */}
            {!isFormOpen && (
                <Button
                    size="sm"
                    className="bg-slate-800 text-white text-[11px] font-semibold px-3 py-1.5 hover:bg-slate-900"
                    onClick={() => setIsFormOpen(true)}
                >
                    Raise new query
                </Button>
            )}

            {/* Raise query form */}
            {isFormOpen && (
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-[10px] space-y-2">
                    <p className="font-semibold text-slate-800">Raise new query</p>

                    <input
                        type="text"
                        placeholder="Subject"
                        value={newQuery.subject}
                        onChange={(e) =>
                            setNewQuery({ ...newQuery, subject: e.target.value })
                        }
                        className="w-full border border-slate-300 rounded p-1 text-[10px]"
                    />

                    <textarea
                        rows={3}
                        placeholder="Describe your issue"
                        value={newQuery.remarks}
                        onChange={(e) =>
                            setNewQuery({ ...newQuery, remarks: e.target.value })
                        }
                        className="w-full border border-slate-300 rounded p-1 text-[10px]"
                    />

                    <div className="flex gap-2 justify-end pt-1">
                        <Button
                            size="sm"
                            className="h-6 px-2 text-[9px]"
                            variant="outline"
                            onClick={() => setIsFormOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="h-6 px-2 text-[9px] bg-blue-600 text-white hover:bg-blue-700"
                            onClick={handleRaiseQuery}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyQueries;
