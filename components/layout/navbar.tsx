import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import {
  LogOut,
  CreditCard,
  Send,
  FileText,
  Home,
  Settings,
  ChevronRight,
  Wallet,
  BarChart3,
  Bell,
  DollarSign,
  TrendingUp,
  PiggyBank,
  Lock,
  UserIcon,
  Target,
  MapPin,
  Clock,
  ChevronDown,
  Smartphone,
  Globe,
} from "lucide-react";
import Image from "next/image";

type PageType =
  | "dashboard"
  | "accounts"
  | "transfer"
  | "add-beneficiary"
  | "scheduled-transfer"
  | "bills"
  | "electricity-bills"
  | "mobile-recharge"
  | "cards"
  | "loans"
  | "apply-loan"
  | "profile"
  | "investments"
  | "support"
  | "services";

interface NavbarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  onLogout: () => void;
}

interface MenuItem {
  label: string;
  id: PageType;
  icon: React.ReactNode;
  subMenu?: MenuItem[];
  subSubMenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", id: "dashboard", icon: <Home className="w-4 h-4" /> },
  {
    label: "My Accounts",
    id: "accounts",
    icon: <Wallet className="w-4 h-4" />,
    subMenu: [
      {
        label: "Savings",
        id: "accounts",
        icon: <Wallet className="w-4 h-4" />,
        subSubMenu: [
          {
            label: "Salary Savings",
            id: "accounts",
            icon: <Target className="w-4 h-4" />,
          },
          {
            label: "Children Savings",
            id: "accounts",
            icon: <Target className="w-4 h-4" />,
          },
        ],
      },
      {
        label: "Investments",
        id: "investments",
        icon: <BarChart3 className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Transfer Money",
    id: "transfer",
    icon: <Send className="w-4 h-4" />,
    subMenu: [
      {
        label: "Fund Transfer",
        id: "transfer",
        icon: <DollarSign className="w-4 h-4" />,
      },
      {
        label: "Add Beneficiary",
        id: "add-beneficiary",
        icon: <UserIcon className="w-4 h-4" />,
      },
      {
        label: "Scheduled Transfers",
        id: "scheduled-transfer",
        icon: <Clock className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Bill Pay",
    id: "bills",
    icon: <FileText className="w-4 h-4" />,
    subMenu: [
      {
        label: "Electricity Bills",
        id: "electricity-bills",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Mobile Bills",
        id: "mobile-recharge",
        icon: <Smartphone className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Cards",
    id: "cards",
    icon: <CreditCard className="w-4 h-4" />,
    subMenu: [
      {
        label: "My Cards",
        id: "cards",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        label: "Apply New Card",
        id: "cards",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Rewards",
        id: "cards",
        icon: <TrendingUp className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Services",
    id: "services",
    icon: <PiggyBank className="w-4 h-4" />,
    subMenu: [
      {
        label: "My Loans",
        id: "loans",
        icon: <Wallet className="w-4 h-4" />,
      },
      {
        label: "Apply Loan",
        id: "apply-loan",
        icon: <DollarSign className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Settings",
    id: "profile",
    icon: <Settings className="w-4 h-4" />,
    subMenu: [
      {
        label: "Profile",
        id: "profile",
        icon: <UserIcon className="w-4 h-4 " />,
      },
      {
        label: "Security",
        id: "profile",
        icon: <Lock className="w-4 h-4 " />,
      },
      {
        label: "Notifications",
        id: "profile",
        icon: <Bell className="w-4 h-4 " />,
      },
    ],
  },
];

export function Navbar({ currentPage, onPageChange, onLogout }: NavbarProps) {
  const { user } = useAuth();
  
  // State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isClosing, setIsClosing] = useState(false);

  // Refs for logic and timers
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close logic when clicking outside
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        startClosingAnimation();
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const startClosingAnimation = () => {
    setIsClosing(true);
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
      setIsClosing(false);
    }, 200); // Match animation duration
  };

  // --- Handlers for Main Dropdown ---
  const handleMouseEnter = (id: string) => {
    if (isClosing) {
      setIsClosing(false);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    }
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      startClosingAnimation();
    }, 150); // Small delay before closing
  };

  // --- Handlers for Sub Dropdown ---
  const handleSubMouseEnter = (label: string) => {
    if (subDropdownTimeoutRef.current) {
      clearTimeout(subDropdownTimeoutRef.current);
    }
    setActiveSubDropdown(label);
  };

  const handleSubMouseLeave = () => {
    subDropdownTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  // Handle menu item click
  const handleMenuItemClick = (item: MenuItem) => {
    if (!item.subMenu) {
      onPageChange(item.id);
      startClosingAnimation();
    } else {
      // Toggle dropdown on click
      setActiveDropdown(prev => prev === item.id ? null : item.id);
      setActiveSubDropdown(null);
    }
  };

  // Handle submenu item click
  const handleSubMenuClick = (subItem: MenuItem) => {
    if (!subItem.subSubMenu) {
      onPageChange(subItem.id);
      startClosingAnimation();
    }
  };

  // Handle sub-submenu item click
  const handleSubSubMenuClick = (subSubItem: MenuItem) => {
    onPageChange(subSubItem.id);
    startClosingAnimation();
  };

  // Animation classes
  const getDropdownAnimation = () => {
    if (isClosing) {
      return "animate-dropdown-out";
    }
    return "animate-dropdown-in";
  };

  const getSubDropdownAnimation = () => {
    if (activeSubDropdown) {
      return "animate-subdropdown-in";
    }
    return "";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] shadow-md bg-white border-b border-gray-200">
      {/* ==== TOP BAR ==== */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-1">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition duration-300"
          onClick={() => onPageChange("dashboard")}
        >
          <Image
            src="/images/jayam-logo.png"
            width={90}
            height={52}
            alt="Jayam Bank Logo"
            className="transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          {/* 🌐 Language Selector */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((prev) => !prev);
              }}
              className="flex flex-col items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-all duration-300 hover:scale-105"
            >
              <Globe className="w-5 h-5 text-yellow-500 transition-transform duration-300" />
              <span className="text-[10px] text-gray-600 leading-tight mt-1">
                Language
              </span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border shadow-xl rounded-md w-32 py-1 z-[99999] animate-in fade-in slide-in-from-top-2 duration-300 origin-top-right">
                {["EN", "HI", "TE", "TA"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[11px] hover:bg-gray-100 text-gray-700 transition-all duration-200 ${language === lang ? 'bg-yellow-50 border-l-2 border-yellow-500' : ''}`}
                  >
                    {lang === "EN" && "🇬🇧 English"}
                    {lang === "HI" && "🇮🇳 Hindi"}
                    {lang === "TE" && "🇮🇳 Telugu"}
                    {lang === "TA" && "🇮🇳 Tamil"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔔 Notification */}
          <button className="flex flex-col items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-all duration-300 hover:scale-105 relative group">
            <Bell className="w-5 h-5 text-yellow-500 transition-transform group-hover:rotate-12 duration-300" />
            <span className="text-[10px] text-gray-600 leading-tight mt-1">
              Notification
            </span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* 📍 ATM / BRANCH */}
          <button className="flex flex-col items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-all duration-300 hover:scale-105 group">
            <MapPin className="w-5 h-5 text-yellow-500 transition-transform group-hover:scale-110 duration-300" />
            <span className="text-[10px] text-gray-600 leading-tight mt-1">
              ATM/Branch
            </span>
          </button>

          {/* 👤 Profile Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen((prev) => !prev);
              }}
              className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex justify-center items-center text-white text-xs font-bold transition-transform group-hover:scale-110 duration-300 shadow-md">
                {user?.name.charAt(0).toUpperCase()}
              </div>

              <div className="text-left leading-tight">
                <p className="text-[11px] font-semibold">{user?.name}</p>
                <p className="text-[9px] opacity-60">{user?.loginType}</p>
              </div>

              <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white border shadow-xl rounded-md w-40 py-2 z-[99999] animate-in fade-in slide-in-from-top-2 duration-300 origin-top-right">
                <button className="flex items-center gap-2 w-full px-4 py-2 text-[11px] hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:translate-x-1">
                  <UserIcon className="w-4 h-4 text-yellow-500" /> My Profile
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2 text-[11px] hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:translate-x-1">
                  <Settings className="w-4 h-4 text-yellow-500" /> Edit Profile
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-[11px] hover:bg-red-50 text-red-600 transition-all duration-200 hover:translate-x-1"
                >
                  <LogOut className="w-4 h-4 text-yellow-500" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==== MENU BAR ==== */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div
          className="max-w-7xl mx-auto flex gap-1 px-6 h-10 items-center"
          ref={dropdownRef}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative h-full flex items-center"
              onMouseEnter={() => item.subMenu && handleMouseEnter(item.id)}
              onMouseLeave={() => item.subMenu && handleMouseLeave()}
            >
              {/* MAIN MENU BUTTON */}
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300
                  text-[10px] font-medium leading-none relative overflow-hidden
                  ${currentPage === item.id ||
                    (item.id === "accounts" &&
                      (currentPage === "investments" ||
                        currentPage === "accounts")) ||
                    (item.id === "transfer" &&
                      (currentPage === "add-beneficiary" ||
                        currentPage === "scheduled-transfer" ||
                        currentPage === "transfer")) ||
                    (item.id === "bills" &&
                      (currentPage === "electricity-bills" ||
                        currentPage === "mobile-recharge" ||
                        currentPage === "bills")) ||
                    (item.id === "cards" && currentPage === "cards") ||
                    (item.id === "services" &&
                      (currentPage === "loans" || currentPage === "apply-loan"))
                      ? "bg-primary text-white shadow-lg transform scale-[1.02]"
                      : "hover:bg-gray-200 text-gray-700 hover:shadow-sm"
                  }`}
              >
                {/* Active indicator bar */}
                {(currentPage === item.id || 
                  (item.id === "accounts" && currentPage === "investments") ||
                  (item.id === "transfer" && 
                    ["add-beneficiary", "scheduled-transfer", "transfer"].includes(currentPage)) ||
                  (item.id === "bills" && 
                    ["electricity-bills", "mobile-recharge", "bills"].includes(currentPage)) ||
                  (item.id === "cards" && currentPage === "cards") ||
                  (item.id === "services" && 
                    ["loans", "apply-loan"].includes(currentPage))) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 animate-pulse"></span>
                )}

                <span className="flex items-center justify-center w-3.5 h-3.5 text-[#ebc60a] transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>

                <span className="relative">
                  {item.label}
                  {/* Hover underline effect */}
                  <span className={`absolute bottom-0 left-0 right-0 h-px bg-yellow-500 transform origin-left transition-transform duration-300 scale-x-0 ${
                    activeDropdown === item.id ? 'scale-x-100' : ''
                  }`}></span>
                </span>

                {item.subMenu && (
                  <ChevronRight
                    className={`w-3 h-3 opacity-70 transition-all duration-300 ${
                      activeDropdown === item.id 
                        ? "rotate-90 transform scale-110" 
                        : "group-hover:rotate-90"
                    }`}
                  />
                )}
              </button>

              {/* SUB MENU */}
              {activeDropdown === item.id && item.subMenu && (
                <div 
                  className={`absolute left-0 top-full mt-0 pt-1 bg-transparent z-[10000] ${getDropdownAnimation()}`}
                >
                  <div className="bg-white border shadow-2xl rounded-md py-2 w-56 origin-top-left transform transition-all duration-200 ease-out">
                    {item.subMenu.map((sub) => (
                      <div
                        key={sub.label}
                        className="relative group"
                        onMouseEnter={() => handleSubMouseEnter(sub.label)}
                        onMouseLeave={() => handleSubMouseLeave()}
                      >
                        <button
                          onClick={() => handleSubMenuClick(sub)}
                          className={`flex justify-between items-center w-full px-4 py-2 text-[10px] transition-all duration-200 group
                            ${currentPage === sub.id
                              ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-3"
                              : "hover:bg-gray-100 text-gray-700 hover:border-l-2 hover:border-gray-300 hover:pl-3"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`flex items-center justify-center w-3.5 h-3.5 text-[#ebc60a] transition-transform duration-300 group-hover:scale-110 ${
                              currentPage === sub.id ? 'scale-110' : ''
                            }`}>
                              {sub.icon}
                            </span>
                            <span className="relative">
                              {sub.label}
                              <span className="absolute -bottom-1 left-0 right-0 h-px bg-yellow-300 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                            </span>
                          </span>
                          {sub.subSubMenu && (
                            <ChevronRight className={`w-3 h-3 opacity-50 transition-transform duration-300 ${
                              activeSubDropdown === sub.label ? 'rotate-90' : 'group-hover:rotate-90'
                            }`} />
                          )}
                        </button>

                        {/* SUB-SUB MENU */}
                        {activeSubDropdown === sub.label && sub.subSubMenu && (
                          <div className={`absolute left-full top-0 ml-0 pl-1 bg-transparent z-[11000] ${getSubDropdownAnimation()}`}>
                            <div className="bg-white border shadow-2xl rounded-md py-2 w-52 origin-left transform transition-all duration-200 ease-out">
                              {sub.subSubMenu.map((s) => (
                                <button
                                  key={s.label}
                                  onClick={() => handleSubSubMenuClick(s)}
                                  className={`flex items-center gap-2 px-4 py-2 text-[10px] w-full text-left transition-all duration-200 hover:bg-gray-100 hover:border-l-2 hover:border-gray-300 hover:pl-3 ${
                                    currentPage === s.id 
                                      ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-3" 
                                      : "text-gray-700"
                                  }`}
                                >
                                  <span className="flex items-center justify-center w-3.5 h-3.5 text-[#ebc60a] transition-transform duration-300 hover:scale-110">
                                    {s.icon}
                                  </span>
                                  <span className="relative">
                                    {s.label}
                                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-yellow-300 transform origin-left transition-transform duration-300 scale-x-0 hover:scale-x-100"></span>
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS animations to your global CSS or tailwind config */}
      <style jsx global>{`
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes dropdownOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }

        @keyframes subdropdownIn {
          from {
            opacity: 0;
            transform: translateX(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        .animate-dropdown-in {
          animation: dropdownIn 0.2s ease-out forwards;
        }

        .animate-dropdown-out {
          animation: dropdownOut 0.2s ease-in forwards;
        }

        .animate-subdropdown-in {
          animation: subdropdownIn 0.15s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}