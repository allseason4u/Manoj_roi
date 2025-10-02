// LoginPage.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Loader2,
  AlertCircle,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { encryptData, decryptData } from "@/utils/cryptoUtils";
import Link from "next/link";
import logo from "@/assets/jaaneramlogo.png";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // mobile/email
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [blockchainNodes, setBlockchainNodes] = useState([]);
  const [moneyNodes, setMoneyNodes] = useState([]);
  const router = useRouter();
  // Floating money animation
  useEffect(() => {
    const nodes = [...Array(6)].map((_, i) => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
      delay: `${i * 0.9}s`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setMoneyNodes(nodes);
  }, []);

  // Blockchain glowing nodes
  useEffect(() => {
    const generateNodes = () => {
      const nodes = [];
      for (let i = 0; i < 6; i++) {
        nodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 15 + 8,
          opacity: Math.random() * 0.6 + 0.3,
        });
      }
      setBlockchainNodes(nodes);
    };
    generateNodes();
    const interval = setInterval(generateNodes, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Simple validation
  const validateForm = () => {
    if (!identifier.trim()) return "Please enter mobile or email.";
    if (!password.trim()) return "Please enter password.";
    return null;
  };

  // ✅ Handle Login
  const handleLogin = async () => {
    const error = validateForm();
    if (error) {
      setLoginError(error);
      return;
    }

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const apidata = encryptData(
        JSON.stringify({ identifier, password, ip: "127.0.0.1" })
      );

      const formDataToSend = new URLSearchParams();
      formDataToSend.append("data", apidata);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataToSend.toString(),
      });

      const encryptedResponse = await res.json();
      const data = JSON.parse(decryptData(encryptedResponse));

      if (data.token === "ok") {
        window.location.href = "/user/dashboard";
      } else {
        setLoginError("Invalid credentials. Please try again.");
        setIsLoggingIn(false);
      }
    } catch (err) {
      setLoginError("⚠️ Login failed. Please try again.");
      setIsLoggingIn(false);
    }
  };

  // --- Background Components ---
  const GridPattern = () => (
    <div className="absolute inset-0 opacity-[0.08]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
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
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              opacity: node.opacity * 0.6,
              animationDelay: `${node.id * 0.5}s`,
              animationDuration: `3s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping" />
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
          className="absolute animate-float-money"
          style={{
            left: node.left,
            top: node.top,
            animationDelay: node.delay,
            animationDuration: node.duration,
          }}
        >
          <div className="relative">
            <DollarSign
              size={24}
              className="text-green-500 drop-shadow-lg opacity-15"
            />
            <div className="absolute inset-0 bg-green-500 rounded-full opacity-10 animate-ping" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
        <GridPattern />
        <BlockchainAnimation />
        <MoneyAnimation />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-baseline justify-center  mb-5">
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

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl  text-gray-900 mb-2">Sign In</h2>
          </div>

          {/* Error */}
          {loginError && (
            <div className="mb-4 p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {loginError}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Mobile or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            />

            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg
                ${
                  isLoggingIn
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-600 hover:bg-green-700 cursor-pointer text-white"
                }`}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-money {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-30px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
        }
        .animate-float-money {
          animation: float-money 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
