'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  User,
  MapPin,
  Building,
  Hash,
  Shield,
  Download,
  Clock,
  AlertCircle,
  CreditCard,
  FileText,
} from 'lucide-react';

// ───────────────── TYPES ─────────────────
type ServiceType = 'electricity';

interface Service {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  type: ServiceType;
}

interface Transaction {
  id: number;
  service: string;
  name: string;
  amount: string;
  date: string;
  status: 'Success' | 'Failed';
}

interface StateInfo {
  name: string;
  code: string;
  districts: DistrictInfo[];
}

interface DistrictInfo {
  name: string;
  code: string;
  boards: BoardInfo[];
}

interface BoardInfo {
  id: string;
  name: string;
  consumerNumberPrefix: string;
  consumerNumberLength: number;
  phone: string;
  website: string;
}

interface BillData {
  customerName: string;
  dueDate: string;
  billNumber: string;
  amount: number;
  details: Record<string, string>;
}

// ───────────────── COMPREHENSIVE DATA ─────────────────
const STATE_DATA: StateInfo[] = [
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    districts: [
      {
        name: 'Visakhapatnam',
        code: 'VIS',
        boards: [
          { id: 'apcpl', name: 'APCPDCL', consumerNumberPrefix: 'APC', consumerNumberLength: 12, phone: '18004251401', website: 'apcpdcl.in' },
          { id: 'apspl', name: 'APSPDCL', consumerNumberPrefix: 'APS', consumerNumberLength: 12, phone: '18004251402', website: 'apsdcl.in' },
        ]
      },
      {
        name: 'Guntur',
        code: 'GNT',
        boards: [
          { id: 'apcpl', name: 'APCPDCL', consumerNumberPrefix: 'APC', consumerNumberLength: 12, phone: '18004251401', website: 'apcpdcl.in' },
        ]
      },
    ]
  },
  {
    name: 'Telangana',
    code: 'TS',
    districts: [
      {
        name: 'Hyderabad',
        code: 'HYD',
        boards: [
          { id: 'tscpl', name: 'TSSPDCL', consumerNumberPrefix: 'TSS', consumerNumberLength: 10, phone: '18004251405', website: 'tssouthernpower.com' },
          { id: 'tsncl', name: 'TSNPDCL', consumerNumberPrefix: 'TSN', consumerNumberLength: 10, phone: '18004251406', website: 'tsnorthernpower.com' },
        ]
      },
      {
        name: 'Warangal',
        code: 'WGL',
        boards: [
          { id: 'ttd', name: 'TTD Board', consumerNumberPrefix: 'TTD', consumerNumberLength: 9, phone: '18004251408', website: 'ttdelectricity.org' },
          { id: 'tscpl', name: 'TSSPDCL', consumerNumberPrefix: 'TSS', consumerNumberLength: 10, phone: '18004251405', website: 'tssouthernpower.com' },
        ]
      },
    ]
  },
  {
    name: 'Karnataka',
    code: 'KA',
    districts: [
      {
        name: 'Bangalore Urban',
        code: 'BLR',
        boards: [
          { id: 'bescom', name: 'BESCOM', consumerNumberPrefix: 'BESCOM', consumerNumberLength: 13, phone: '1912', website: 'bescom.com' },
          { id: 'hescom', name: 'HESCOM', consumerNumberPrefix: 'HESCOM', consumerNumberLength: 13, phone: '1913', website: 'hescom.in' },
        ]
      },
      {
        name: 'Mysore',
        code: 'MYS',
        boards: [
          { id: 'mescom', name: 'MESCOM', consumerNumberPrefix: 'MESCOM', consumerNumberLength: 12, phone: '1915', website: 'mescom.in' },
        ]
      },
    ]
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    districts: [
      {
        name: 'Mumbai',
        code: 'BOM',
        boards: [
          { id: 'adani', name: 'Adani Power', consumerNumberPrefix: 'ADANI', consumerNumberLength: 15, phone: '1917', website: 'adanipower.com' },
          { id: 'tata', name: 'Tata Power', consumerNumberPrefix: 'TATA', consumerNumberLength: 14, phone: '1918', website: 'tatapower.com' },
        ]
      },
      {
        name: 'Pune',
        code: 'PNQ',
        boards: [
          { id: 'msedcl', name: 'MSEDCL', consumerNumberPrefix: 'MSEDCL', consumerNumberLength: 12, phone: '18002333433', website: 'mahadiscom.in' },
        ]
      },
    ]
  },
];

