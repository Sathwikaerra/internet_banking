"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  CheckCircle,
  AlertCircle,
  User,
  Lock,
  Bell,
  Shield,
} from "lucide-react"

export function ProfileSettings() {
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState("profile")
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword === passwordData.confirmPassword) {
      setSaveSuccess(true)
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 py-3 md:py-4 space-y-4">

      {/* Heading */}
      <div className="space-y-0.5">
        <h1 className="text-base md:text-lg font-semibold text-foreground">
          Profile & Settings
        </h1>
        <p className="text-[12px] md:text-[13px] text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {/* Success banner */}
      {saveSuccess && (
        <Card className="border border-green-200 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-3 flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-[13px] text-green-700 font-semibold">
              Changes saved successfully!
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Profile Overview */}
        <Card className="lg:col-span-1 border border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-semibold mx-auto mb-3">
                {user?.name?.charAt(0)}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-0.5">
                {user?.name}
              </h3>
              <p className="text-[12px] text-muted-foreground">
                {user?.email}
              </p>
              <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-semibold">
                {user?.loginType === "personal" ? "Individual Account" : "Corporate Account"}
              </span>
            </div>

            <div className="space-y-3 border-t pt-3">
              <div className="p-3 bg-secondary/50 rounded-lg">
                <p className="text-[11px] text-muted-foreground mb-0.5 font-medium">
                  User ID
                </p>
                <p className="text-[13px] font-semibold text-foreground">
                  USR-2024-{Math.random().toString().slice(2, 8)}
                </p>
              </div>

              <div className="p-3 bg-secondary/50 rounded-lg">
                <p className="text-[11px] text-muted-foreground mb-0.5 font-medium">
                  Member Since
                </p>
                <p className="text-[13px] font-semibold text-foreground">
                  January 2023
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-[11px] text-green-700 mb-0.5 font-medium">
                  Account Status
                </p>
                <p className="text-[13px] font-semibold text-green-900">
                  Active & Verified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Card className="lg:col-span-2 border border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4 h-9">
                <TabsTrigger value="profile" className="flex items-center gap-1.5 text-[13px]">
                  <User className="w-4 h-4" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-1.5 text-[13px]">
                  <Lock className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-1.5 text-[13px]">
                  <Bell className="w-4 h-4" />
                  Alerts
                </TabsTrigger>
              </TabsList>

              {/* Profile tab */}
              <TabsContent value="profile" className="space-y-4 mt-4">
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="text-[13px] font-semibold text-foreground block mb-1.5">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="h-9 text-[14px]"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-semibold text-foreground block mb-1.5">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="h-9 text-[14px]"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-semibold text-foreground block mb-1.5">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      className="h-9 text-[14px]"
                    />
                  </div>

                  <Button className="w-full h-9 text-[14px] font-semibold">
                    Save Changes
                  </Button>
                </form>
              </TabsContent>

              {/* Security tab */}
              <TabsContent value="security" className="space-y-4 mt-4">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg flex gap-2.5 border border-blue-200">
                    <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <p className="text-[13px] text-blue-700 font-medium">
                      Use a strong password with at least 8 characters
                    </p>
                  </div>

                  <Input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="h-9 text-[14px]"
                  />

                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="h-9 text-[14px]"
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="h-9 text-[14px]"
                  />

                  <Button className="w-full h-9 text-[14px] font-semibold">
                    Change Password
                  </Button>
                </form>
              </TabsContent>

              {/* Notifications tab */}
              <TabsContent value="notifications" className="space-y-3 mt-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email" },
                  { label: "SMS Alerts", desc: "Get transaction alerts via SMS" },
                  { label: "Security Alerts", desc: "Get notified of account changes" },
                ].map((n) => (
                  <div
                    key={n.label}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="text-[14px] font-semibold">
                        {n.label}
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        {n.desc}
                      </p>
                    </div>
                    <input type="checkbox" className="w-4 h-4 accent-primary cursor-pointer" />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card className="border border-purple-200 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="py-3 px-4">
          <CardTitle className="flex items-center gap-2 text-[15px] text-purple-900">
            <Shield className="w-4 h-4" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4 pt-0">
          <div className="p-3 bg-white/60 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-purple-900">
                Two-Factor Authentication
              </p>
              <p className="text-[12px] text-purple-700 mt-0.5">
                Add an extra layer of security
              </p>
            </div>
            <Button className="h-9 text-[13px] font-semibold bg-purple-600 hover:bg-purple-700">
              Enable
            </Button>
          </div>

          <div className="p-3 bg-white/60 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-purple-900">
                Biometric Login
              </p>
              <p className="text-[12px] text-purple-700 mt-0.5">
                Use fingerprint or face recognition
              </p>
            </div>
            <input type="checkbox" className="w-4 h-4 accent-purple-600 cursor-pointer" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
