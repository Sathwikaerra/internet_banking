"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ---------------- Images ---------------- */
import Bg1 from "@/public/images/internetbankingbg-1.png";
import Bg2 from "@/public/images/internetbankingbg-2.png";
import Bg3 from "@/public/images/internetbankingbg-3.png";
import JayamLogo from "@/public/images/jayam-logo.png";
import RegisterVerification from "../pages/RegisterVerification";
export function LoginPage() {
  const { login } = useAuth();

  /* ---------------- Login ---------------- */
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- Register ---------------- */
  const [showRegister, setShowRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    loginId: "",
    password: "",
    confirmPassword: "",
  });

  /* ---------------- Forgot Flow ---------------- */
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3 | 4>(1);
  const [recoveryType, setRecoveryType] =
    useState<"loginId" | "password" | "">("");

  /* ---------------- Slider ---------------- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgroundImages = [Bg1, Bg2, Bg3];
const [registerStep, setRegisterStep] = useState<1 | 2 | 3>(1);

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

  /* ---------------- Register Submit ---------------- */
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
      setRegisterSuccess("Please fill all fields");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterSuccess("Passwords do not match");
      return;
    }

    setRegisterSuccess("Registration successful. Please login.");
    setShowRegister(false);
  };

  /* ---------------- Animations ---------------- */
  const formVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* LEFT SLIDER */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {backgroundImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={img} alt="Banking" fill className="object-cover" />
          </div>
        ))}
        <button
          onClick={() =>
            setCurrentSlide(
              (p) =>
                (p - 1 + backgroundImages.length) %
                backgroundImages.length
            )
          }
          className="absolute left-4 top-1/2 bg-black/40 text-white p-3 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((p) => (p + 1) % backgroundImages.length)
          }
          className="absolute right-4 top-1/2 bg-black/40 text-white p-3 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <Image
                src={JayamLogo}
                alt="Jayam Bank"
                width={120}
                height={60}
                className="mx-auto mb-2"
              />
             
            </CardHeader>

            <CardContent>
              {error && (
                <div className="mb-4 flex gap-2 p-3 bg-red-50 text-red-600 border rounded">
                  <AlertCircle /> {error}
                </div>
              )}

              {registerSuccess && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 border rounded">
                  {registerSuccess}
                </div>
              )}

              <motion.form
                onSubmit={handleLogin}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <User className="w-4 h-4 text-yellow-500" />
                    Login ID / Customer ID
                  </label>
                  <Input
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter Login ID"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Lock className="w-4 h-4 text-yellow-500" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* FORGOT LINKS */}
                <div className="flex justify-between text-xs">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="hover:text-yellow-500"
                      onClick={() => {
                        setRecoveryType("loginId");
                        setForgotStep(1);
                        setShowForgotModal(true);
                      }}
                    >
                      Forgot Login ID?
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      className="hover:text-yellow-500"
                      onClick={() => {
                        setRecoveryType("password");
                        setForgotStep(1);
                        setShowForgotModal(true);
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="button"
                    className="text-blue-600 font-semibold"
                    onClick={() => setShowRegister(true)}
                  >
                   New Register
                  </button>
                </div>

                <Button className="w-full btn-radiant" disabled={loading}>
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
          <Card className="w-full max-w-md p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {recoveryType === "loginId" ? (
                  <>
                    <User className="text-yellow-500" />
                    Recover Login ID
                  </>
                ) : (
                  <>
                    <Lock className="text-yellow-500" />
                    Reset Password
                  </>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              {forgotStep === 1 && (
                <>
                  <p>✔ Verify your registered mobile number</p>
                  <p>✔ OTP will be sent for verification</p>
                  <Button
                    className="w-full"
                    onClick={() => setForgotStep(4)}
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

              {forgotStep === 4 && recoveryType === "loginId" && (
                <>
                  <p className="font-semibold">Your Login ID</p>
                  <p className="text-lg font-bold">JA12345</p>
                  <Button
                    className="w-full"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Back to Login
                  </Button>
                </>
              )}

              {forgotStep === 4 && recoveryType === "password" && (
                <>
                  <Input type="password" placeholder="New Password" />
                  <Input type="password" placeholder="Confirm Password" />
                  <Button
                    className="w-full"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Save Password
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* REGISTER MODAL */}
     {/* REGISTER VERIFICATION POPUP */}
{showRegister && (
  <RegisterVerification
    onClose={() => setShowRegister(false)}
  />
)}



    </div>
  );
}