"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  Share2,
  Globe,
  TruckElectric,
  Menu,
  X,
  Bell,
  ChevronRight,
  ChevronDown,
  LogOut,
  Circle,
  DollarSign,
  Star,
  Award,
  Zap,
  Layers,
  Wallet,
  CreditCard,
  User,
  TrendingUp,
  Lock,
} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decryptData } from "@/utils/cryptoUtils";
import logo from "@/assets/jaaneramlogo.png";
import Image from "next/image";

const SidebarLayout = ({ children, activeTabName }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [activeTab, setActiveTab] = useState(activeTabName);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [dataset, setData] = useState({
    name: "John Crypto",
    memberid: "JR000000",
    shortadr: "0x0...00000",
  });

    const [boosterPack, setBoosterPack] = useState([{}]);
    const [turboPack, setTurboPack] = useState([{}]);

  const router = useRouter();

  useEffect(() => {
    setActiveTab(activeTabName);
  }, [activeTabName]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        handleLogout();
      } else {
        // Wallet changed to new account
        console.log("Account switched to:", accounts[0]);

        // If new address ≠ session address, force logout
        if (dataset?.adr && dataset.adr !== accounts[0]) {
          alert("Wallet account changed. Please log in again.");
          handleLogout();
        }
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    if (window.safepal) {
      window.safepal.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
      if (window.safepal) {
        window.safepal.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [dataset?.adr]);

  const fetchData = async () => {
    try {
      const auth = Cookies.get("auth");
      const res = await fetch(`/api/secure/dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: auth,
        },
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      const decrypted = decryptData(json);
      const parsed = JSON.parse(decrypted);
      setData(parsed);
      const boosterPackage =
        typeof parsed.boosterpack === "string"
          ? JSON.parse(parsed.boosterpack)
          : parsed.boosterpack;

      setBoosterPack(boosterPackage);

      const turboPackage =
        typeof parsed.turbopack === "string"
          ? JSON.parse(parsed.turbopack)
          : parsed.turbopack;

      setTurboPack(turboPackage);
      if (parsed.isprofile === 0) {
        router.push("/user/profile");
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const boosterIcons = {
    20: DollarSign,
    40: Star,
    80: Award,
    160: Zap,
  };

  const turboIcons = {
    8: DollarSign,
    23: Star,
  };

  const sidebarItems = [
    { name: "Dashboard", icon: Home, link: "/user/dashboard" },
    {
      name: "Team",
      icon: Users,
      submenu: [
        { name: "JR Booster Team", icon: Users, link: "/user/teambooster" },
        { name: "J Turbo Team", icon: Users, link: "/user/team" },
      ],
    },
    { name: "Referral", icon: Share2, link: "/user/referrals" },
    {
      name: "JR Booster",
      icon: Globe,
      submenu: boosterPack
        .filter((item) => item.isShow === 1)
        .map((item) => {
          const Icon = boosterIcons[item.Amount] || DollarSign;
          return {
            name: item.packName,
            icon: Icon,
            link: `/user/cycletree${item.Amount === 20 ? "" : item.Amount}`,
            packageId: item.packageId,
          };
        }),
    },
    {
      name: "Jturbo 2.O",
      icon: TruckElectric,
      submenu: turboPack
        .filter((item) => item.isShow === 1)
        .map((item) => {
          const Icon = turboIcons[item.Amount] || DollarSign;
          return {
            name: item.packName,
            icon: Icon,
            link: `/user/turbo${item.Amount}`,
            packageId: item.packageId,
          };
        }),
    },
    // { name: "Level", icon: Layers, link: "/user/level" },
    { name: "Income", icon: TrendingUp, link: "/user/income" },
    {
      name: "Wallet Menu",
      icon: Wallet,
      submenu: [
        { name: "Wallet", icon: Wallet, link: "/user/purchasewallet" },
        {
          name: "Wallet Transaction",
          icon: CreditCard,
          link: "/user/purchasewhistory",
        },
      ],
    },
    { name: "Profile", icon: User, link: "/user/profile" },
    { name: "Change Password", icon: Lock, link: "/user/changepassword" },
  ];

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden text-gray-800">
      {copiedText && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-2xl border border-green-400/20">
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 fill-current animate-pulse" />
              <span className="text-sm font-medium">{copiedText}</span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <div
            className="flex items-baseline space-x-1"
            onClick={() => {
              router.push("/user/dashboard");
            }}
          >
            <Image src={logo} alt="Logo" width={38} height={20} />
            <h2 className="text-2xl font-bold text-gray-800">Jaaneram</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-0 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {sidebarItems.map((item) => (
            <div key={item.name}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    setOpenSubmenu(
                      openSubmenu === item.name ? null : item.name
                    );
                  } else {
                    router.push(item.link);
                    setActiveTab(item.name);
                  }
                }}
                className={`w-full flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group ${
                  activeTab === item.name
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      activeTab === item.name
                        ? "text-blue-500"
                        : "text-gray-400 group-hover:text-blue-500"
                    } transition-colors`}
                  />
                  {item.name}
                </div>
                {item.submenu ? (
                  openSubmenu === item.name ? (
                    <ChevronDown className="h-4 w-4 text-blue-500 transition-transform duration-300" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-300" />
                  )
                ) : null}
              </button>

              <div
                className={`ml-10 mt-1 space-y-1  overflow-hidden transition-all duration-300 ${
                  openSubmenu === item.name
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.submenu?.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      router.push(sub.link);
                      setActiveTab(sub.name);
                      setOpenSubmenu(item.name);
                    }}
                    className={`w-full flex items-center cursor-pointer text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      activeTab === sub.name
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <sub.icon className="mr-2 h-4 w-4" />
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-72 min-h-screen">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center space-x-4">
                <div
                  className="lg:hidden  flex items-baseline space-x-1"
                  onClick={() => {
                    router.push("/user/dashboard");
                  }}
                >
                  <Image src={logo} alt="Logo" width={28} height={10} />
                  <h2 className="text-md font-bold text-gray-800">Jaaneram</h2>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold animate-pulse">
                    3
                  </span>
                </button> */}
                <div className="flex items-center space-x-3 bg-gray-100 rounded-xl px-3 py-2">
                  {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {dataset?.name?.charAt(0) || "U"}
                  </div> */}
                  <div className="block">
                    <p className="text-sm font-medium text-gray-800">
                      Id: {dataset?.memberid}
                    </p>

                    {dataset?.shortadr?.charAt(0) != "9" && (
                      <p className="text-xs text-gray-500">
                        {dataset?.shortadr}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative z-10">{children}</main>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%) translateX(-50%);
            opacity: 0;
          }
          to {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SidebarLayout;
