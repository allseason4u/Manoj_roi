"use client";
import React, { useState, useEffect } from "react";
import {
  Wallet,
  Zap,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Users,
  Globe,
  Circle,
  Loader2,
  Copy,
} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decryptData } from "@/utils/cryptoUtils";
import { apiCaller } from "@/utils/apiCaller";

const DashboardPage = () => {
  const [dataset, setData] = useState({});
  const [nodes, setNodes] = useState([]);
  const [copiedText, setCopiedText] = useState("");
  const [loading, setLoading] = useState(true); // 🔹 default true
  const [selectedPlan, setSelectedPlan] = useState(null);

  const router = useRouter();
  const [memberid, setmemberid] = useState("");
  const [priddata, setPride] = useState({});

  const [boosterPack, setBoosterPack] = useState([{}]);
  const [isboosterPack, setIsBoosterPack] = useState([{}]);
  const [turboPack, setTurboPack] = useState([{}]);
  const [isturboPack, setIsTurboPack] = useState([{}]);

  const getMemberprid = async () => {
    const { success, data } = await apiCaller("/secure/getMemberprid");
    const MYdata = data[0];
    if (success && MYdata && typeof MYdata.prid !== "undefined") {
      setPride({ prid: MYdata.prid + 1, amount: MYdata.amount });
    } else {
      setPride({});
    }
  };

  // 🔹 Fetch Dashboard Data
  useEffect(() => {
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
        setmemberid(parsed.memberid);

        const boosterPackage =
          typeof parsed.boosterpack === "string"
            ? JSON.parse(parsed.boosterpack)
            : parsed.boosterpack;

        const isshow = boosterPackage.filter(
          (t) => t.Amount == parsed?.nextbooster && t.isShow == 1
        );

        setIsBoosterPack(isshow);

        setBoosterPack(boosterPackage);

        const turboPackage =
          typeof parsed.turbopack === "string"
            ? JSON.parse(parsed.turbopack)
            : parsed.turbopack;

        const isshowturbo = turboPackage.filter(
          (t) => t.Amount == parsed?.nextturbo && t.isShow == 1
        );

        setIsTurboPack(isshowturbo);

        setTurboPack(turboPackage);

        if (parsed.isprofile === 0) {
          router.push("/user/profile");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    getMemberprid();
  }, [router]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 20; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
      setNodes(newNodes);
    };
    generateNodes();

    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          x: (node.x + node.speed) % 100,
          y: (node.y + node.speed * 0.3) % 100,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 w-full bg-gray-200 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-10 w-40 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    );
  }

  // 🔹 Income Cards
  const incomeCards = [
    {
      label: "Direct Income",
      value: `$${dataset?.directincome}`,
      icon: ArrowUpRight,
      color: "from-green-400 to-green-600",
    },
    {
      label: "Daily Rewards",
      value: `$${dataset?.dailyincome}`,
      icon: Zap,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Total Earned",
      value: `$${dataset?.totalincome}`,
      icon: TrendingUp,
      color: "from-purple-400 to-purple-600",
    },
    {
      label: "Referrals",
      value: `${dataset?.totdir}`,
      icon: Users,
      color: "from-orange-400 to-orange-600",
    },
    {
      label: "Team Size",
      value: `${dataset?.totteam}`,
      icon: Globe,
      color: "from-pink-400 to-pink-600",
    },
    {
      label: "Active Members",
      value: `${dataset?.totactive}`,
      icon: Activity,
      color: "from-cyan-400 to-cyan-600",
    },
  ];

  const handleUpgrade = async (planamount) => {
    try {
      setLoading(true);
      if (planamount == 20) router.push("/user/cycletree");
      else if (planamount == 40) router.push("/user/cycletree40");
      else if (planamount == 80) router.push("/user/cycletree80");
      else if (planamount == 160) router.push("/user/cycletree160");
    } catch (err) {
      console.error(err);
      alert("Upgrade failed.");
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  const handleUpgradeturbo = async (planamount) => {
    try {
      setLoading(true);
      if (planamount == 23) router.push("/user/turbo23");
    } catch (err) {
      console.error(err);
      alert("Upgrade failed.");
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="relative bg-gray-50 min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="#2563EB"
              opacity={node.opacity}
              className="animate-pulse"
            />
          ))}
        </svg>
      </div>

      {copiedText && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-2xl border">
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 fill-current animate-pulse" />
              <span className="text-sm font-medium">{copiedText}</span>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-4 relative z-10">
        {/* <div className="flex flex-wrap gap-4 mb-5">
          {dataset?.nextbooster != 0 && (
            <button
              onClick={() => handleUpgrade(dataset?.nextbooster)}
              disabled={loading && selectedPlan === "Basic"}
              className="cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center"
            >
              {loading && selectedPlan === "Basic" ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : (
                <Wallet className="mr-2 h-5 w-5" />
              )}
              Booster ${dataset?.nextbooster}
            </button>
          )}
          {dataset?.nextturbo != 0 && (
            <button
              onClick={() => handleUpgrade("Premium")}
              disabled={loading && selectedPlan === "Premium"}
              className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center"
            >
              {loading && selectedPlan === "Premium" ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : (
                <Zap className="mr-2 h-5 w-5" />
              )}
              Turbo ${dataset?.nextturbo}
            </button>
          )}
        </div> */}

        {/* Summary Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-0">
            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* <div className="p-2 bg-purple-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div> */}
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    JTurbo Last buy
                  </p>
                  <p className="text-l sm:text-2xl   font-bold text-gray-900">
                    ${(dataset?.turbo).toLocaleString()} Package
                  </p>
                </div>
              </div>
              {dataset?.nextturbo != 121212 && isturboPack.length > 0 && (
                <button
                  onClick={() => handleUpgradeturbo(dataset?.nextturbo)}
                  disabled={loading && selectedPlan === "Premium"}
                  className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center"
                >
                  {loading && selectedPlan === "Premium" ? (
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  ) : (
                    <Zap className="mr-2 h-5 w-5" />
                  )}
                  Turbo ${dataset?.nextturbo}
                </button>
              )}
              {(dataset?.nextturbo == 121212 || isturboPack.length == 0) && (
                <button
                  disabled={loading && selectedPlan === "Premium"}
                  readOnly
                  className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center"
                >
                  Comming Soon
                </button>
              )}
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* <div className="p-2 bg-amber-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div> */}
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    JR Booster Last Buy
                  </p>
                  <p className="text-l sm:text-2xl font-bold text-gray-900">
                    {dataset?.booster == 0
                      ? "No Package Yet."
                      : ` ${(dataset?.booster).toLocaleString()} Package`}
                  </p>
                </div>
              </div>
              {dataset?.nextbooster != 0 && isboosterPack.length > 0 && (
                <button
                  onClick={() => handleUpgrade(dataset?.nextbooster)}
                  disabled={loading && selectedPlan === "Basic"}
                  className="cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center"
                >
                  {loading && selectedPlan === "Basic" ? (
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  ) : (
                    <Wallet className="mr-2 h-5 w-5" />
                  )}
                  Booster ${dataset?.nextbooster}
                </button>
              )}
              {(dataset?.nextturbo == 0 || isboosterPack.length == 0) && (
                <button
                  disabled={loading && selectedPlan === "Premium"}
                  readOnly
                  className="cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center"
                >
                  Comming Soon
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        {/* <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
          <h2 className="text-gray-900 text-md font-bold mb-2">
            Your Referral Link
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              onClick={() => {
                window.open(
                  `https://jaaneram.shop/register?ref=${memberid}`,
                  "_blank"
                );
              }}
              type="text"
              readOnly
              value={`https://jaaneram.shop/register?ref=${memberid}`}
              className="bg-gray-50 text-blue-800 cursor-pointer px-4 py-2 rounded-md w-full sm:flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://jaaneram.shop/register?ref=${memberid}`
                );
                setCopiedText("Referral link copied to clipboard!");
                setTimeout(() => setCopiedText(""), 3000);
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-md font-semibold hover:shadow-md transition-all"
            >
              Copy Link
            </button>
          </div>
        </div> */}

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
          <h2 className="text-gray-900 text-md font-bold mb-2  text-left">
            Your Referral Link
          </h2>

          <div className="relative flex items-center">
            {/* Input */}
            <input
              onClick={() =>
                window.open(
                  `https://jaaneram.shop/register?ref=${memberid}`,
                  "_blank"
                )
              }
              type="text"
              readOnly
              value={`https://jaaneram.shop/register?ref=${memberid}`}
              className="bg-gray-50 text-blue-800 cursor-pointer px-4 py-2 pr-10 rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />

            {/* Copy Icon */}
            <Copy
              size={20}
              className="absolute right-3 text-gray-600 cursor-pointer hover:text-blue-600 transition"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://jaaneram.shop/register?ref=${memberid}`
                );
                setCopiedText("Referral link copied!");
                setTimeout(() => setCopiedText(""), 2500);
              }}
            />
          </div>
        </div>

        {/* Income Cards */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-5">
          {incomeCards.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow hover:shadow-lg transition-all group"
            >
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${item.color} w-fit mb-3`}
              >
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold">
                {typeof item.value === "number"
                  ? `${item.value.toLocaleString()}`
                  : item.value || 0}
              </h3>
              <p className="text-gray-600 text-sm font-medium">{item.label}</p>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Turbo 2.0 Plan */}

          {/* <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 text-xl font-semibold">Turbo 2.0</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                $8
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    Total Direct
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {dataset?.turbodirect || 0}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    Total Earning
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ${dataset?.turboearning || 0}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    Total Cycle
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {dataset?.turbocycle || 0}
                </p>
              </div>
            </div>
          </div> */}

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 text-lg font-semibold">Turbo 2.0</h2>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-medium rounded-full">
                $8
              </span>
            </div>

            {/* Compact Grid */}
            <div className=" grid grid-cols-3 gap-2">
              {/* Total Direct */}
              <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-2 hover:shadow-md transition-all duration-300 border border-orange-100/50 hover:border-orange-200">
                <div className="flex flex-col items-center">
                  <div className="p-1.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow group-hover:shadow-orange-200 mb-1">
                    <Users className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">
                    Direct
                  </span>
                  <p className="text-base font-bold text-gray-900 group-hover:text-orange-600">
                    {dataset?.turbodirect || 0}
                  </p>
                </div>
              </div>

              {/* Total Earning */}
              <div className="group relative bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-2 hover:shadow-md transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200">
                <div className="flex flex-col items-center">
                  <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg shadow group-hover:shadow-emerald-200 mb-1">
                    <TrendingUp className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">
                    Earning
                  </span>
                  <p className="text-base font-bold text-gray-900 group-hover:text-emerald-600">
                    ${dataset?.turboearning || 0}
                  </p>
                </div>
              </div>

              {/* Total Cycle */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-2 hover:shadow-md transition-all duration-300 border border-blue-100/50 hover:border-blue-200">
                <div className="flex flex-col items-center">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow group-hover:shadow-blue-200 mb-1">
                    <Activity className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">
                    Cycle
                  </span>
                  <p className="text-base font-bold text-gray-900 group-hover:text-blue-600">
                    {dataset?.turbocycle || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 text-lg font-semibold">Booster</h2>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-medium rounded-full">
                $20
              </span>
            </div>

            {/* Compact Grid */}
            <div className=" grid grid-cols-3 gap-2">
              {/* Total Direct */}
              <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-2 hover:shadow-md transition-all duration-300 border border-orange-100/50 hover:border-orange-200">
                <div className="flex flex-col items-center">
                  <div className="p-1.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow group-hover:shadow-orange-200 mb-1">
                    <Users className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">
                    Direct
                  </span>
                  <p className="text-base font-bold text-gray-900 group-hover:text-orange-600">
                    {dataset?.boosterdirect || 0}
                  </p>
                </div>
              </div>

              {/* Total Earning */}
              <div className="group relative bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-2 hover:shadow-md transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200">
                <div className="flex flex-col items-center">
                  <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg shadow group-hover:shadow-emerald-200 mb-1">
                    <TrendingUp className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">
                    Earning
                  </span>
                  <p className="text-base font-bold text-gray-900 group-hover:text-emerald-600">
                    ${dataset?.boosterearning || 0}
                  </p>
                </div>
              </div>

              {/* Total Cycle */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-2 hover:shadow-md transition-all duration-300 border border-blue-100/50 hover:border-blue-200">
                <div className="flex flex-col items-center">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow group-hover:shadow-blue-200 mb-1">
                    <Activity className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 leading-tight">
                    Cycle
                  </span>
                  <p className="text-base font-bold text-gray-900 group-hover:text-blue-600">
                    {dataset?.boostercycle || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default DashboardPage;
