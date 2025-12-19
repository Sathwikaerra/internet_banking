"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecoverLoginIdPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSuccess, setIsSuccess] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = () => {
    if (!mobile || mobile.length !== 10) return;
    setOtpSent(true);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleVerify = () => {
    if (otp.join("") === "123456") {
      setIsSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <Smartphone className="w-5 h-5" /> Recover Login ID
          </CardTitle>
          <CardDescription>Enter mobile number registered with your bank.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!otpSent && !isSuccess && (
            <>
              <Input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter Mobile Number"
              />
              <Button
                onClick={handleSendOtp}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Send OTP
              </Button>
            </>
          )}

          {/* OTP Section */}
          {otpSent && !isSuccess && (
            <>
              <p className="text-sm font-medium text-gray-600">Enter OTP (Use: 123456 Demo)</p>
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
                onClick={handleVerify}
                className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Verify OTP
              </Button>
            </>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="flex flex-col items-center text-center gap-2">
              <CheckCircle className="w-10 h-10 text-green-500" />
              <p className="font-semibold text-green-600">
                Login ID sent to your registered mobile! Redirecting…
              </p>
            </div>
          )}

          {/* Back Button */}
          <Button
            variant="ghost"
            className="mt-2 text-gray-600 hover:text-black w-full flex items-center justify-center gap-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
