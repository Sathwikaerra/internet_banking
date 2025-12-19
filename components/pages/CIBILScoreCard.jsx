"use client";

import { useState } from "react";
import GaugeComponent from "react-gauge-component";

export default function CIBILScoreCard() {
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");

  const generateTimestamp = () => {
    const now = new Date();
    return now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCheck = () => {
    if (!checked) {
      setChecked(true);

      setTimeout(() => {
        setScore(788);
        setUpdatedAt(generateTimestamp());
      }, 600);
    }
  };

  const handleRefresh = () => {
    setChecked(false);
    setScore(0);
    setUpdatedAt("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center space-y-3 mt-3">
      
      <h2 className="text-sm font-semibold text-gray-800">CIBIL Score</h2>

      <p className="text-3xl font-extrabold text-gray-900">
        {checked ? score : "0"}
      </p>

      {/* Gauge Component */}
      <GaugeComponent
        value={checked ? score : 0}
        minValue={300}
        maxValue={900}
        type="semicircle"
        arc={{
          width: 0.23,
          padding: 0.02,
          cornerRadius: 4,
          subArcs: [
            { limit: 450, color: "#D32F2F" },
            { limit: 600, color: "#F9A825" },
            { limit: 750, color: "#7CB342" },
            { limit: 900, color: "#388E3C" },
          ],
        }}
        pointer={{
          elastic: true,
          animationDelay: 0,
          animate: true,
          type: "needle",
          color: "#111",
          length: 0.65,
        }}
        labels={{
          valueLabel: { hide: true },
          tickLabels: {
            type: "outer",
            ticks: [
              { value: 300 },
              { value: 450 },
              { value: 600 },
              { value: 750 },
              { value: 900 },
            ],
          },
        }}
      />

      {/* Button to Check */}
      {!checked && (
        <button
          onClick={handleCheck}
          className="bg-blue-700 text-white px-4 py-2 text-xs rounded-md hover:bg-blue-800 transition"
        >
          Check Score
        </button>
      )}

      {/* Refresh After Score Displayed */}
      {checked && (
        <>
          <button
            onClick={handleRefresh}
            className="text-[10px] text-blue-700 hover:underline"
          >
            Refresh Score
          </button>

          {/* Timestamp */}
          <p className="text-[10px] text-gray-500">
            Last updated: <span className="font-semibold text-gray-900">{updatedAt}</span>
          </p>
        </>
      )}
    </div>
  );
}
