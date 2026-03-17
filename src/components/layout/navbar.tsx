import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";
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
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

type PageType =
  | "dashboard"
  | "accounts"
  | "investments"
  | "transfer"
  | "add-beneficiary"
  | "scheduled-transfer"
  | "deposits"
  | "fd-open"
  | "rd-open"
  | "fd-closure"
  | "auto-renewal"
  | "deposit-calculator"
  | "loans"
  | "apply-loan"
  | "bills"
  | "electricity-bills"
  | "mobile-recharge"
  | "cards"
  | "services"
  | "cheque-book"
  | "address-change"
  | "nominee-update"
  | "profile"
  | "security"
  | "notifications"
  | "password-change"
  | "txn-password-reset"
  | "login-history"
  | "device-management"
  |"deposit"
  |"openrecurringdeposit"
  | "txn-limits";
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
    label: "Transfer Money",
    id: "transfer",
    icon: <Send className="w-4 h-4" />,
    subMenu: [
      { label: "Fund Transfer", id: "transfer", icon: <DollarSign className="w-4 h-4" /> },
      { label: "Add Beneficiary", id: "add-beneficiary", icon: <UserIcon className="w-4 h-4" /> },
      { label: "Scheduled Transfers", id: "scheduled-transfer", icon: <Clock className="w-4 h-4" /> },
    ],
  },

  {
    label: "Deposits",
    id: "deposit",
    icon: <FileText className="w-4 h-4" />,
    
  },

  {
    label: "Loans",
    id: "loans",
    icon: <FileText className="w-4 h-4" />,
    subMenu: [
      { label: "My Loans", id: "loans", icon: <Wallet className="w-4 h-4" /> },
      { label: "Apply Loan", id: "apply-loan", icon: <DollarSign className="w-4 h-4" /> },
    ],
  },
 {
    label: "Services",
    id: "services",
    icon: <Settings className="w-4 h-4" />,
    subMenu: [
      { label: "Cheque Book Request", id: "cheque-book", icon: <FileText className="w-4 h-4" /> },
      { label: "Address Change Request", id: "address-change", icon: <MapPin className="w-4 h-4" /> },
      { label: "Nominee Update", id: "nominee-update", icon: <UserIcon className="w-4 h-4" /> },
    ],
  },
  {
    label: "Bill Pay",
    id: "bills",
    icon: <FileText className="w-4 h-4" />,
    subMenu: [
      { label: "Electricity Bills", id: "electricity-bills", icon: <FileText className="w-4 h-4" /> },
      { label: "Mobile Recharge", id: "mobile-recharge", icon: <Smartphone className="w-4 h-4" /> },
    ],
  },


  
  {
    label: "Cards",
    id: "cards",
    icon: <CreditCard className="w-4 h-4" />,
    subMenu: [
      { label: "My Cards", id: "cards", icon: <CreditCard className="w-4 h-4" /> },
      { label: "Apply New Card", id: "cards", icon: <FileText className="w-4 h-4" /> },
    ],
  },

 

  {
    label: "Profile & Security",
    id: "profile",
    icon: <UserIcon className="w-4 h-4" />,
    subMenu: [
      { label: "Profile", id: "profile", icon: <UserIcon className="w-4 h-4" /> },
      { label: "Security", id: "security", icon: <Lock className="w-4 h-4" /> },
      { label: "Notifications", id: "notifications", icon: <Bell className="w-4 h-4" /> },
      { label: "Password Change", id: "password-change", icon: <Lock className="w-4 h-4" /> },
      { label: "Txn Password Reset", id: "txn-password-reset", icon: <Lock className="w-4 h-4" /> },
      { label: "Login History", id: "login-history", icon: <Clock className="w-4 h-4" /> },
      { label: "Device Management", id: "device-management", icon: <Smartphone className="w-4 h-4" /> },
      { label: "Transaction Limits", id: "txn-limits", icon: <Target className="w-4 h-4" /> },
    ],
  },
];
const activeMap: Record<string, PageType[]> = {
  accounts: ["accounts", "investments"],
  transfer: ["transfer", "add-beneficiary", "scheduled-transfer"],
  deposits: ["fd-open", "rd-open", "fd-closure", "auto-renewal", "deposit-calculator"],
  loans: ["loans", "apply-loan"],
  services: ["cheque-book", "address-change", "nominee-update"],
  bills: ["bills", "electricity-bills", "mobile-recharge"],
  cards: ["cards"],
  profile: [
    "profile",
    "security",
    "notifications",
    "password-change",
    "txn-password-reset",
    "login-history",
    "device-management",
    "txn-limits",
  ],
};
export function Navbar({ currentPage, onPageChange, onLogout }: NavbarProps) {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  // --- State ---
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [activeRect, setActiveRect] = useState<{ left: number; bottom: number } | null>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isClosing, setIsClosing] = useState(false);
  const [mobileOptionsOpen, setMobileOptionsOpen] = useState(false);

  // --- Refs ---
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
useEffect(() => {
  const handleOutsideClick = () => {
    setLangOpen(false);
    setProfileOpen(false);
  };

  document.addEventListener("click", handleOutsideClick);

  return () => {
    document.removeEventListener("click", handleOutsideClick);
  };
}, []);
  // Close logic when clicking outside
  useEffect(() => {
    const close = (e: MouseEvent) => {
      // Close main dropdown if click is outside nav AND outside the dropdown layer
      const target = e.target as Node;
      // We need to check if we clicked inside the floating dropdown, which isn't inside navRef in DOM necessarily if portals were used,
      // but here we render it inside Nav.
      if (
        navRef.current &&
        !navRef.current.contains(target)
      ) {
        startClosingAnimation();
      }
    };

    // Also close on resize to prevent floating menus in wrong place
    const handleResize = () => {
      setActiveDropdown(null);
      setActiveRect(null);
    };

    document.addEventListener("mousedown", close);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startClosingAnimation = () => {
    setIsClosing(true);
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
      setIsClosing(false);
      setActiveRect(null);
    }, 200);
  };

  // --- Handlers ---
  const setDropdownPosition = (e: React.MouseEvent | React.FocusEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Adjust if it goes off screen right
    let left = rect.left;
    if (left + 220 > window.innerWidth) { // 220 is approx width of dropdown
      left = window.innerWidth - 230;
    }
    setActiveRect({ left: left, bottom: rect.bottom });
  }

  const handleMouseEnter = (item: MenuItem, e: React.MouseEvent) => {
    if (isClosing) {
      setIsClosing(false);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    }
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    // Set Position
    setDropdownPosition(e);
    setActiveDropdown(item.id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      startClosingAnimation();
    }, 200);
  };


  // Keep dropdown open when hovering the floating dropdown itself
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (isClosing) setIsClosing(false);
  };

  const handleMenuItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (!item.subMenu) {
      onPageChange(item.id);
      startClosingAnimation();
    } else {
      // If clicking the same item, toggle off
      if (activeDropdown === item.id) {
        startClosingAnimation();
      } else {
        // Open new
        setDropdownPosition(e);
        setActiveDropdown(item.id);
        setActiveSubDropdown(null);
      }
    }
  };

  // Submenu handlers
  const handleSubMouseEnter = (label: string) => {
    if (subDropdownTimeoutRef.current) clearTimeout(subDropdownTimeoutRef.current);
    setActiveSubDropdown(label);
  };

  const handleSubMouseLeave = () => {
    subDropdownTimeoutRef.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 150);
  };

  const handleSubMenuClick = (subItem: MenuItem) => {
    if (!subItem.subSubMenu) {
      onPageChange(subItem.id);
      startClosingAnimation();
    }
  };

  const handleSubSubMenuClick = (subSubItem: MenuItem) => {
    onPageChange(subSubItem.id);
    startClosingAnimation();
  };

  // Helper to find the active menu object
  const activeMenuItem = menuItems.find(item => item.id === activeDropdown);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-[9999] shadow-md bg-background border-b border-border">

      {/* 1. MOBILE HEADER */}
      <div className="lg:hidden flex justify-between items-center px-4 py-2 bg-background">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onPageChange("dashboard")}>
          <img src="/images/jayam-logo.png" width={70} alt="Jayam Bank Logo" className="object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-1">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-white" />
          </button>
          <button onClick={() => setMobileOptionsOpen(true)} className="p-1.5 rounded-md hover:bg-gray-100 active:bg-gray-200">
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* 2. DESKTOP HEADER */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-1">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition duration-300" onClick={() => onPageChange("dashboard")}>
            <img src="/images/jayam-logo.png" width={90} alt="Jayam Bank Logo" className="transition-transform hover:scale-105 duration-300" />
          </div>
          <div className="flex items-center gap-4">
            {/* Language */}
            <div className="relative">
              <button onClick={(e) => {
  e.stopPropagation();
  setLangOpen((prev) => !prev);
  setProfileOpen(false);
}}
              className="flex flex-col items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-all duration-300 hover:scale-105">
                <Globe className="w-5 h-5 text-yellow-500" />
                <span className="text-[10px] text-gray-600 mt-1">Language</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white border shadow-xl rounded-md w-32 py-1 z-[99999] animate-in fade-in slide-in-from-top-2">
                  {["EN", "HI", "TE", "TA"].map((lang) => (
                    <button key={lang} onClick={() => { setLanguage(lang); setLangOpen(false); }} className={`w-full text-left px-3 py-2 text-[11px] hover:bg-gray-100 ${language === lang ? "bg-yellow-50 border-l-2 border-yellow-500" : ""}`}>
                      {lang === "EN" && "🇬🇧 English"}
                      {lang === "HI" && "🇮🇳 Hindi"}
                      {lang === "TE" && "🇮🇳 Telugu"}
                      {lang === "TA" && "🇮🇳 Tamil"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Notification */}
            <button className="flex flex-col items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-all duration-300 hover:scale-105 relative group">
              <Bell className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] text-gray-600 mt-1">Notification</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            {/* ATM */}
            <button className="flex flex-col items-center justify-center hover:bg-gray-100 p-2 rounded-md transition-all duration-300 hover:scale-105 group">
              <MapPin className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] text-gray-600 mt-1">ATM/Branch</span>
            </button>
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex flex-col items-center justify-center hover:bg-accent p-2 rounded-md transition-all duration-300 hover:scale-105 group"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-yellow-500 group-hover:-rotate-12 transition-transform" />
              )}
              <span className="text-[10px] text-muted-foreground mt-1">Theme</span>
            </button>
            {/* Profile */}
            <div className="relative">
              <button onClick={(e) => {
  e.stopPropagation();
  setProfileOpen((prev) => !prev);
  setLangOpen(false);
}} className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-200 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex justify-center items-center text-white text-xs font-bold shadow-md">{user?.name.charAt(0).toUpperCase()}</div>
                <div className="text-left leading-tight">
                  <p className="text-[11px] font-semibold">{user?.name}</p>
                  <p className="text-[9px] opacity-60">{user?.loginType}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-primary transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-background border shadow-xl rounded-md w-40 py-2 z-[99999] animate-in fade-in slide-in-from-top-2">
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-[11px] hover:bg-accent"><UserIcon className="w-4 h-4 text-yellow-500" /> My Profile</button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-[11px] hover:bg-accent"><Settings className="w-4 h-4 text-yellow-500" /> Edit Profile</button>
                  <button onClick={onLogout} className="flex items-center gap-2 w-full px-4 py-2 text-[11px] hover:bg-destructive/10 text-destructive"><LogOut className="w-4 h-4 text-yellow-500" /> Logout</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 3. MOBILE SIDE DRAWER */}
      {mobileOptionsOpen && (
        <div className="lg:hidden fixed inset-0 z-[10000]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setMobileOptionsOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[75%] max-w-xs bg-background shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="bg-primary/5 p-4 flex justify-between items-start border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex justify-center items-center text-white text-sm font-bold shadow">{user?.name.charAt(0).toUpperCase()}</div>
                <div><p className="text-sm font-bold text-gray-800">{user?.name}</p><p className="text-xs text-gray-500">{user?.loginType}</p></div>
              </div>
              <button onClick={() => setMobileOptionsOpen(false)} className="p-1 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-50 rounded"><UserIcon className="w-4 h-4 text-yellow-500" /> My Profile</button>
                <button className="flex items-center gap-3 w-full p-2 text-sm text-gray-700 hover:bg-gray-50 rounded"><Settings className="w-4 h-4 text-yellow-500" /> Settings</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Language</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["EN", "HI", "TE", "TA"].map((lang) => (
                      <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-2 text-xs border rounded ${language === lang ? "border-yellow-500 bg-yellow-50 text-gray-800" : "border-gray-200 text-gray-600"}`}>{lang === "EN" && "English"}{lang === "HI" && "Hindi"}{lang === "TE" && "Telugu"}{lang === "TA" && "Tamil"}</button>
                    ))}
                  </div>
                </div>
                <button className="flex items-center gap-3 w-full p-3 bg-secondary/50 rounded-lg text-sm font-medium text-foreground"><MapPin className="w-4 h-4 text-yellow-500" /> Find Nearest ATM / Branch</button>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground flex items-center gap-3">
                    {theme === "dark" ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-blue-500" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-semibold"
                  >
                    Switch
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button onClick={onLogout} className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"><LogOut className="w-4 h-4" /> Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN MENU BAR (SCROLLABLE) */}
      <div className="bg-secondary/50 backdrop-blur-sm border-t border-border relative z-[9000]">
        <div
          ref={dropdownRef}
          className="max-w-7xl  mx-auto flex gap-1 h-10 items-center px-2 sm:px-6 overflow-x-auto whitespace-nowrap scrollbar-hide touch-pan-x"
        >
         {menuItems.map((item) => {
  const isActive =
    currentPage === item.id ||
    activeMap[item.id]?.includes(currentPage);

  return (
    <div
      key={item.id}
      className="relative h-full flex items-center flex-shrink-0"
      onMouseEnter={(e) => item.subMenu && handleMouseEnter(item, e)}
      onMouseLeave={() => item.subMenu && handleMouseLeave()}
    >
      <button
        onClick={(e) => handleMenuItemClick(item, e)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300
        text-[10px] font-medium leading-none relative overflow-hidden
        ${
          isActive
            ? "bg-primary text-primary-foreground shadow-lg transform scale-[1.02]"
            : "hover:bg-accent text-foreground hover:shadow-sm"
        }`}
      >
        {/* Active Indicator */}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 animate-pulse"></span>
        )}

        <span className="flex items-center justify-center w-3.5 h-3.5 text-[#ebc60a]">
          {item.icon}
        </span>

        <span className="relative">
          {item.label}
          <span
            className={`absolute bottom-0 left-0 right-0 h-px bg-yellow-500 transform origin-left transition-transform duration-300 ${
              activeDropdown === item.id ? "scale-x-100" : "scale-x-0"
            }`}
          ></span>
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
    </div>
  );
})}
        </div>
      </div>

      {/* 5. FLOATING DROPDOWN RENDERER (OUTSIDE SCROLL CONTAINER) */}
      {activeDropdown && activeMenuItem && activeMenuItem.subMenu && activeRect && (
        <div
          className={`fixed z-[10000] ${isClosing ? 'animate-dropdown-out' : 'animate-dropdown-in'}`}
          style={{
            top: activeRect.bottom,
            left: activeRect.left
          }}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white border shadow-2xl rounded-md py-2 w-56 transform transition-all duration-200 ease-out">
            {activeMenuItem.subMenu.map((sub) => (
              <div key={sub.label} className="relative group" onMouseEnter={() => handleSubMouseEnter(sub.label)} onMouseLeave={handleSubMouseLeave}>
                <button
                  onClick={() => handleSubMenuClick(sub)}
                  className={`flex justify-between items-center w-full px-4 py-2 text-[10px] transition-all duration-200 group ${currentPage === sub.id ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-3" : "hover:bg-accent text-foreground hover:border-l-2 hover:border-border hover:pl-3"}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-3.5 h-3.5 text-[#ebc60a] transition-transform duration-300 group-hover:scale-110">{sub.icon}</span>
                    {sub.label}
                  </span>
                  {sub.subSubMenu && <ChevronRight className="w-3 h-3 opacity-50" />}
                </button>

                {/* SUB-SUB MENU (Still relative to main dropdown, so it works fine) */}
                {activeSubDropdown === sub.label && sub.subSubMenu && (
                  <div className={`absolute left-full top-0 ml-0 pl-1 bg-transparent z-[11000] ${activeSubDropdown ? 'animate-subdropdown-in' : ''}`}>
                    <div className="bg-background border shadow-2xl rounded-md py-2 w-52">
                      {sub.subSubMenu.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => handleSubSubMenuClick(s)}
                          className={`flex items-center gap-2 px-4 py-2 text-[10px] w-full text-left transition-all duration-200 hover:bg-accent hover:border-l-2 hover:border-border hover:pl-3 ${currentPage === s.id ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-3" : "text-foreground"}`}
                        >
                          {s.icon} {s.label}
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

      {/* STYLES */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes dropdownIn { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes dropdownOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-10px) scale(0.95); } }
        @keyframes subdropdownIn { from { opacity: 0; transform: translateX(-10px) scale(0.95); } to { opacity: 1; transform: translateX(0) scale(1); } }
        .animate-dropdown-in { animation: dropdownIn 0.2s ease-out forwards; }
        .animate-dropdown-out { animation: dropdownOut 0.2s ease-in forwards; }
        .animate-subdropdown-in { animation: subdropdownIn 0.15s ease-out forwards; }
      `}</style>
    </nav>
  );
}
