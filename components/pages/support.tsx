"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageSquare, Phone, Mail, Clock, BookOpen } from "lucide-react"

export function Support() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email.",
    },
    {
      question: "What are the transaction limits?",
      answer:
        "For personal accounts, daily transfer limit is ₹5 lakhs. For corporate accounts, limits vary based on agreement.",
    },
    {
      question: "How long do transfers take?",
      answer: "NEFT transfers typically take 1-2 hours. RTGS is immediate during banking hours. IMPS is instant.",
    },
    {
      question: "Is my account secure?",
      answer: "Yes, we use 256-bit encryption and multi-factor authentication to ensure your account security.",
    },
  ]

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      detail: "24/7 Customer Care",
      value: "1800-1234-567",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      detail: "Response within 24 hours",
      value: "support@netbank.com",
      color: "from-green-400 to-green-600",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      detail: "Chat with support team",
      value: "Click to start chat",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Clock,
      title: "Contact Hours",
      detail: "Banking hours support",
      value: "9 AM - 6 PM (Mon-Fri)",
      color: "from-orange-400 to-orange-600",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Customer Support</h1>
        <p className="text-muted-foreground">Get help with your NetBank account</p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportChannels.map((channel, idx) => {
          const Icon = channel.icon
          return (
            <Card
              key={idx}
              className="border-0 shadow-lg hover:shadow-2xl transition-all card-hover overflow-hidden cursor-pointer"
            >
              <div className={`h-1 bg-gradient-to-r ${channel.color}`} />
              <CardContent className="p-6">
                <div className={`bg-gradient-to-br ${channel.color} p-4 rounded-lg text-white mb-4 w-fit`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{channel.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{channel.detail}</p>
                <p className="font-medium text-primary text-sm">{channel.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="border-0 shadow-lg card-hover overflow-hidden">
              <CardContent className="p-6">
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-foreground hover:text-primary transition-colors">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      {faq.question}
                    </span>
                    <span className="group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 pl-8 text-muted-foreground">{faq.answer}</p>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <Card className="border-0 shadow-lg card-hover">
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
          <CardDescription>We'll get back to you within 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary outline-none resize-none"
            />
            <Button className="btn-radiant text-white font-semibold w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
