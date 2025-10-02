"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Edit3,
  Shield,
  Zap,
  Globe,
  Lock,
  Cpu,
  Database,
} from "lucide-react";
import Cookies from "js-cookie";
import { encryptData, decryptData } from "@/utils/cryptoUtils";
import { useRouter } from "next/navigation";

const ParticleSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const maxParticles = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#6366F1"; // light purple for white theme
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = ((120 - distance) / 120) * 0.2;
            ctx.strokeStyle = "#6366F1";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
};

const HexagonPattern = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <svg width="100%" height="100%" className="animate-pulse">
      <defs>
        <pattern
          id="hexagons"
          x="0"
          y="0"
          width="100"
          height="86.6"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="50,1 95,25 95,75 50,99 5,75 5,25"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
);

const BlockchainIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M12 2L2 7v10l10 5 10-5V7l-10-5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M2 7l10 5 10-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M12 12v10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const NeuralNetworkBg = () => (
  <div className="absolute inset-0 opacity-5">
    <svg width="100%" height="100%" className="animate-pulse">
      <defs>
        <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      <circle cx="20%" cy="20%" r="3" fill="url(#nodeGradient)">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="80%" cy="30%" r="3" fill="url(#nodeGradient)">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60%" cy="70%" r="3" fill="url(#nodeGradient)">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="3.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="30%" cy="80%" r="3" fill="url(#nodeGradient)">
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      <line
        x1="20%"
        y1="20%"
        x2="80%"
        y2="30%"
        stroke="#6366F1"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="80%"
        y1="30%"
        x2="60%"
        y2="70%"
        stroke="#3B82F6"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="60%"
        y1="70%"
        x2="30%"
        y2="80%"
        stroke="#6366F1"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="30%"
        y1="80%"
        x2="20%"
        y2="20%"
        stroke="#3B82F6"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  </div>
);

const BlockchainCard = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/95 backdrop-blur-xl border border-gray-300
        rounded-3xl shadow-xl
        transform transition-all duration-1000 ease-out
        hover:shadow-blue-200
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        ${className}
      `}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-200/10 to-blue-200/10 animate-pulse"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const CyberButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
        group relative px-8 py-4 
        bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 
        hover:from-purple-400 hover:via-blue-300 hover:to-purple-400
        text-white font-bold rounded-2xl
        transition-all duration-500 ease-out
        transform hover:scale-105 hover:-translate-y-1
        hover:shadow-lg hover:shadow-purple-300/30
        focus:outline-none focus:ring-4 focus:ring-purple-300/50
        disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden
        ${className}
      `}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-blue-400/50 to-purple-500/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-300 to-blue-200 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
    <span className="relative z-10 flex items-center justify-center gap-3">
      <Zap size={18} className="animate-pulse" />
      {children}
      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
    </span>
  </button>
);

const Content = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("secure");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const statusInterval = setInterval(() => {
      const statuses = ["secure", "updating", "validating", "syncing"];
      setConnectionStatus(
        statuses[Math.floor(Math.random() * statuses.length)]
      );
    }, 3000);
    return () => clearInterval(statusInterval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const auth = Cookies.get("auth");
        const res = await fetch(`/api/secure/getprofile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: auth || "",
          },
        });
        if (res.ok) {
          const encryptedResponse = await res.json();
          const decryptedString = decryptData(encryptedResponse);
          const profileData = JSON.parse(decryptedString);
          setFormData({
            name: profileData.name || "",
            mobileno: profileData.mobileno || "",
            email: profileData.email || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobileno.trim())
      newErrors.mobileno = "Mobile number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0)
      return setErrors(validationErrors);

    setIsLoading(true);
    try {
      const auth = Cookies.get("auth");
      const encryptedData = encryptData(JSON.stringify(formData));
      const formDataToSend = new URLSearchParams();
      formDataToSend.append("data", encryptedData);

      const res = await fetch(`/api/secure/updateprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: auth || "",
        },
        body: formDataToSend.toString(),
      });

      if (res.ok) {
        const result = await res.json();
        const decryptedString = decryptData(result);
        const mydata = JSON.parse(decryptedString);
        if (mydata["result"] === "y") {
          setSuccessMessage("Profile updated successfully!");
          //router.push("/user/dashboard");
        } else setSuccessMessage("Failed to update profile!");
      } else setSuccessMessage("Error: Failed to update profile!");
    } catch {
      setSuccessMessage("Something went wrong while updating profile.");
    }
    setIsLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticleSystem />
      <HexagonPattern />
      <NeuralNetworkBg />
      <div className="relative z-10">
        <div className="flex justify-center px-4 py-12">
          <div className="w-full max-w-2xl">
            <BlockchainCard delay={400} className="p-8">
              <div className="space-y-8">
                {/* Name Field */}
                <div className="group">
                  <label className="flex items-center gap-3 mb-4 text-gray-700 font-bold text-sm uppercase tracking-wider">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <User size={16} className="text-purple-500" />
                    </div>
                    Name
                    <div className="ml-auto flex items-center gap-1 text-xs text-purple-500">
                      <Lock size={12} />
                      <span>Encrypted</span>
                    </div>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    <Edit3
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div className="group">
                  <label className="flex items-center gap-3 mb-4 text-gray-700 font-bold text-sm uppercase tracking-wider">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <Phone size={16} className="text-purple-500" />
                    </div>
                    Mobile Number
                    <div className="ml-auto flex items-center gap-1 text-xs text-purple-500">
                      <Lock size={12} />
                      <span>Encrypted</span>
                    </div>
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="mobileno"
                      readOnly
                      value={formData.mobileno}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all ${
                        errors.mobileno ? "border-red-500" : ""
                      }`}
                    />
                    <Edit3
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors"
                    />
                  </div>
                  {errors.mobileno && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.mobileno}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="flex items-center gap-3 mb-4 text-gray-700 font-bold text-sm uppercase tracking-wider">
                    <div className="p-2 bg-purple-200 rounded-lg">
                      <Mail size={16} className="text-purple-500" />
                    </div>
                    Email
                    <div className="ml-auto flex items-center gap-1 text-xs text-purple-500">
                      <Lock size={12} />
                      <span>Encrypted</span>
                    </div>
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      readOnly
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    <Edit3
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </div>

                {successMessage && (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle size={18} />
                    {successMessage}
                  </div>
                )}

                <CyberButton
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full mt-6"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </CyberButton>
              </div>
            </BlockchainCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
