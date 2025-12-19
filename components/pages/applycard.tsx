"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

type CardType = "credit" | "debit"
type CardVariant = "classic" | "gold" | "platinum"

export default function ApplyCardPage() {
  const [cardType, setCardType] = useState<CardType>("credit")
  const [variant, setVariant] = useState<CardVariant>("classic")
  const [nameOnCard, setNameOnCard] = useState("SHIVA KRISHNA")
  const [cardNumber] = useState("**** **** **** 1234")
  const [expiry] = useState("12/28")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You can replace this with your API call
    alert("Card application submitted ✅")
  }

  const getVariantLabel = (v: CardVariant) => {
    if (v === "gold") return "Gold"
    if (v === "platinum") return "Platinum"
    return "Classic"
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid gap-6 md:grid-cols-[1.2fr,1fr]">
        {/* Left: Form */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-xl">Apply for a New Card</CardTitle>
            <p className="text-sm text-slate-400">
              Fill in your details to apply for a {cardType === "credit" ? "Credit" : "Debit"} Card.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Card Type & Variant */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Card Type</Label>
                  <Select
                    value={cardType}
                    onValueChange={(value) => setCardType(value as CardType)}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-50">
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Card Variant</Label>
                  <Select
                    value={variant}
                    onValueChange={(value) => setVariant(value as CardVariant)}
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-50">
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Name on Card */}
              <div className="space-y-2">
                <Label>Name on Card</Label>
                <Input
                  className="bg-slate-900 border-slate-700"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value.toUpperCase())}
                  placeholder="Enter name to be printed on card"
                />
              </div>

              {/* Income & Employment */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Monthly Income (₹)</Label>
                  <Input
                    type="number"
                    className="bg-slate-900 border-slate-700"
                    placeholder="e.g. 35,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select defaultValue="salaried">
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-50">
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self Employed</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label>Residential Address</Label>
                <Textarea
                  className="bg-slate-900 border-slate-700 min-h-[80px]"
                  placeholder="Flat / House no, Street, Area, City, Pincode"
                />
              </div>

              {/* Contact */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input
                    className="bg-slate-900 border-slate-700"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    className="bg-slate-900 border-slate-700"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-2">
                <Checkbox id="terms" className="mt-1 border-slate-600" />
                <Label
                  htmlFor="terms"
                  className="text-xs text-slate-400 leading-relaxed cursor-pointer"
                >
                  I confirm that the above information is correct and agree to the{" "}
                  <span className="underline underline-offset-2">Terms & Conditions</span> of the bank.
                </Label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-slate-50 text-slate-900 hover:bg-slate-200 font-medium"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right: Card Preview */}
        <Card className="bg-gradient-to-br from-slate-900 via-slate-950 to-black border-slate-800 flex items-center justify-center">
          <CardContent className="w-full flex items-center justify-center py-6">
            <div className="w-full max-w-xs aspect-[16/10] rounded-2xl relative overflow-hidden p-5 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl">
              {/* Bank Name */}
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Jayam Bank</span>
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  {cardType === "credit" ? "Credit" : "Debit"} • {getVariantLabel(variant)}
                </span>
              </div>

              {/* Chip + Contactless */}
              <div className="mt-5 flex justify-between items-center">
                <div className="w-10 h-7 rounded-md border border-slate-500 bg-slate-700/40" />
                <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                  Virtual Card
                </div>
              </div>

              {/* Number */}
              <div className="mt-6 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-[0.25em]">
                  Card Number
                </div>
                <div className="text-lg tracking-[0.25em] text-slate-50 font-medium">
                  {cardNumber}
                </div>
              </div>

              {/* Name & Expiry */}
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-[0.18em]">
                    Card Holder
                  </div>
                  <div className="text-xs text-slate-50 font-medium tracking-[0.18em] truncate max-w-[160px]">
                    {nameOnCard || "YOUR NAME HERE"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-[0.18em]">
                    Valid Thru
                  </div>
                  <div className="text-xs text-slate-50 tracking-[0.18em]">
                    {expiry}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-5 flex gap-1">
                <div className="w-6 h-6 rounded-full bg-slate-500/60" />
                <div className="w-6 h-6 rounded-full bg-slate-300/70 -ml-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}