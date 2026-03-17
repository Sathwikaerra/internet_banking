


import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth-context";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Check } from "lucide-react";

import {
  AlertCircle,
  Lock,
  User,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";




import RegisterVerification from "../pages/RegisterVerification";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  /* ---------------- Login ---------------- */
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- Register ---------------- */
  const [showRegister, setShowRegister] = useState(false);

  /* ---------------- Forgot Flow ---------------- */
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryType, setRecoveryType] =
    useState<"loginId" | "password" | "">("");
  const [forgotStep, setForgotStep] = useState(1);

  const [mobile, setMobile] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  /* ---------------- Slider ---------------- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgroundImages = ["/images/internetbankingbg-1.png", "/images/internetbankingbg-2.png", "/images/internetbankingbg-3.png"];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % backgroundImages.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  /* ---------------- Login Submit ---------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const ok = login(loginId, loginPassword, "personal");
      if (!ok) setError("Invalid credentials. Try demo123 / password");
      setLoading(false);
    }, 600);
  };
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  /* ---------------- Forgot Logic ---------------- */

  const resetForgotState = () => {
    setForgotStep(1);
    setMobile("");
    setCustomerId("");
    setDob("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setForgotError("");
    setForgotSuccess("");
  };

  const handleVerifyLoginId = () => {
    if (mobile === "9876543210" && dob === "2026-01-01") {
      setForgotSuccess("Your Login ID is: JYM2025001");
      setForgotError("");
      setForgotStep(3);
    } else {
      setForgotError("Invalid mobile number or Date of Birth.");
    }
  };

  const handleVerifyPasswordDetails = () => {
    if (customerId === "JYM2025001" && dob === "2026-01-01") {
      setForgotError("");
      setForgotStep(3);
    } else {
      setForgotError("Invalid Customer ID or Date of Birth.");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join("") === "123456") {
      setForgotError("");
      setForgotStep(4);
    } else {
      setForgotError("Invalid OTP. Please try again.");
    }
  };


  const handleSaveNewPassword = () => {
    if (!newPassword || !confirmPassword) {
      setForgotError("Please fill all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match.");
      return;
    }
    setForgotError("");
    setForgotSuccess("Password reset successful.");
    setForgotStep(5);
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">

      {/* LEFT SLIDER */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {backgroundImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={img} alt="Banking" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <img
                src="/images/jayam-logo.png"
                alt="Jayam Bank"
                width={120}
                className="mx-auto mb-2"
              />
            </CardHeader>

            <CardContent>

              {error && (
                <div className="mb-4 flex gap-2 p-3 bg-red-50 text-red-600 border rounded">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <motion.form
                onSubmit={handleLogin}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <User className="w-4 h-4 text-yellow-500 " />
                    Login ID
                  </label>
                  <Input
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter Login ID"
                    style={{ fontSize: "11px" }}

                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Lock className="w-4 h-4 text-yellow-500" />
                    Password
                  </label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="pr-10"
                      style={{ fontSize: "11px" }}
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>


                <div className="flex justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryType("loginId");
                      resetForgotState();
                      setShowForgotModal(true);
                    }}
                  >
                    Forgot Login ID?
                  </button>
                  <span>|</span>
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryType("password");
                      resetForgotState();
                      setShowForgotModal(true);
                    }}
                  >
                    Forgot Password?
                  </button>
                  <span>|</span>

                  <button
                    type="button"
                    className="text-blue-600 font-semibold"
                    onClick={() => setShowRegister(true)}
                  >
                    New Register
                  </button>
                </div>

                <Button className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </Button>

              </motion.form>
            </CardContent>
          </Card>

          <p className="text-center text-xs mt-6 text-gray-400">
            © 2025 NetBank. All rights reserved.
          </p>
        </div>
      </div>

      {/* FORGOT MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-4 relative">

            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute right-4 top-4"
            >
              <X size={16} />
            </button>

            <CardHeader>
              <CardTitle>
                {recoveryType === "loginId"
                  ? "Recover Login ID"
                  : "Reset Password"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              {forgotError && (
                <p className="text-sm text-red-600">{forgotError}</p>
              )}

              {forgotSuccess && (
                <p className="text-sm text-green-600">{forgotSuccess}</p>
              )}

              {forgotStep === 1 && (
                <>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-yellow-500 mt-[2px]" />
                      <p>Verify with your registered mobile number</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-yellow-500 mt-[2px]" />
                      <p>Verify with your DOB</p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setForgotStep(2)}
                  >
                    Proceed
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Close
                  </Button>
                </>
              )}

              {forgotStep === 2 && recoveryType === "loginId" && (
                <>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Smartphone className="w-4 h-4 text-yellow-500 " />
                    Mobile Number
                  </label>
                  <Input
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{ fontSize: "10px" }}

                  />

                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 text-yellow-500 " />
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{ fontSize: "10px" }}

                  />





                  <Button
                    className="w-full"
                    onClick={handleVerifyLoginId}
                  >
                    Verify
                  </Button>
                </>
              )}

              {forgotStep === 2 && recoveryType === "password" && (
                <>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <User className="w-4 h-4 text-yellow-500 " />
                    Customer ID
                  </label>
                  <Input
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    style={{ fontSize: "10px" }}

                  />

                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 text-yellow-500 " />
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    style={{ fontSize: "10px" }}

                  />

                  <Button
                    className="w-full"
                    onClick={handleVerifyPasswordDetails}
                  >
                    Verify & Send OTP
                  </Button>
                </>
              )}

              {forgotStep === 3 && recoveryType === "password" && (
                <>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3">
                    <Smartphone className="w-4 h-4 text-yellow-500" />
                    Enter OTP sent to mobile
                  </label>

                  <div className="flex justify-between gap-2 mb-4">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        value={digit}
                        maxLength={1}
                        onChange={(e) =>
                          handleOtpChange(e.target.value, index)
                        }
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="text-center text-lg font-semibold"
                        style={{
                          width: "45px",
                          height: "45px",
                          fontSize: "18px",
                        }}
                      />
                    ))}
                  </div>

                  <Button className="w-full" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                </>
              )}


              {forgotStep === 4 && (
                <>
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Lock className="w-4 h-4 text-yellow-500 " />
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="New Password"
                    style={{ fontSize: "10px" }}

                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                  />
                  <label className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Lock className="w-4 h-4 text-yellow-500 " />
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    style={{ fontSize: "10px" }}

                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)

                    }
                  />


                  <Button
                    className="w-full"
                    onClick={handleSaveNewPassword}
                  >
                    Save Password
                  </Button>
                </>
              )}

            </CardContent>
          </Card>
        </div>
      )}

      {showRegister && (
        <RegisterVerification onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}
