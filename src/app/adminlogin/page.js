"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Lock,
} from "lucide-react";
import logo from "@/assets/jaaneramlogo.png";
import Image from "next/image";
import { encryptData, decryptData } from "@/utils/cryptoUtils";

export default function AdminLoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [blockchainNodes, setBlockchainNodes] = useState([]);
  const [moneyNodes, setMoneyNodes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + Math.floor(Math.random() * 30) + 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nodes = [...Array(8)].map((_, i) => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
      delay: `${i * 0.7}s`,
      duration: `${4 + Math.random() * 2}s`,
    }));
    setMoneyNodes(nodes);
  }, []);

  useEffect(() => {
    const generateNodes = () => {
      const nodes = [];
      for (let i = 0; i < 8; i++) {
        nodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 12 + 6,
          opacity: Math.random() * 0.4 + 0.2,
        });
      }
      setBlockchainNodes(nodes);
    };

    generateNodes();
    const interval = setInterval(generateNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!adminId.trim()) {
      newErrors.adminId = "Admin ID is required";
    } else if (adminId.length < 3) {
      newErrors.adminId = "Admin ID must be at least 3 characters";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdminLogin = async () => {
    if (!validateForm()) {
      setLoginStatus("");
      return;
    }

    setIsLoading(true);
    setLoginStatus("");

    try {
      const encryptedPayload = encryptData(
        JSON.stringify({ adminId, password })
      );

      const formDataToSend = new URLSearchParams();
      formDataToSend.append("data", encryptedPayload);

      const res = await fetch("/api/auth/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataToSend.toString(),
      });

      const encryptedResponse = await res.json();
      const data = JSON.parse(decryptData(encryptedResponse));

      if (data.token === "ok") {
        window.location.href = "/admin/dashboard";
      } else {
        setLoginStatus("Invalid credentials");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setLoginStatus("Login failed, please try again later");
      setIsLoading(false);
    }
  };

  const FloatingOrb = ({
    size = "w-3 h-3",
    delay = 0,
    duration = 5,
    color = "blue",
  }) => (
    <div
      className={`absolute ${size} ${
        color === "blue"
          ? "bg-gradient-to-r from-blue-400 to-purple-400"
          : "bg-gradient-to-r from-green-400 to-emerald-400"
      } rounded-full opacity-20 animate-pulse shadow-lg`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: "translateY(0px)",
      }}
    />
  );

  const GridPattern = () => (
    <div className="absolute inset-0 opacity-[0.05]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, #3b82f6 1px, transparent 1px),
          linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );

  const BlockchainAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {blockchainNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              opacity: node.opacity,
              animationDelay: `${node.id * 0.4}s`,
              animationDuration: `4s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping" />
          </div>
        ))}
      </div>
    </div>
  );

  const MoneyAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {moneyNodes.map((node, i) => (
        <div
          key={i}
          className="absolute opacity-15"
          style={{
            left: node.left,
            top: node.top,
            animationDelay: node.delay,
            animationDuration: node.duration,
          }}
        >
          <div className="relative animate-bounce">
            <DollarSign size={20} className="text-emerald-400 drop-shadow-lg" />
            <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-30 animate-ping" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden flex items-center justify-center p-4">
      <div className="fixed inset-0 z-0">
        <GridPattern />
        <BlockchainAnimation />
        <MoneyAnimation />
        <FloatingOrb size="w-4 h-4" delay={0} duration={8} color="blue" />
        <FloatingOrb size="w-3 h-3" delay={1} duration={6} color="green" />
        <FloatingOrb size="w-5 h-5" delay={2} duration={10} color="blue" />
        <FloatingOrb size="w-2 h-2" delay={3} duration={7} color="green" />
        <FloatingOrb size="w-3 h-3" delay={4} duration={9} color="blue" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/30 p-8 shadow-2xl shadow-blue-500/10">
          {/* Header */}
          <div className="flex flex-col  items-center justify-center space-x-3 mb-8">
            <div className="relative">
              <div
                className="flex items-baseline space-x-1 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                <Image src={logo} alt="Logo" width={38} height={20} />
                <h2 className="text-2xl font-bold text-gray-800">Jaaneram</h2>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm mt-1">Secure Admin Panel</p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Admin ID Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Admin ID
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    if (errors.adminId) {
                      setErrors((prev) => ({ ...prev, adminId: "" }));
                    }
                  }}
                  style={{ boxShadow: "none" }}
                  className={`w-full pl-12 pr-4 py-3  text-black rounded-2xl bg-white/60 border-2 transition-all duration-300  focus:border-purple-500 focus:outline-none  placeholder-gray-400 ${
                    errors.adminId
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  placeholder="Enter your admin ID"
                />
              </div>
              {errors.adminId && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.adminId}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  style={{ boxShadow: "none" }}
                  className={`w-full pl-12 pr-12 py-3 rounded-2xl text-black bg-white/60 border-2 transition-all duration-300  focus:border-purple-500 focus:outline-none placeholder-gray-400 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Status Message */}
            {loginStatus && (
              <div
                className={`p-4 rounded-2xl border-2 text-sm text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                  loginStatus === "success"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {loginStatus === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {loginStatus === "success" ? "Login successful!" : loginStatus}
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleAdminLogin}
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-xl bg-purple-600 hover:bg-purple-700  cursor-pointer text-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
