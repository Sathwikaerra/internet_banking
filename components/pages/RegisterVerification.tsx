// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ArrowLeft, CheckCircle, Info, X } from "lucide-react";

// type Step = 1 | 2 | 3 | 4;

// export default function FirstTimeUserRegistrationPopup({
//   onClose,
// }: {
//   onClose: () => void;
// }) {
//   const [step, setStep] = useState<Step>(1);

//   const [customerId, setCustomerId] = useState("");
//   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
//   const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const [loginPassword, setLoginPassword] = useState("");
//   const [confirmLoginPassword, setConfirmLoginPassword] = useState("");

//   const [txnPassword, setTxnPassword] = useState("");
//   const [confirmTxnPassword, setConfirmTxnPassword] = useState("");

//   /* ---------------- OTP HANDLERS ---------------- */
//   const handleOtpChange = (index: number, value: string) => {
//     if (!/^\d?$/.test(value)) return;
//     const next = [...otp];
//     next[index] = value;
//     setOtp(next);
//     if (value && index < 5) otpRefs.current[index + 1]?.focus();
//   };

//   const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const otpValue = otp.join("");

//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden">
//         {/* HEADER */}
//         <div className="flex justify-between items-center px-3 py-2 border-b">
//           <button
//             onClick={onClose}
//             className="text-xs text-red-600 flex items-center gap-1"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Login
//           </button>

//           <h1 className="text-xs font-medium">
//             First time user registration
//           </h1>

//           <button onClick={onClose}>
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* STEPPER */}
//         <div className="px-4 py-2 bg-yellow-100">
//           <div className="flex items-center gap-4">
//             {[
//               "Select method",
//               "Authentication",
//               "Login password",
//               "Txn password",
//             ].map((label, i) => (
//               <Stepper
//                 key={i}
//                 index={i + 1}
//                 step={step}
//                 label={label}
//               />
//             ))}
//           </div>
//         </div>

//         {/* BODY */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-3">
//           {/* LEFT FORM */}
//           <div className="lg:col-span-2 bg-white p-3 rounded-xl border">
//             {/* STEP 1 */}
//             {step === 1 && (
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs font-medium">
//                     Enter Customer ID
//                   </label>
//                   <Input
//                     placeholder="Enter Customer ID"
//                     value={customerId}
//                     onChange={(e) => setCustomerId(e.target.value)}
//                     className="text-xs placeholder:text-xs"

//                   />
//                   <p className="text-[10px] text-red-600 mt-1 cursor-pointer">
//                     Forgot Customer ID?
//                   </p>
//                 </div>

//                 <div className="flex justify-end">
//                   <Button
//                     className="text-xs bg-red-600 hover:bg-red-700"
//                     onClick={() => {
//                       if (!customerId) return alert("Enter Customer ID");
//                       setStep(2);
//                     }}
//                   >
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 2 – OTP */}
//             {step === 2 && (
//               <div className="space-y-4">
//                 <p className="text-xs text-gray-600">
//                   OTP sent to registered mobile +91 XXXXX4321
//                 </p>

//                 <div className="flex gap-2 justify-center">
//                   {otp.map((digit, i) => (
//                     <input
//                       key={i}
//                       ref={(el) => (otpRefs.current[i] = el)}
//                       value={digit}
//                       onChange={(e) =>
//                         handleOtpChange(i, e.target.value)
//                       }
//                       onKeyDown={(e) => handleOtpKeyDown(i, e)}
//                       maxLength={1}
//                       className="w-9 h-9 border rounded-md text-center text-sm focus:ring-2 focus:ring-red-500"
//                     />
//                   ))}
//                 </div>

//                 <div className="flex justify-end gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setStep(1)}
//                   >
//                     Back
//                   </Button>
//                   <Button
//                     size="sm"
//                     className="bg-red-600 hover:bg-red-700"
//                     onClick={() => {
//                       if (otpValue !== "123456")
//                         return alert("Invalid OTP (use 123456)");
//                       setStep(3);
//                     }}
//                   >
//                     Verify
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3 – LOGIN PASSWORD */}
//             {step === 3 && (
//               <div className="space-y-4">
//                 <Input
//                   type="password"
//                   placeholder="Create Login Password"
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Confirm Login Password"
//                   value={confirmLoginPassword}
//                   onChange={(e) =>
//                     setConfirmLoginPassword(e.target.value)
//                   }
//                 />
//                 <PasswordRules />

//                 <div className="flex justify-end">
//                   <Button
//                     size="sm"
//                     className="bg-red-600 hover:bg-red-700"
//                     onClick={() => {
//                       if (
//                         !loginPassword ||
//                         loginPassword !== confirmLoginPassword
//                       )
//                         return alert("Password mismatch");
//                       setStep(4);
//                     }}
//                   >
//                     Continue
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 4 – TXN PASSWORD */}
//             {step === 4 && (
//               <div className="space-y-4">
//                 <Input
//                   type="password"
//                   placeholder="Create Transaction Password"
//                   value={txnPassword}
//                   onChange={(e) => setTxnPassword(e.target.value)}
//                 />
//                 <Input
//                   type="password"
//                   placeholder="Confirm Transaction Password"
//                   value={confirmTxnPassword}
//                   onChange={(e) =>
//                     setConfirmTxnPassword(e.target.value)
//                   }
//                 />
//                 <PasswordRules />

