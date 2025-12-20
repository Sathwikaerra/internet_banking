
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  Mail,
  Lock,
  User,
  CreditCard,
  Smartphone,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

// Local images (make sure these files exist in public/images/)
import Bg1 from "@/public/images/internetbankingbg-1.png";
import Bg2 from "@/public/images/internetbankingbg-2.png";
import Bg3 from "@/public/images/internetbankingbg-3.png";
import JayamLogo from "@/public/images/jayam-logo.png";
import MobileLogo from "@/public/images/jayam-logo.png";
import { useRouter } from "next/navigation"

type AuthMethod = "loginId" | "debitCard" | "mobile";

export function LoginPage() {
  const { login } = useAuth();
const [showForgotLogin, setShowForgotLogin] = useState(false)
const [showForgotPassword, setShowForgotPassword] = useState(false)
const [forgotStep, setForgotStep] = useState<1 | 2 | 3 | 4>(1);
const [recoveryType, setRecoveryType] = useState<"loginId" | "password" | "">( "");

const router = useRouter()

  // ── MODE / FORM STATE ─────────────────────────────────
  const [authMethod, setAuthMethod] = useState<AuthMethod>("loginId");

  // Login ID mode
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Debit card mode
  const [debitCardNumber, setDebitCardNumber] = useState("");
  const [debitPin, setDebitPin] = useState("");

  // Mobile mode
  const [mobileNumber, setMobileNumber] = useState("");

  // Common UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Register modal
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    loginId: "",
    password: "",
    confirmPassword: "",
  });
  const [registerSuccess, setRegisterSuccess] = useState("");

  // OTP (shared for Debit & Mobile flows)
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Slider state (left side)
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgroundImages = [Bg1, Bg2, Bg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Reset OTP when switching mode
  useEffect(() => {
    setOtp(Array(6).fill(""));
    setOtpSent(false);
    setOtpError("");
    setOtpCountdown(0);
  }, [authMethod]);

  // OTP countdown
  useEffect(() => {
    if (!otpSent || otpCountdown <= 0) return;
    const timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpSent, otpCountdown]);

  const isOtpComplete = otp.every((d) => d !== "");
  const otpValue = otp.join("");

  // ── HELPERS ───────────────────────────────────────────

  // Use your existing navigation: for OTP flows we just log in with demo user
  const loginWithDemo = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login("demo123", "password", "personal"); // uses your existing logic
      if (!ok) {
        setError("Demo login failed. Please check your auth logic.");
      }
      setLoading(false);
    }, 600);
  };
// OTP handling for modal popup
const handleOtpModalChange = (index: number, value: string) => {
  if (!/^\d?$/.test(value)) return; // Only single digit

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // Jump to next if digit entered
  if (value && index < 5 && otpRefs.current[index + 1]) {
    otpRefs.current[index + 1]?.focus();
  }
};

