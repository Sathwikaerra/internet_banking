"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, KeyRound, CheckCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [passwordStep, setPasswordStep] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOtp = () => {
    if (!loginId) return;
    setOtpSent(true);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const verifyOtp = () => {
    if (otp.join("") === "123456") setPasswordStep(true);
  };

  const updatePass = () => {
    if (newPass && newPass === confirmPass) {
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <Lock className="w-5 h-5" /> Reset Password
          </CardTitle>
          <CardDescription>Securely reset your NetBank password.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!otpSent && !passwordStep && (
            <>
              <Input
                placeholder="Enter Login ID / Customer ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600 w-full" onClick={handleOtp}>
                Send OTP
              </Button>
            </>
          )}

          {otpSent && !passwordStep && (
            <>
              <p className="text-sm font-medium text-gray-600">Enter OTP sent to mobile</p>
              <div className="flex gap-2">
                {otp.map((d, i) => (
                  <Input
                    key={i}
                    type="password"
                    maxLength={1}
                    className="w-10 h-10 text-center"
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    ref={(ref) => { otpRefs.current[i] = ref; }}
                  />
                ))}
              </div>
              <Button
                disabled={otp.join("").length < 6}
                onClick={verifyOtp}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Verify OTP
              </Button>
            </>
          )}

          {passwordStep && !success && (
            <>
              <Input
                type="password"
                placeholder="Enter New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <Button
                disabled={!newPass || newPass !== confirmPass}
                onClick={updatePass}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Update Password
              </Button>
            </>
          )}

          {success && (
            <div className="flex flex-col items-center text-green-600 gap-2">
              <CheckCircle className="w-10 h-10" />
              Password updated successfully! Redirecting…
            </div>
          )}

          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
