"use client";
import React, { useState, useEffect } from "react";
import { encryptData, decryptData } from "@/utils/cryptoUtils";
import { Shield, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/jaaneramlogo.png";
import { useRouter } from "next/navigation";

export default function ManualRegisterPage() {
  const router = useRouter();

  // Form states
  const [referralId, setReferralId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState(false);

  // Animations
  const [blockchainNodes, setBlockchainNodes] = useState([]);
  const [moneyNodes, setMoneyNodes] = useState([]);

  // API states
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);

  // Prefill referral code from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("ref");
      if (ref) setReferralId(ref);
    }
  }, []);

  // --- Validation logic ---
  const validateForm = () => {
    const newErrors = {};

    if (!referralId) newErrors.referralId = "*Referral ID is required";
    else if (!/^[a-zA-Z0-9]+$/.test(referralId))
      newErrors.referralId = "*Only letters and numbers allowed";

    if (!name) newErrors.name = "*Name is required";
    else if (name.length < 3)
      newErrors.name = "*Name must be at least 3 characters";

    if (!mobile) newErrors.mobile = "*Mobile number is required";
    else if (!/^[0-9]{10}$/.test(mobile))
      newErrors.mobile = "*Enter valid 10-digit number";

    if (!email) newErrors.email = "*Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "*Enter a valid email";

    if (!password) newErrors.password = "*Password is required";
    else if (password.length < 6)
      newErrors.password = "*Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- API call ---
  const handleRegister = async () => {
    setFormTouched(true);
    if (!validateForm()) return;

    setIsRegistering(true);
    setRegisterError("");

    try {
      const apidata = encryptData(
        JSON.stringify({ referralId, name, mobile, email, password })
      );

      const formDataToSend = new URLSearchParams();
      formDataToSend.append("data", apidata);

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataToSend.toString(),
      });

      if (response.ok) {
        const result = await response.json();
        const dt = decryptData(result);
        let mydata = JSON.parse(dt);

        if (mydata["result"] === "y") {
          setIsSuccessPopup(true);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setRegisterError(mydata["result"] || "Registration failed.");
        }
      } else {
        setRegisterError("Error during registration.");
      }
    } catch (error) {
      setRegisterError(
        "An error occurred: " + (error?.message || "Unknown error")
      );
    } finally {
      setIsRegistering(false);
    }
  };

  // --- Background animations ---
  useEffect(() => {
    const nodes = [...Array(6)].map((_, i) => ({
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
      delay: `${i * 0.9}s`,
      duration: `${3 + Math.random() * 2}s`,
    }));
    setMoneyNodes(nodes);
  }, []);

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

  const FloatingOrb = ({ size = "w-2 h-2", delay = 0, duration = 4 }) => (
    <div
      className={`absolute ${size} bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-15 animate-float`}
      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    />
  );

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
            <span className="text-green-500 opacity-15 text-xl">$</span>
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
        <FloatingOrb size="w-3 h-3" delay={0} duration={6} />
        <FloatingOrb size="w-2 h-2" delay={1} duration={4} />
        <FloatingOrb size="w-4 h-4" delay={2} duration={8} />
        <FloatingOrb size="w-2 h-2" delay={3} duration={5} />
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center mb-5">
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
          <div className="text-center mb-4">
            <h2 className="text-xl  *: text-gray-900">Register</h2>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Referral ID"
              value={referralId}
              onChange={(e) => setReferralId(e.target.value)}
            />
            {formTouched && errors.referralId && (
              <p className="text-red-600 text-xs">{errors.referralId}</p>
            )}

            <input
              className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formTouched && errors.name && (
              <p className="text-red-600 text-xs">{errors.name}</p>
            )}

            <input
              type="tel"
              className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {formTouched && errors.mobile && (
              <p className="text-red-600 text-xs">{errors.mobile}</p>
            )}

            <input
              type="email"
              className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formTouched && errors.email && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )}

            <input
              type="password"
              className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formTouched && errors.password && (
              <p className="text-red-600 text-xs">{errors.password}</p>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={isRegistering}
            className={`w-full mt-6 py-3 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:scale-105 
              ${
                isRegistering
                  ? "bg-gray-400 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              }
            `}
          >
            {isRegistering ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Verifying...
              </>
            ) : (
              <>
                <Shield size={20} /> Register <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Register error */}
          {registerError && (
            <div className="mt-4 p-2 text-red-700 bg-red-50 rounded-lg border border-red-200 text-center">
              {registerError}
            </div>
          )}

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {isSuccessPopup && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-2xl text-center max-w-sm">
            <CheckCircle className="mx-auto mb-3 text-green-500" size={40} />
            <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Redirecting you to login page...
            </p>
            <div className="animate-pulse text-green-600">Please wait...</div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-money {
          animation: float-money 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