const handleOtpModalKey = (
  index: number,
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    otpRefs.current[index - 1]?.focus();
  }
};

  const handleLoginIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const ok = login(loginId, loginPassword, "personal");
      if (!ok) {
        setError("Invalid credentials. Try demo123 / password");
      } else {
        setLoginId("");
        setLoginPassword("");
      }
      setLoading(false);
    }, 600);
  };

  const handleRequestOtp = () => {
    setError("");
    setOtpError("");

    if (authMethod === "debitCard") {
      if (!debitCardNumber || !debitPin) {
        setError("Please enter Debit Card Number and ATM PIN to receive OTP.");
        return;
      }
    }

    if (authMethod === "mobile") {
      if (!mobileNumber) {
        setError("Please enter your Mobile Number to receive OTP.");
        return;
      }
    }

    setOtpSent(true);
    setOtp(Array(6).fill(""));
    setOtpCountdown(60);
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setError("");

    if (!isOtpComplete) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }

    if (otpValue !== "123456") {
      setOtpError("Invalid OTP. Use 123456 for demo.");
      return;
    }

    // OTP is valid → login using demo user
    loginWithDemo();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess("");

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.dob ||
      !registerData.loginId ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterSuccess("Passwords do not match.");
      return;
    }

    // Simulate success
    setRegisterSuccess("Registration successful. You can now log in with your Login ID.");
    setShowRegister(false);
    setRegisterData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      loginId: "",
      password: "",
      confirmPassword: "",
    });
    setAuthMethod("loginId");
  };

  // Framer Motion variants for forms
  const formVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="relative min-h-screen flex items-stretch overflow-hidden bg-white">
      {/* LEFT SIDE SLIDER */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Background ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Prev / Next */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {backgroundImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-white w-8" : "bg-white/60 w-2"
              }`}
            />
          ))}
        </div>

        {/* Branding (left) */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
          <div className="flex justify-start">
            <div className="inline-flex items-center justify-center mb-4">
             
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="flex-1 w-full flex flex-col justify-center px-6 lg:px-16 bg-white">
        <div className="w-full max-w-xl mx-auto">
          {/* Mobile logo */}
          {/* <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-800 text-white mb-4 shadow-xl">
              <Image src={MobileLogo} alt="NetBank Logo" width={48} height={48} className="object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">NetBank</h1>
            <p className="text-muted-foreground font-medium">Secure Digital Banking</p>
          </div> */}

          <Card className="shadow-2xl border mt-5 border-gray-200 bg-white">
            <CardHeader className="space-y-4 pb-4">
              <div className="flex justify-center">
                <Image
                  src={JayamLogo}
                  alt="Jayam Bank Logo"
                  width={100}
                  height={50}
                  className="object-contain w-[120px] h-[80px]"
                />
              </div>

              {/* 3 Login Tabs */}
              <div className="relative flex gap-2 p-1 bg-gray-100 rounded-lg border border-gray-200">
                {/* Login ID Tab */}
                <button
                  type="button"
                  onClick={() => setAuthMethod("loginId")}
                  className="relative flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                >
                  {authMethod === "loginId" && (
                    <motion.div
                      layoutId="authTabHighlight"
                      className="absolute inset-0 bg-white rounded-md border border-gray-300 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2 z-10 text-gray-800">
                    <User className="w-4 h-4 text-yellow-400" />
                    <span className="hidden sm:inline text-[11px]">Login ID / Customer ID</span>
                    <span className="sm:hidden text-[11px]">Login ID</span>
                  </span>
                </button>

                {/* Debit Card Tab */}
                <button
                  type="button"
                  onClick={() => setAuthMethod("debitCard")}
                  className="relative flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                >
                  {authMethod === "debitCard" && (
                    <motion.div
                      layoutId="authTabHighlight"
                      className="absolute inset-0 bg-white rounded-md border border-gray-300 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2 z-10 text-gray-800">
                    <CreditCard className="w-4 h-4 text-yellow-400" />
                    <span className="hidden sm:inline text-[11px]">Debit Card</span>
                    <span className="sm:hidden text-[11px]">Card</span>
                  </span>
                </button>

                {/* Mobile Tab */}
                <button
                  type="button"
                  onClick={() => setAuthMethod("mobile")}
                  className="relative flex-1 py-2 px-3 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
                >
                  {authMethod === "mobile" && (
                    <motion.div
                      layoutId="authTabHighlight"
                      className="absolute inset-0 bg-white rounded-md border border-gray-300 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2 z-10 text-gray-800">
                    <Smartphone className="w-4 h-4 text-yellow-400" />
                    <span className="hidden sm:inline text-[11px]">Mobile Number</span>
                    <span className="sm:hidden text-[11px]">Mobile</span>
                  </span>
                </button>
              </div>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="mb-4 flex items-center gap-3 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {registerSuccess && (
                <div className="mb-4 flex items-center gap-3 p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm font-medium">{registerSuccess}</p>
                </div>
              )}

              {/* LOGIN ID FORM */}
              {authMethod === "loginId" && (
                <motion.form
                  onSubmit={handleLoginIdSubmit}
                  className="space-y-4"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Login ID */}
                  <div className="space-y-2">
                    <label
                      htmlFor="loginId"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-yellow-400" />
                      Login ID / Customer ID
                    </label>
                    <Input
                      id="loginId"
                      type="text"
                      placeholder="Enter your Login ID / Customer ID"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      disabled={loading}
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="loginPassword"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-yellow-400" />
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="loginPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        disabled={loading}
                        className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* First time user */}
                  <div className="flex justify-between items-center text-xs">
<div className="flex gap-3">
  <button
  type="button"
  className="text-gray-600 hover:text-yellow-400"
  onClick={() => {
    setRecoveryType("loginId");
    setForgotStep(1);
    setShowForgotLogin(true);
  }}
>
  Forgot Login ID?
</button>

  <span className="text-gray-400">|</span>

  <button
  type="button"
  className="text-gray-600 hover:text-yellow-400"
  onClick={() => {
    setRecoveryType("password");
    setForgotStep(1);
    setShowForgotPassword(true);
  }}
>
  Forgot Password?
</button>

</div>
                    <button
                      type="button"
                      onClick={() => setShowRegister(true)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      First time user? Register here
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-radiant text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Signing in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </motion.form>
              )}

              {/* DEBIT CARD + MOBILE (OTP FLOW) */}
              {authMethod !== "loginId" && (
                <motion.form
                  onSubmit={handleOtpLogin}
                  className="space-y-4"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {authMethod === "debitCard" && (
                    <>
                      {/* Debit Card Number */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-yellow-400" />
                          Debit Card Number
                        </label>
                        <Input
                          type="text"
                          maxLength={16}
                          placeholder="Enter 16-digit card number"
                          value={debitCardNumber}
                          onChange={(e) =>
                            setDebitCardNumber(e.target.value.replace(/\D/g, ""))
                          }
                          disabled={loading}
                          className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>

                      {/* ATM PIN */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Lock className="w-4 h-4 text-yellow-400" />
                          ATM PIN
                        </label>
                        <Input
                          type="password"
                          maxLength={6}
                          placeholder="Enter ATM PIN"
                          value={debitPin}
                          onChange={(e) =>
                            setDebitPin(e.target.value.replace(/\D/g, ""))
                          }
                          disabled={loading}
                          className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </>
                  )}

                  {authMethod === "mobile" && (
                    <>
                      {/* Mobile Number */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-yellow-400" />
                          Registered Mobile Number
                        </label>
                        <Input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter your mobile number"
                          value={mobileNumber}
                          onChange={(e) =>
                            setMobileNumber(e.target.value.replace(/\D/g, ""))
                          }
                          disabled={loading}
                          className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </>
                  )}

                  {/* Get OTP Button */}
                  {!otpSent && (
                    <Button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={loading}
                      className="w-full bg-gray-900 btn-radiant text-white font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Get OTP
                    </Button>
                  )}

                  {/* OTP Inputs */}
                  {otpSent && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Enter 6-digit OTP
                        </label>
                        <div className="flex justify-start gap-2">
                          {otp.map((digit, idx) => (
                            <Input
                              key={idx}
                              type="password"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(idx, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                              ref={(el) => {otpRefs.current[idx] = el}}
                              className="w-9 h-9 text-center text-sm bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          ))}
                        </div>
                      </div>

                      {otpError && <p className="text-[11px] text-red-500">{otpError}</p>}

                      {/* Timer + Resend */}
                    <div className="flex justify-between text-[11px] text-gray-600">
  <span className="font-semibold">
    {otpCountdown > 0 ? (
      <>
        Resend OTP in{" "}
        <span className="text-yellow-500">
          00:{String(otpCountdown).padStart(2, "0")}
        </span>
      </>
    ) : (
      "Didn't receive OTP?"
    )}
  </span>

  {otpCountdown === 0 && (
    <button
      type="button"
      onClick={handleRequestOtp}
      className="text-blue-600 font-semibold hover:underline"
    >
      Resend OTP
    </button>
  )}
</div>


                      <Button
                        type="submit"
                        disabled={loading || !isOtpComplete}
                        className="w-full btn-radiant text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 hover:shadow-xl"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                            Verifying...
                          </span>
                        ) : (
                          "Login Securely"
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Register link under OTP methods as well */}
                  <div className="text-center text-xs text-muted-foreground mt-2">
                    New to NetBank?{" "}
                    <button
                      type="button"
                      onClick={() => setShowRegister(true)}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Register here
                    </button>
                  </div>
                </motion.form>
              )}
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © 2025 NetBank. All rights reserved.
          </p>
        </div>
      </div>

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-yellow-400" />
                Register for NetBank
              </CardTitle>
              <CardDescription>
                Fill the details to create your NetBank login.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Grid layout side-by-side inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-yellow-400" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-yellow-400" />
                      Mobile Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, phone: e.target.value })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-yellow-400" />
                      Email ID
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* DOB */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4 text-yellow-400" />
                      Date of Birth
                    </label>
                    <Input
                      type="date"
                      value={registerData.dob}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, dob: e.target.value })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Login ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-yellow-400" />
                      Create Login ID
                    </label>
                    <Input
                      type="text"
                      placeholder="Choose a Login ID"
                      value={registerData.loginId}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, loginId: e.target.value })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4 text-yellow-400" />
                      Create Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Create password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Lock className="w-4 h-4 text-yellow-400" />
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Re-enter password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowRegister(false);
                      setRegisterData({
                        name: "",
                        email: "",
                        phone: "",
                        dob: "",
                        loginId: "",
                        password: "",
                        confirmPassword: "",
                      });
                    }}
                    className="flex-1 bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-radiant text-white font-semibold">
                    Register
                  </Button>
                </div>

                <p className="text-[11px] text-muted-foreground text-center mt-2">
                  After registration, you can login using your new Login ID, Debit Card + OTP, or
                  Mobile + OTP.
                </p>
              </form>
            </CardContent>
          </Card>

       
        </div>
        
      )}
    {/* FORGOT RECOVERY MODAL — Step Based */}
{(showForgotLogin || showForgotPassword) && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <Card 
    className="w-full max-w-md p-6 bg-white shadow-xl">
      
      {/* Step: MODAL HEADER */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-500">
          {recoveryType === "loginId" ? (
            <>
              <User className="w-5 h-5" />
              Recover Login ID
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Reset Password
            </>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* STEP 1 — Info + Proceed */}
        {forgotStep === 1 && (
          <div className="space-y-4 text-sm text-gray-700">
            {recoveryType === "loginId" ? (
              <>
                <p>✔ Enter your registered mobile number</p>
                <p>✔ We will send an OTP to verify you</p>
                <p>✔ After verification, your Login ID will be displayed</p>
              </>
            ) : (
              <>
                <p>✔ Enter your Login ID / Customer ID</p>
                <p>✔ Verify with OTP sent to mobile/email</p>
                <p>✔ Set a new secure password</p>
              </>
            )}

            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={() => setForgotStep(2)}
            >
              Proceed
            </Button>

            <Button
              variant="ghost"
              className="w-full text-gray-600 hover:text-black"
              onClick={() => {
                setForgotStep(1);
                setShowForgotLogin(false);
                setShowForgotPassword(false);
                setRecoveryType("");
              }}
            >
              Close
            </Button>
          </div>
        )}

        {/* STEP 2 — Mobile + OTP */}
        {forgotStep === 2 && (
          <div className="space-y-4">
            <Input placeholder="Enter registered mobile number" maxLength={10} className="bg-gray-50" />
            
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              onClick={() => setForgotStep(3)}
            >
              Send OTP
            </Button>
          </div>
        )}

        {/* STEP 3 — OTP Input */}
    {/* STEP 3 — OTP Input */}
{forgotStep === 3 && (
  <div className="space-y-4">
    <p className="text-sm text-gray-700">Enter the OTP sent to your mobile</p>

    <div className="flex gap-2 justify-center">
      {otp.map((digit, idx) => (
        <Input
          key={idx}
          type="password"
          inputMode="numeric"
          maxLength={1}
          className="w-10 h-10 text-center text-lg bg-gray-50 border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          value={digit}
          onChange={(e) => handleOtpModalChange(idx, e.target.value)}
          onKeyDown={(e) => handleOtpModalKey(idx, e)}
          // ref={(el) => (otpRefs.current[idx] = el)}
            ref={(el) => {
    otpRefs.current[idx] = el;
  }}
        />
      ))}
    </div>

    <Button
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
      disabled={!otp.every((v) => v)}
      onClick={() =>
        recoveryType === "loginId" ? setForgotStep(4) : setForgotStep(4)
      }
    >
      Verify OTP
    </Button>
  </div>
)}


        {/* STEP 4 — Final Actions */}
        {forgotStep === 4 && recoveryType === "loginId" && (
          <div className="text-center space-y-4 text-sm">
            <p className="font-semibold">Your Login ID:</p>
            <p className="text-lg font-bold text-gray-900">JA12345</p>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setForgotStep(1);
                setShowForgotLogin(false);
                setRecoveryType("");
              }}
            >
              Back to Login
            </Button>
          </div>
        )}

        {forgotStep === 4 && recoveryType === "password" && (
          <div className="space-y-4">
            <p className="text-sm font-medium">Set New Password</p>
            <Input type="password" placeholder="New Password" maxLength={8} />
            <Input type="password" placeholder="Confirm Password" maxLength={8} />

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setForgotStep(1);
                setShowForgotPassword(false);
                setRecoveryType("");
              }}
            >
              Save Password
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
)}

    </div>
    
  );
}