const SERVICES: Service[] = [
  {
    id: 'electricity',
    name: 'Electricity',
    icon: <Zap className="w-4 h-4" />,
    color: 'bg-yellow-100 text-yellow-600',
    type: 'electricity',
  },
];

const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 1, service: 'Electricity', name: 'Tata Power', amount: '₹1,240', date: 'Yesterday', status: 'Success' },
  { id: 2, service: 'Electricity', name: 'BESCOM', amount: '₹850', date: '12 Dec', status: 'Success' },
  { id: 3, service: 'Electricity', name: 'APCPDCL', amount: '₹1,560', date: '10 Dec', status: 'Success' },
];

// Mock user location
const MOCK_USER_LOCATION = {
  state: 'Maharashtra',
  district: 'Mumbai'
};

// ───────────────── COMPONENT ─────────────────
export default function BillPaymentPage() {
  const [view, setView] = useState<'home' | 'details' | 'bill' | 'processing' | 'success'>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<BoardInfo | null>(null);
  const [consumerNumber, setConsumerNumber] = useState('');
  const [consumerNumberError, setConsumerNumberError] = useState('');
  const [loading, setLoading] = useState(false);
  const [billData, setBillData] = useState<BillData | null>(null);
  const [userLocation, setUserLocation] = useState<{state: string, district: string} | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const availableDistricts = selectedState 
    ? STATE_DATA.find(state => state.name === selectedState)?.districts || []
    : [];
    
  const availableBoards = selectedDistrict 
    ? availableDistricts.find(dist => dist.name === selectedDistrict)?.boards || []
    : [];

  // Simulate detecting user location
  useEffect(() => {
    const detectLocation = () => {
      setIsDetectingLocation(true);
      setTimeout(() => {
        setUserLocation(MOCK_USER_LOCATION);
        setIsDetectingLocation(false);
        
        if (MOCK_USER_LOCATION.state) {
          setSelectedState(MOCK_USER_LOCATION.state);
          if (MOCK_USER_LOCATION.district) {
            setSelectedDistrict(MOCK_USER_LOCATION.district);
          }
        }
      }, 800);
    };
    
    if (view === 'details' && !userLocation) {
      detectLocation();
    }
  }, [view, userLocation]);

  useEffect(() => {
    if (selectedState && !availableDistricts.some(d => d.name === selectedDistrict)) {
      setSelectedDistrict('');
      setSelectedBoard(null);
    }
  }, [selectedState, selectedDistrict, availableDistricts]);

  useEffect(() => {
    if (selectedDistrict && !availableBoards.some(b => b.id === selectedBoard?.id)) {
      setSelectedBoard(null);
    }
  }, [selectedDistrict, selectedBoard, availableBoards]);

  const validateConsumerNumber = (number: string, board: BoardInfo | null): boolean => {
    if (!board) return false;
    
    if (!number.toUpperCase().startsWith(board.consumerNumberPrefix)) {
      setConsumerNumberError(`Must start with ${board.consumerNumberPrefix}`);
      return false;
    }
    
    if (number.length !== board.consumerNumberLength) {
      setConsumerNumberError(`${board.consumerNumberLength} characters required`);
      return false;
    }
    
    if (!/^[A-Z0-9]+$/i.test(number)) {
      setConsumerNumberError('Only letters & numbers');
      return false;
    }
    
    setConsumerNumberError('');
    return true;
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedBoard(null);
    setConsumerNumber('');
    setBillData(null);
    setView('details');
  };

  const handleBack = () => {
    if (view === 'details') setView('home');
    else if (view === 'bill') setView('details');
    else setView('home');
  };

  const detectMyLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setSelectedState(userLocation?.state || 'Maharashtra');
      setSelectedDistrict(userLocation?.district || 'Mumbai');
      setIsDetectingLocation(false);
    }, 600);
  };

  const generateBillData = () => {
    const customers = [
      { name: 'Rajesh Kumar', dueDate: '25 Dec 2024', amount: 1280 },
      { name: 'Priya Sharma', dueDate: '28 Dec 2024', amount: 1850 },
      { name: 'Amit Patel', dueDate: '30 Dec 2024', amount: 920 },
    ];
    
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    
    return {
      customerName: randomCustomer.name,
      dueDate: randomCustomer.dueDate,
      billNumber: `BILL-${Math.floor(10000 + Math.random() * 90000)}`,
      amount: randomCustomer.amount,
      details: { 
        state: selectedState,
        district: selectedDistrict,
        board: selectedBoard?.name || '',
        consumerNumber: consumerNumber,
      },
    };
  };

  const handleFetchBill = () => {
    if (!selectedBoard || !validateConsumerNumber(consumerNumber, selectedBoard)) {
      if (!selectedBoard) {
        setConsumerNumberError('Select board first');
      }
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setBillData(generateBillData());
      setLoading(false);
      setView('bill');
    }, 1200);
  };

  const handlePay = () => {
    setView('processing');
    setTimeout(() => setView('success'), 1800);
  };

  const handleConsumerNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setConsumerNumber(value);
    
    if (selectedBoard) {
      validateConsumerNumber(value, selectedBoard);
    }
  };

  const isFetchButtonDisabled = !selectedState || !selectedDistrict || !selectedBoard || !consumerNumber || !!consumerNumberError;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="md:text-2xl font-bold text-foreground text-[12px]">Bill Payments</h1>
        <p className="text-[10px] text-muted-foreground">Pay your electricity bills securely and instantly</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Main Card */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm hover:shadow-md transition-all overflow-hidden rounded-2xl">
            {/* <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600" /> */}
            
            <CardContent className="p-2">
              {/* Header */}
              <div className="flex items-start justify-between mb-4 p-2">
                <div className="flex items-center gap-2">
                  {view !== 'home' && (
                    <Button 
                      onClick={handleBack}
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  )}
                  <div>
                    <h3 className="text-[12px] font-semibold text-foreground">
                      {view === 'home' ? 'Quick Bill Pay' : 'Electricity Bill Payment'}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {view === 'home' ? 'Select service to continue' : 'Complete payment in few steps'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                  <Shield className="w-3 h-3" />
                  Secure
                </div>
              </div>

              {/* View Content */}
              <div className="p-2">
                {/* HOME VIEW */}
                {view === 'home' && (
                  <div className="space-y-4">
                    {/* Services */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Services</h4>
                      <button
                        onClick={() => handleServiceClick(SERVICES[0])}
                        className="w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-sm transition-all flex items-center gap-3 group"
                      >
                        <div className="p-3 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100">
                          <Zap className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-bold text-[12px] text-foreground">Electricity Bill</p>
                          <p className="text-[10px] text-muted-foreground">Pay electricity bills across all states</p>
                        </div>
                        <div className="text-muted-foreground text-xs">→</div>
                      </button>
                    </div>

                    {/* Recent Transactions */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Recent Payments</h4>
                        <span className="text-[10px] text-blue-600 font-medium">View All</span>
                      </div>
                      <div className="space-y-1.5">
                        {RECENT_TRANSACTIONS.map(tx => (
                          <div key={tx.id} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded ${tx.status === 'Success' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {tx.status === 'Success' ? 
                                  <CheckCircle2 className="w-3 h-3 text-green-600" /> : 
                                  <AlertCircle className="w-3 h-3 text-red-600" />
                                }
                              </div>
                              <div>
                                <p className="text-[11px] font-medium text-foreground">{tx.name}</p>
                                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5" />
                                  {tx.date}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[11px] font-bold text-foreground">{tx.amount}</p>
                              <p className={`text-[10px] ${tx.status === 'Success' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                {tx.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* DETAILS VIEW */}
                {view === 'details' && (
                  <div className="space-y-4">
                    {/* Location Detection */}
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-[11px] font-medium text-blue-700">Auto-detect Location</p>
                          <p className="text-[10px] text-blue-600">Quickly fill your details</p>
                        </div>
                      </div>
                      <Button
                        onClick={detectMyLocation}
                        disabled={isDetectingLocation}
                        size="sm"
                        className="h-8 px-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[10px]"
                      >
                        {isDetectingLocation ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Detecting...
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3 h-3 mr-1" />
                            Use My Location
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Form */}
                    <div className="space-y-3">
                      {/* State Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          Select State
                          {userLocation?.state === selectedState && (
                            <span className="ml-auto text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                              Your State
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full p-2.5 border border-slate-200 rounded-lg text-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          value={selectedState}
                          onChange={e => setSelectedState(e.target.value)}
                        >
                          <option value="">-- Select state --</option>
                          {STATE_DATA.map(state => (
                            <option key={state.code} value={state.name} className="text-[12px]">
                              {state.name} ({state.code})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* District Selection */}
                      {selectedState && (
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            Select District
                            {userLocation?.district === selectedDistrict && (
                              <span className="ml-auto text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                Your District
                              </span>
                            )}
                          </label>
                          <select
                            className="w-full p-2.5 border border-slate-200 rounded-lg text-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={selectedDistrict}
                            onChange={e => setSelectedDistrict(e.target.value)}
                          >
                            <option value="">-- Select district --</option>
                            {availableDistricts.map(district => (
                              <option key={district.code} value={district.name} className="text-[12px]">
                                {district.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Board Selection */}
                      {selectedDistrict && (
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5" />
                            Select Electricity Board
                          </label>
                          <select
                            className="w-full p-2.5 border border-slate-200 rounded-lg text-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            value={selectedBoard?.id || ''}
                            onChange={e => {
                              const board = availableBoards.find(b => b.id === e.target.value);
                              setSelectedBoard(board || null);
                              setConsumerNumber('');
                              setConsumerNumberError('');
                            }}
                          >
                            <option value="">-- Select board --</option>
                            {availableBoards.map(board => (
                              <option key={board.id} value={board.id} className="text-[12px]">
                                {board.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Consumer Number */}
                      {selectedBoard && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-medium text-foreground flex items-center gap-1.5">
                              <Hash className="w-3.5 h-3.5" />
                              Consumer Number
                            </label>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              Format: {selectedBoard.consumerNumberPrefix}xxx
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder={`Enter ${selectedBoard.name} consumer number`}
                            className={`w-full p-2.5 border rounded-lg text-[12px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono ${
                              consumerNumberError ? 'border-red-500' : 'border-slate-200'
                            }`}
                            value={consumerNumber}
                            onChange={handleConsumerNumberChange}
                            maxLength={selectedBoard.consumerNumberLength}
                          />
                          {consumerNumberError && (
                            <p className="text-red-500 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {consumerNumberError}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Fetch Button */}
                      <Button
                        onClick={handleFetchBill}
                        disabled={isFetchButtonDisabled || loading}
                        className="w-full h-11 mt-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-[12px]"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Fetching Bill Details...
                          </span>
                        ) : (
                          'Fetch Current Bill'
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* BILL VIEW */}
                {view === 'bill' && billData && (
                  <div className="space-y-4">
                    {/* Bill Header */}
                    <div className="flex items-start justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-100 rounded-lg">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-blue-700 font-medium">Bill For</p>
                          <p className="text-[12px] font-bold text-foreground">{billData.customerName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-blue-700 font-medium">Due Date</p>
                        <p className="text-[12px] font-bold text-red-600">{billData.dueDate}</p>
                      </div>
                    </div>

                    {/* Bill Details */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/50 rounded-lg border border-slate-200">
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">Bill Number</p>
                        <p className="text-[12px] font-bold text-foreground font-mono">{billData.billNumber}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">Board</p>
                        <p className="text-[12px] font-bold text-foreground">{billData.details.board}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">Consumer No.</p>
                        <p className="text-[12px] font-bold text-foreground font-mono">{billData.details.consumerNumber}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground mb-1 font-medium uppercase tracking-wider">Location</p>
                        <p className="text-[12px] font-bold text-foreground">{billData.details.district}</p>
                      </div>
                    </div>

                    {/* Amount Section */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-[12px] font-medium text-foreground">Total Amount Due</p>
                          <p className="text-[10px] text-muted-foreground">Including all taxes and charges</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-700">₹{billData.amount}</div>
                          <div className="text-[10px] text-muted-foreground">Due in 3 days</div>
                        </div>
                      </div>

                      <Button
                        onClick={handlePay}
                        className="w-full h-11 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-[12px] flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </Button>

                      <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-muted-foreground">
                        <Shield className="w-3 h-3" />
                        Secure payment • 256-bit SSL encrypted
                      </div>
                    </div>
                  </div>
                )}

                {/* PROCESSING VIEW */}
                {view === 'processing' && (
                  <div className="text-center py-8">
                    <div className="relative mx-auto w-20 h-20">
                      <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                      <div className="absolute inset-4 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                      <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-[12px] font-semibold mt-4 text-foreground">Processing Payment</p>
                    <p className="text-[11px] text-muted-foreground mt-2">Please don't close or refresh this page</p>
                    <div className="w-48 h-1.5 bg-slate-200 rounded-full mx-auto mt-6 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse w-3/4"></div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-4">Verifying with {selectedBoard?.name}...</p>
                  </div>
                )}

                {/* SUCCESS VIEW */}
                {view === 'success' && (
                  <div className="text-center space-y-4">
                    <div className="relative mx-auto w-20 h-20">
                      <div className="w-full h-full bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-ping">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[14px] font-bold text-foreground">Payment Successful!</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Your electricity bill has been paid successfully</p>
                    </div>
                    
                    {billData && (
                      <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-200 space-y-2 text-left">
                        <p className="text-[11px] font-medium text-muted-foreground">Transaction Summary</p>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] text-foreground">Amount Paid:</span>
                            <span className="text-[12px] font-bold text-green-600">₹{billData.amount}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-foreground">Transaction ID:</span>
                            <span className="font-mono text-foreground">TXN{Date.now().toString().slice(-10)}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-foreground">Date & Time:</span>
                            <span className="text-foreground">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        onClick={() => setView('home')}
                        className="flex-1 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-[11px]"
                      >
                        Back to Home
                      </Button>
                      
                      <Button
                        onClick={() => window.print()}
                        variant="outline"
                        className="flex-1 h-10 rounded-lg border-slate-300 text-foreground font-semibold text-[11px] hover:bg-slate-50 flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Info Card */}
        <div>
          <Card className="border-0 shadow-sm overflow-hidden rounded-2xl">
            <CardHeader className="p-4">
              <CardTitle className="text-[12px] font-semibold text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Quick Tips
              </CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">
                Make bill payments faster and secure
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <p className="text-[11px] font-medium text-blue-700">Location Detection</p>
                </div>
                <p className="text-[10px] text-blue-600">
                  Use "My Location" to auto-fill state & district
                </p>
              </div>

              <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4 text-green-600" />
                  <p className="text-[11px] font-medium text-green-700">Board Support</p>
                </div>
                <p className="text-[10px] text-green-600">
                  Supports TTD, APCPDCL, BESCOM, Tata Power & more
                </p>
              </div>

              <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <p className="text-[11px] font-medium text-purple-700">100% Secure</p>
                </div>
                <p className="text-[10px] text-purple-600">
                  RBI compliant payments with bank-level encryption
                </p>
              </div>

              <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <p className="text-[11px] font-medium text-orange-700">Instant Confirmation</p>
                </div>
                <p className="text-[10px] text-orange-600">
                  Get payment confirmation within seconds
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-[10px] text-muted-foreground font-medium mb-2">Supported States:</p>
                <div className="flex flex-wrap gap-1">
                  {STATE_DATA.slice(0, 5).map(state => (
                    <span key={state.code} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-[9px] font-medium">
                      {state.code}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-[9px] font-medium">
                    +{STATE_DATA.length - 5} more
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}