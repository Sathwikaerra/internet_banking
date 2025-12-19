"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, Unlock, Shield, AlertCircle, Plus } from "lucide-react"

export function Cards() {
  const [showCVV, setShowCVV] = useState<number | null>(null)
  const [blockedCards, setBlockedCards] = useState<number[]>([])

  const cards = [
    {
      id: 1,
      type: "Debit",
      name: "NetBank Premium Debit",
      number: "2314 3210 4321 5678",
      holder: "PRASANTH TAMIRE",
      expiry: "12/26",
      cvv: "123",
      status: "Active",
    },
    {
      id: 2,
      type: "Credit",
      name: "NetBank Elite Credit",
      number: "5234 1234 5678 9012",
      holder: "PRASANTH TAMIRE",
      expiry: "08/25",
      cvv: "456",
      status: "Active",
    },
  ]

  const toggleCardBlock = (cardId: number) => {
    setBlockedCards((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
  }

  // Function to mask card number (show only last 4 digits)
  const maskCardNumber = (cardNumber: string) => {
    return `•••• •••• •••• ${cardNumber.slice(-4)}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-3 space-y-4">
      {/* Heading */}
      <div className="space-y-0.5">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">Your Cards</h1>
        <p className="text-sm text-gray-600">
          Manage your debit and credit cards securely
        </p>
      </div>

      {/* Cards grid – 2 side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => {
          const isBlocked = blockedCards.includes(card.id)

          return (
            <Card
              key={card.id}
              className="border border-gray-200 shadow-sm"
            >
              <CardContent className="p-4 space-y-4">
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{card.name}</h3>
                    <p className="text-sm text-gray-600">{card.type} Card</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                      }`}
                  >
                    {isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>

                {/* Card visual */}
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <p className="text-xs text-gray-300 mb-2">Card Number</p>
                  <p className="font-mono text-lg tracking-widest mb-4">{maskCardNumber(card.number)}</p>
                  <div className="flex justify-between items-end text-sm">
                    <div>
                      <p className="text-xs text-gray-300 mb-1">Card Holder</p>
                      <p className="font-semibold">{card.holder}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-300">Valid Thru</p>
                      <p className="font-semibold">{card.expiry}</p>
                    </div>
                  </div>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-2 gap-4 mb-2 p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Holder</p>
                    <p className="text-sm font-semibold text-gray-900">{card.holder}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Expiry</p>
                    <p className="text-sm font-semibold text-gray-900">{card.expiry}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-600">CVV</p>
                      <button
                        onClick={() => setShowCVV(showCVV === card.id ? null : card.id)}
                        className="text-gray-600 hover:text-gray-900"
                        type="button"
                      >
                        {showCVV === card.id ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="font-mono font-semibold text-sm text-gray-900">
                      {showCVV === card.id ? card.cvv : "•••"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Status</p>
                    <p className="text-sm font-semibold text-gray-900">{card.status}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => toggleCardBlock(card.id)}
                    className={`flex-1 ${isBlocked
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                      : "bg-red-100 hover:bg-red-200 text-red-700 border border-red-300"
                      }`}
                  >
                    {isBlocked ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                    {isBlocked ? "Unblock" : "Block"}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    View Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Card Services */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5" />
            Card Services
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Request New Card
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            Reset PIN
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            Report Lost Card
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            Card Benefits
          </Button>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Security Tips</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Never share your CVV or PIN with anyone</li>
                <li>✓ Use 3D Secure for online transactions</li>
                <li>✓ Block your card immediately if lost</li>
                <li>✓ Monitor your transactions regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}