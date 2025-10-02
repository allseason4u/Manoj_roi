"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wallet,
  Layers,
  Menu,
  X,
  Bell,
  ChevronRight,
  ChevronDown,
  Shield,
  Activity,
  Eye,
  CreditCard,
  Plus,
  Edit,
  DollarSign,
  ArrowUpDown,
  TrendingUp,
  BarChart3,
  FileText,
  Settings,
  Cog,
  Database,
  Mail,
  Lock,
  ArrowRight,
  CircleDollarSign,
  Rocket,
} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { decryptData } from "@/utils/cryptoUtils";

import logo from "@/assets/jaaneramlogo.png";
import Image from "next/image";

// ================= MENU ITEMS =================
const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Activity,
    href: "/admin/dashboard",
  },
  {
    id: "users",
    label: "Users",
    icon: Shield,
    subItems: [
      {
        id: "users-list",
        label: "User List",
        icon: ArrowRight,
        href: "/admin/userlist",
      },
      {
        id: "turbo-list",
        label: "Turbo List",
        icon: ArrowRight,
        href: "/admin/turbo2oList",
      },
      {
        id: "booster-list",
        label: "Booster List",
        icon: ArrowRight,
        href: "/admin/userbooster",
      },
    ],
  },
  {
    id: "plans",
    label: "Plans",
    icon: CreditCard,
    subItems: [
      {
        id: "plans-list",
        label: "All Plans",
        icon: CreditCard,
        href: "/admin/plans",
      },
      {
        id: "plans-create",
        label: "Create Plan",
        icon: Plus,
        href: "/admin/plans/create",
      },
      {
        id: "plans-edit",
        label: "Edit Plans",
        icon: Edit,
        href: "/admin/plans/edit",
      },
    ],
  },
  {
    id: "income",
    label: "Income",
    icon: DollarSign,
    subItems: [
      {
        id: "all-income",
        label: "All Income",
        icon: CircleDollarSign,
        href: "/admin/incomelist",
      },
      {
        id: "turbo-income",
        label: "Turbo Income",
        icon: Wallet,
        href: "/admin/transactions",
      },
      {
        id: "booster-income",
        label: "Booster Income",
        icon: Rocket,
        href: "/admin/transactions/deposits",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
    subItems: [
      {
        id: "analytics-overview",
        label: "Overview",
        icon: BarChart3,
        href: "/admin/analytics",
      },
      {
        id: "analytics-reports",
        label: "Reports",
        icon: FileText,
        href: "/admin/analytics/reports",
      },
      {
        id: "analytics-charts",
        label: "Charts",
        icon: BarChart3,
        href: "/admin/analytics/charts",
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    subItems: [
      {
        id: "settings-general",
        label: "General",
        icon: Cog,
        href: "/admin/settings",
      },
      {
        id: "settings-database",
        label: "Database",
        icon: Database,
        href: "/admin/settings/database",
      },
      {
        id: "settings-email",
        label: "Email",
        icon: Mail,
        href: "/admin/settings/email",
      },
      {
        id: "settings-security",
        label: "Security",
        icon: Lock,
        href: "/admin/settings/security",
      },
    ],
  },
];

// ================= LAYOUT =================
const SidebarLayoutAdmin = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dataset, setData] = useState({});
  const [notifications, setNotifications] = useState(0);
  const [expandedMenus, setExpandedMenus] = useState({});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const findActive = (items, path) => {
      for (const item of items) {
        if (item.href === path) return { active: item.id, parent: null };
        if (item.subItems) {
          for (const sub of item.subItems) {
            if (sub.href === path) return { active: sub.id, parent: item.id };
          }
        }
      }
      return { active: null, parent: null };
    };

    const { active, parent } = findActive(menuItems, pathname);
    if (active) setActiveTab(active);

    if (parent) {
      setExpandedMenus((prev) => ({
        ...prev,
        [parent]: true,
      }));
    }
  }, [pathname]);

  const fetchData = async () => {
    try {
      const auth = Cookies.get("admintoken");
      const res = await fetch(`/api/admin/dashboard`, {
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
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= Sidebar Logic =================
  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleItemClick = (itemId, hasSubItems, href) => {
    if (hasSubItems) {
      toggleSubmenu(itemId);
    } else {
      setActiveTab(itemId);

      if (href) router.push(href);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          style={{ position: "fixed" }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        style={{ position: "fixed", boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)" }}
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 border-r-1 border-gray-800/30 z-50 transform transition-transform duration-300 ease-in-out  
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="p-4 h-full overflow-y-auto pt-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline space-x-1 cursor-pointer">
                <Image src={logo} alt="Logo" width={38} height={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Jaaneram</h1>
                <p className="text-gray-400 text-sm">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedMenus[item.id];

              const isParentActive =
                activeTab === item.id ||
                (item.subItems &&
                  item.subItems.some((sub) => sub.id === activeTab));

              return (
                <div key={item.id}>
                  <button
                    onClick={() =>
                      handleItemClick(item.id, hasSubItems, item.href)
                    }
                    className={`w-full cursor-pointer flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isParentActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {hasSubItems &&
                      (isExpanded ? (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      ))}
                  </button>

                  {hasSubItems && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <Link key={subItem.id} href={subItem.href}>
                            <button
                              onClick={() =>
                                handleItemClick(subItem.id, false, subItem.href)
                              }
                              className={`w-full cursor-pointer flex items-center gap-3 p-2 pl-6 rounded-lg text-sm transition-all duration-200 ${
                                activeTab === subItem.id
                                  ? " text-white border-r-4 border-blue-500/35"
                                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                              }`}
                            >
                              <SubIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="flex-1 text-left">
                                {subItem.label}
                              </span>
                            </button>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">Admin Panel</span>
          </div>
          <button className="relative p-2">
            <Bell className="w-5 h-5 text-gray-400" />
            {notifications > 0 && (
              <span className="absolute -top-0 -right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-62 pt-12 lg:pt-0 sm:p-4 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayoutAdmin;
