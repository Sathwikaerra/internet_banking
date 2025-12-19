"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, PieChart, Target, Award, Plus } from "lucide-react"

export function Investments() {
  const portfolios = [
    {
      name: "Growth Portfolio",
      value: "₹3,25,000",
      return: "+12.5%",
      allocation: "60% Equity, 40% Debt",
      icon: TrendingUp,
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Conservative Portfolio",
      value: "₹1,50,000",
      return: "+8.2%",
      allocation: "30% Equity, 70% Debt",
      icon: Target,
      color: "from-green-400 to-green-600",
    },
    {
      name: "Gold Investments",
      value: "₹1,05,000",
      return: "+5.8%",
      allocation: "Pure Gold ETF",
      icon: Award,
      color: "from-yellow-400 to-yellow-600",
    },
  ]

  const holdings = [
    { id: 1, name: "HDFC Bank", quantity: 50, price: "₹1,650", value: "₹82,500", change: "+2.5%" },
    { id: 2, name: "TCS Ltd", quantity: 25, price: "₹3,200", value: "₹80,000", change: "+1.8%" },
    { id: 3, name: "Infosys Ltd", quantity: 30, price: "₹1,850", value: "₹55,500", change: "+3.2%" },
    { id: 4, name: "ICICI Bank", quantity: 40, price: "₹925", value: "₹37,000", change: "-1.2%" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-3 md:py-4 space-y-4">
      <div className="space-y-0.5">
        <h1 className="text-lg md:text-xl font-semibold text-foreground">Investment Portfolio</h1>
        <p className="text-[11px] md:text-xs text-muted-foreground">
          Manage your investments and track performance
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {portfolios.map((portfolio, idx) => {
          const Icon = portfolio.icon
          return (
            <Card
              key={idx}
              className="border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {/* removed top colored line */}
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-foreground">{portfolio.name}</h3>
                  <div className={`bg-gradient-to-br ${portfolio.color} p-2.5 rounded-md text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xl font-bold text-foreground">{portfolio.value}</p>
                <p className="text-[12px] text-green-600 font-semibold">{portfolio.return}</p>
                <p className="text-[11px] text-muted-foreground">{portfolio.allocation}</p>
                <Button className="w-full mt-2 bg-primary/10 text-primary hover:bg-primary/20 text-[12px] font-medium h-8">
                  View Details
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Holdings */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="px-4 py-3">
          <div className="flex justify-between items-center gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-[14px]">
                <PieChart className="w-4 h-4 text-primary" />
                Your Holdings
              </CardTitle>
              <CardDescription className="text-[11px]">
                Current stock portfolio performance
              </CardDescription>
            </div>
            <Button className="btn-radiant text-white flex items-center gap-1.5 text-[12px] h-8 px-3">
              <Plus className="w-3.5 h-3.5" />
              Add Investment
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-[12px]">
                  <th className="text-left py-2.5 px-2 font-semibold text-foreground">Security</th>
                  <th className="text-right py-2.5 px-2 font-semibold text-foreground">Quantity</th>
                  <th className="text-right py-2.5 px-2 font-semibold text-foreground">Price</th>
                  <th className="text-right py-2.5 px-2 font-semibold text-foreground">Value</th>
                  <th className="text-right py-2.5 px-2 font-semibold text-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr
                    key={holding.id}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors text-[12px]"
                  >
                    <td className="py-2.5 px-2 text-foreground font-medium">{holding.name}</td>
                    <td className="text-right py-2.5 px-2 text-muted-foreground">{holding.quantity}</td>
                    <td className="text-right py-2.5 px-2 text-muted-foreground">{holding.price}</td>
                    <td className="text-right py-2.5 px-2 font-semibold text-foreground">{holding.value}</td>
                    <td
                      className={`text-right py-2.5 px-2 font-semibold ${
                        holding.change.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {holding.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