//                 <div className="flex justify-end">
//                   <Button
//                     size="sm"
//                     className="bg-green-600 hover:bg-green-700"
//                     onClick={() => {
//                       if (
//                         !txnPassword ||
//                         txnPassword !== confirmTxnPassword
//                       )
//                         return alert("Txn password mismatch");

//                       alert("🎉 Registration Successful");
//                       onClose();
//                     }}
//                   >
//                     Complete Registration
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* RIGHT NOTE */}
//           <div className="bg-gray-50 rounded-xl p-3 border h-fit">
//             <div className="flex items-center gap-2 mb-2">
//               <Info className="text-orange-500 w-4 h-4" />
//               <h3 className="font-semibold text-xs">Please Note</h3>
//             </div>

//             <ul className="text-[10px] text-gray-600 space-y-2 list-disc pl-4">
//               <li>Registration is only for individual customers</li>
//               <li>OTP is sent to bank registered mobile</li>
//               <li>Login & Transaction passwords must be different</li>
//               <li>Never share your OTP or passwords</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- STEPPER ---------------- */

// function Stepper({
//   index,
//   step,
//   label,
// }: {
//   index: number;
//   step: number;
//   label: string;
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <div
//         className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
//           step > index
//             ? "bg-green-600 text-white"
//             : step === index
//             ? "border-2 border-red-600 text-red-600"
//             : "border border-gray-300 text-gray-400"
//         }`}
//       >
//         {step > index ? <CheckCircle className="w-4 h-4" /> : index}
//       </div>

//       {/* ✅ FIXED: text-xs REALLY APPLIES NOW */}
//       <span className="text-[10px] uppercase tracking-wide text-gray-700">
//         {label}
//       </span>
//     </div>
//   );
// }

// function PasswordRules() {
//   return (
//     <ul className="text-[10px] text-gray-600 list-disc pl-4">
//       <li>8–16 characters</li>
//       <li>Uppercase, lowercase, number & special char</li>
//       <li>Must not match Customer ID</li>
//     </ul>
//   );
// }

"use client";
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Info, X } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function ForgotPasswordFirstTimePopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(1);

  const [pan, setPan] = useState("");
  const [mobile, setMobile] = useState("");

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ---------------- OTP ---------------- */
  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <button
            onClick={onClose}
            className="text-xs text-red-600 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-xs font-medium">Forgot Password</h1>

          <button onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEPPER */}
        <div className="px-4 py-2 bg-yellow-100">
          <div className="flex items-center gap-4">
            {["Verify Details", "OTP", "New Password", "Done"].map((l, i) => (
              <Stepper key={i} index={i + 1} step={step} label={l} />
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white p-4 rounded-xl border space-y-4">

            {/* STEP 1 – SIDE BY SIDE INPUTS */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium">PAN Card Number</label>
                    <Input
                      placeholder="ABCDE1234F"
                      className="text-sm placeholder:text-xs"
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium">
                      Registered Mobile
                    </label>
                    <Input
                      placeholder="10 digit mobile number"
                      className="text-sm placeholder:text-xs"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setStep(2)}
                  >
                    Send OTP
                  </Button>
                </div>
              </>
            )}

            {/* STEP 2 – OTP */}
            {step === 2 && (
              <>
                <p className="text-xs text-gray-600">
                  OTP sent to registered mobile number
                </p>

                <div className="flex justify-center gap-2">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      value={d}
                      maxLength={1}
                      onChange={(e) =>
                        handleOtpChange(i, e.target.value)
                      }
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-9 h-9 border rounded-md text-center"
                    />
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setStep(3)}
                  >
                    Verify OTP
                  </Button>
                </div>
              </>
            )}

            {/* STEP 3 – PASSWORD */}
            {step === 3 && (
              <>
                <Input
                  type="password"
                  placeholder="Create New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setStep(4)}
                  >
                    Save Password
                  </Button>
                </div>
              </>
            )}

            {/* STEP 4 – DONE */}
            {step === 4 && (
              <div className="text-center space-y-3">
                <CheckCircle className="mx-auto text-green-600 w-10 h-10" />
                <p className="text-sm font-semibold">
                  Password reset successful
                </p>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={onClose}
                >
                  Back to Login
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT INFO */}
          <div className="bg-gray-50 rounded-xl p-4 border h-fit">
            <div className="flex items-center gap-2 mb-2">
              <Info className="text-orange-500 w-4 h-4" />
              <h3 className="font-semibold text-xs">Please Note</h3>
            </div>

            <ul className="text-[10px] text-gray-600 space-y-2 list-disc pl-4">
              <li>OTP is sent to registered mobile</li>
              <li>Do not share OTP or password</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STEPPER ---------------- */

function Stepper({
  index,
  step,
  label,
}: {
  index: number;
  step: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
          step > index
            ? "bg-green-600 text-white"
            : step === index
            ? "border-2 border-red-600 text-red-600"
            : "border border-gray-300 text-gray-400"
        }`}
      >
        {step > index ? <CheckCircle className="w-4 h-4" /> : index}
      </div>
      <span className="text-[10px] uppercase tracking-wide text-gray-700">
        {label}
      </span>
    </div>
  );
}
