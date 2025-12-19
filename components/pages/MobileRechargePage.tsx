'use client';

import React, { useState, useEffect } from 'react';

/* ───────── TYPES ───────── */

type Provider = 'Jio' | 'Airtel' | 'Vi' | 'BSNL';

interface Plan {
  id: number;
  price: number;
  data: string;
  validity: string;
  description: string;
  tag?: string;
}

interface Coupon {
  code: string;
  discount: number;
  description: string;
}

/* ───────── DATA ───────── */

const PROVIDERS: Record<Provider, string> = {
  Jio: 'bg-blue-600',
  Airtel: 'bg-red-600',
  Vi: 'bg-yellow-500',
  BSNL: 'bg-green-600',
};

const PLANS: Record<Provider, Plan[]> = {
  Jio: [
    { id: 1, price: 299, data: '1.5GB/day', validity: '28 Days', description: 'Unlimited Calls', tag: 'BEST' },
    { id: 2, price: 666, data: '1.5GB/day', validity: '84 Days', description: 'JioCinema' },
  ],
  Airtel: [
    { id: 3, price: 299, data: '1.5GB/day', validity: '28 Days', description: 'Wynk Music' },
    { id: 4, price: 479, data: '1.5GB/day', validity: '56 Days', description: 'Unlimited 5G' },
  ],
  Vi: [
    { id: 5, price: 319, data: '2GB/day', validity: '30 Days', description: 'Night Data' },
  ],
  BSNL: [
    { id: 6, price: 153, data: '1GB/day', validity: '26 Days', description: 'Unlimited Voice' },
  ],
};

const COUPONS: Coupon[] = [
  { code: 'SAVE50', discount: 50, description: 'Flat ₹50 off' },
  { code: 'FIRST75', discount: 75, description: 'New user offer' },
];

/* ───────── COMPONENT ───────── */

export default function RechargePage() {
  const [phone, setPhone] = useState('');
  const [provider, setProvider] = useState<Provider | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<'home' | 'plans' | 'payment' | 'success'>('home');

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [autoOffer, setAutoOffer] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ───────── LOGIC ───────── */

  useEffect(() => {
    if (phone.length === 10) {
      if (phone.startsWith('9')) setProvider('Airtel');
      else if (phone.startsWith('8')) setProvider('Jio');
      else if (phone.startsWith('7')) setProvider('Vi');
      else setProvider('BSNL');
    }
  }, [phone]);

  useEffect(() => {
    if (plan) {
      setAutoOffer(plan.price >= 299 ? 20 : 0);
    }
  }, [plan]);

  const applyCoupon = () => {
    const found = COUPONS.find(c => c.code === couponInput.toUpperCase());
    if (!found) return alert('Invalid Coupon');
    setAppliedCoupon(found);
  };

  const discount = (appliedCoupon?.discount || 0) + autoOffer;
  const finalAmount = Math.max((plan?.price || 0) - discount, 0);

  const payNow = () => {
    setStep('payment');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 3000);
  };

  const reset = () => {
    setPhone('');
    setProvider(null);
    setPlan(null);
    setAppliedCoupon(null);
    setCouponInput('');
    setStep('home');
  };

  /* ───────── UI ───────── */

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-sm">

      {/* HOME */}
      {step === 'home' && (
        <div className="max-w-md mx-auto bg-white p-5 rounded-2xl shadow">
          <h1 className="text-xl font-bold mb-4">Mobile Recharge</h1>

          <input
            value={phone}
            maxLength={10}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter mobile number"
            className="w-full border p-3 rounded-lg mb-3"
          />

          {provider && (
            <div className={`text-white px-3 py-1 rounded text-xs inline-block mb-3 ${PROVIDERS[provider]}`}>
              {provider}
            </div>
          )}

          <button
            disabled={phone.length !== 10}
            onClick={() => setStep('plans')}
            className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
          >
            View Plans →
          </button>
        </div>
      )}

      {/* PLANS */}
      {step === 'plans' && provider && (
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setStep('home')} className="mb-3 text-xs">← Back</button>

          {/* Coupon */}
          <div className="bg-white p-4 rounded-xl mb-4">
            <p className="font-bold mb-2">Apply Coupon</p>
            <div className="flex gap-2">
              <input
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                className="flex-1 border p-2 rounded"
                placeholder="Coupon code"
              />
              <button onClick={applyCoupon} className="bg-black text-white px-4 rounded">
                Apply
              </button>
            </div>

            {appliedCoupon && (
              <p className="text-green-600 text-xs mt-2">
                ✅ {appliedCoupon.description}
              </p>
            )}
            {autoOffer > 0 && (
              <p className="text-blue-600 text-xs">🎉 ₹{autoOffer} auto applied</p>
            )}
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-4">
            {PLANS[provider].map(p => (
              <div
                key={p.id}
                onClick={() => setPlan(p)}
                className={`p-4 rounded-xl border cursor-pointer ${
                  plan?.id === p.id ? 'border-blue-600 bg-blue-50' : 'bg-white'
                }`}
              >
                <h2 className="text-2xl font-bold">₹{p.price}</h2>
                <p className="text-xs">{p.data} • {p.validity}</p>
                <p className="text-xs text-gray-500">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          {plan && (
            <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
              <div className="max-w-3xl mx-auto flex justify-between items-center">
                <div>
                  <p className="text-xs">Payable</p>
                  <p className="text-xl font-bold">
                    ₹{finalAmount}
                    <span className="line-through text-gray-400 ml-2 text-sm">
                      ₹{plan.price}
                    </span>
                  </p>
                  <p className="text-green-600 text-xs">You saved ₹{discount}</p>
                </div>
                <button onClick={payNow} className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PAYMENT */}
      {step === 'payment' && (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="font-bold">Processing Payment</p>
            <p className="text-xs mt-2">₹{finalAmount}</p>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {step === 'success' && (
        <div className="flex items-center justify-center h-[70vh]">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-5xl mb-2">✅</div>
            <h2 className="text-xl font-bold mb-2">Recharge Successful</h2>
            <p className="text-sm">₹{finalAmount} recharged to</p>
            <p className="font-bold mb-4">+91 {phone}</p>

            <button onClick={reset} className="bg-black text-white px-6 py-2 rounded">
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
