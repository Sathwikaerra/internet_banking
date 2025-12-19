"use client"

import React from "react"

const rewardsSummary = {
  totalPoints: 2450,
  tier: "Silver",
  nextTier: "Gold",
  pointsToNextTier: 550,
}

const recentRewards = [
  {
    id: 1,
    title: "Online Bill Payment",
    date: "10 Dec 2025",
    points: "+50",
  },
  {
    id: 2,
    title: "Debit Card Purchase",
    date: "08 Dec 2025",
    points: "+120",
  },
  {
    id: 3,
    title: "Fuel Payment",
    date: "05 Dec 2025",
    points: "+30",
  },
]

const offers = [
  {
    id: 1,
    title: "Convert 1000 points → ₹200 voucher",
    description: "Use your points to get shopping vouchers instantly.",
  },
  {
    id: 2,
    title: "Cashback Boost Weekend",
    description: "Earn 2x reward points on online payments this weekend.",
  },
]

export function Rewards() {
  const progressPercent =
    (rewardsSummary.totalPoints /
      (rewardsSummary.totalPoints + rewardsSummary.pointsToNextTier)) *
    100

  return (
    <div className="min-h-[80vh] w-full bg-slate-950 text-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Rewards</h1>
          <p className="text-sm text-slate-400">
            Track your reward points, tier status and redeemable offers.
          </p>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Total Points
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {rewardsSummary.totalPoints.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Use your points for vouchers & cashback.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Current Tier
            </p>
            <p className="mt-2 text-lg font-semibold">
              {rewardsSummary.tier} Member
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {rewardsSummary.pointsToNextTier} points to reach{" "}
              <span className="font-medium text-slate-200">
                {rewardsSummary.nextTier}
              </span>
              .
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Progress to Next Tier
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-slate-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Keep using your card and online banking to earn more points.
            </p>
          </div>
        </div>

        {/* Recent Rewards & Offers */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Rewards */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium">Recent Reward Activity</h2>
              <span className="text-[11px] text-slate-500">Last 7 days</span>
            </div>
            <div className="space-y-3 mt-2">
              {recentRewards.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/80 px-3 py-2"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-100">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.date}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-50">
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Offers */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-medium mb-2">Redeem & Offers</h2>
            <div className="space-y-3 mt-2">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-lg border border-slate-800/80 bg-slate-900/80 px-3 py-3"
                >
                  <p className="text-xs font-medium text-slate-100">
                    {offer.title}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {offer.description}
                  </p>
                  <button className="mt-2 inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-100 hover:bg-slate-800">
                    View details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-[11px] text-slate-500">
          *Reward points are updated within 24–48 hours of a successful
          transaction.
        </p>
      </div>
    </div>
  )
}
