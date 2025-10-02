"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Wallet,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Play,
  Check,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Globe,
  Award,
  Target,
  Sparkles,
  Code,
  Lock,
  BarChart3,
  DollarSign,
  Coins,
  TrendingDown,
  Activity,
  Link as LinkIcon,
  Layers,
  Database,
  Cpu,
} from "lucide-react";
import logo from "@/assets/jaaneramlogo.png";
import Image from "next/image";
import Link from "next/link";
export default function WhiteThemeLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [earnings, setEarnings] = useState(0);
  const [blockchainNodes, setBlockchainNodes] = useState([]);
  const [moneyNodes, setMoneyNodes] = useState([]);

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
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      const sections = ["hero", "features", "how-it-works"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Money earning animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + Math.floor(Math.random() * 50) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Blockchain network animation
  useEffect(() => {
    const generateNodes = () => {
      const nodes = [];
      for (let i = 0; i < 8; i++) {
        nodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 2 + 1,
        });
      }
      setBlockchainNodes(nodes);
    };

    generateNodes();
    const interval = setInterval(generateNodes, 5000);
    return () => clearInterval(interval);
  }, []);

  const FloatingOrb = ({ size = "w-2 h-2", delay = 0, duration = 4 }) => (
    <div
      className={`absolute ${size} bg-gradient-to-r from-violet-400/20 to-cyan-400/20 rounded-full opacity-30 animate-float`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );

  const GridPattern = () => (
    <div className="absolute inset-0 opacity-[0.03]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, #6366f1 1px, transparent 1px),
          linear-gradient(to bottom, #6366f1 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );

  const BlockchainAnimation = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blockchain Network Visualization */}
      <div className="absolute inset-0">
        {blockchainNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-3 h-3 bg-gradient-to-r from-violet-400/30 to-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              opacity: node.opacity * 0.5,
              animationDelay: `${node.id * 0.5}s`,
              animationDuration: `${node.speed}s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-cyan-400/20 rounded-full animate-ping" />
          </div>
        ))}
      </div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {blockchainNodes.map((node, index) => (
          <g key={index}>
            {blockchainNodes.slice(index + 1).map((otherNode, otherIndex) => (
              <line
                key={`${index}-${otherIndex}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${otherNode.x}%`}
                y2={`${otherNode.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                opacity="0.1"
                className="animate-pulse"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Floating Blockchain Icons */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-8 h-8 bg-gradient-to-r from-violet-500/80 to-cyan-500/80 rounded-lg flex items-center justify-center shadow-lg">
          <Database size={16} className="text-white" />
        </div>
      </div>
      <div
        className="absolute top-32 right-20 animate-bounce"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-6 h-6 bg-gradient-to-r from-cyan-500/80 to-violet-500/80 rounded-lg flex items-center justify-center shadow-lg">
          <LinkIcon size={12} className="text-white" />
        </div>
      </div>
      <div
        className="absolute bottom-40 left-20 animate-bounce"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-7 h-7 bg-gradient-to-r from-violet-500/80 to-cyan-500/80 rounded-lg flex items-center justify-center shadow-lg">
          <Cpu size={14} className="text-white" />
        </div>
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
              className="text-green-500/30 drop-shadow-lg opacity-20"
            />
            <div className="absolute inset-0 bg-green-400/20 rounded-full opacity-20 animate-ping" />
          </div>
        </div>
      ))}
    </div>
  );

  const EarningsCounter = () => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Live Earnings</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-600 text-sm font-medium">LIVE</span>
        </div>
      </div>
      <div className="text-3xl font-bold text-green-600 mb-2">
        ${earnings.toLocaleString()}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <TrendingUp size={14} className="text-green-500" />
        <span>+{Math.floor(earnings / 100)}% this month</span>
      </div>
    </div>
  );

  const BlockchainVisualization = () => (
    <div className="bg-gradient-to-r from-violet-50 to-cyan-50 border-2 border-violet-200/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Blockchain Network
        </h3>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-violet-500 animate-pulse" />
          <span className="text-violet-600 text-sm font-medium">ACTIVE</span>
        </div>
      </div>
      <div className="relative h-32 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-sm animate-pulse shadow-sm"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 animate-pulse" />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Transactions: 1,234</span>
          <span>Block Height: 18,456,789</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-violet-50/30" />
        <GridPattern />
        <BlockchainAnimation />
        <MoneyAnimation />

        {/* Floating Orbs */}
        <FloatingOrb size="w-3 h-3" delay={0} duration={6} />
        <FloatingOrb size="w-2 h-2" delay={1} duration={4} />
        <FloatingOrb size="w-4 h-4" delay={2} duration={8} />
        <FloatingOrb size="w-2 h-2" delay={3} duration={5} />
        <FloatingOrb size="w-3 h-3" delay={4} duration={7} />

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-50/20 via-transparent to-cyan-50/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-violet-50/10 to-transparent" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-baseline space-x-1 cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image src={logo} alt="Logo" width={38} height={20} />
              <h2 className="text-2xl font-bold text-gray-800">Jaaneram</h2>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#hero"
                className={`transition-colors duration-300 font-medium ${
                  activeSection === "hero"
                    ? "text-violet-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </a>
              <a
                href="#features"
                className={`transition-colors duration-300 font-medium ${
                  activeSection === "features"
                    ? "text-violet-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className={`transition-colors duration-300 font-medium ${
                  activeSection === "how-it-works"
                    ? "text-violet-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                How It Works
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                About
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 cursor-pointer bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <a
                href="#hero"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Home
              </a>
              <a
                href="#features"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                How It Works
              </a>
              <a
                href="#about"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
              >
                About
              </a>
              <div className="pt-4 space-y-2">
                <Link
                  href="/login"
                  className="block w-full text-center py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full px-6 py-2 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold hover:from-violet-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent animate-gradient">
                Empowering You to Earn
              </span>
              <br />
              <span className="text-gray-900">Smarter, Faster, and Safer</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your financial journey with our next-gen decentralized MLM
              platform built on{" "}
              <span className="text-cyan-600 font-semibold">
                Polygon blockchain
              </span>{" "}
              and integrated with SafePal wallet technology for
              <span className="text-cyan-600 font-semibold"> seamless</span> and
              <span className="text-violet-600 font-semibold">
                {" "}
                secure transactions
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:from-violet-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Wallet size={20} />
                  Get Started
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>

              <button className="group flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-violet-500 hover:text-violet-600 hover:bg-violet-50 transition-all duration-300">
                <Play size={20} className="text-violet-500" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-16">
              {[
                { value: "50K+", label: "Active Users" },
                { value: "120+", label: "Countries" },
                { value: "$10M+", label: "Total Volume" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="text-center group relative">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                  {index === 2 && (
                    <div className="absolute -top-2 -right-2 animate-bounce">
                      <DollarSign size={16} className="text-green-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Live Dashboard Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <EarningsCounter />
              <BlockchainVisualization />
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Shield, top: "20%", left: "10%", delay: 0 },
            { Icon: Zap, top: "30%", right: "15%", delay: 1 },
            { Icon: Users, bottom: "30%", left: "12%", delay: 2 },
            { Icon: TrendingUp, bottom: "20%", right: "10%", delay: 3 },
          ].map(({ Icon, delay, ...position }, index) => (
            <div
              key={index}
              className="absolute opacity-20 animate-float"
              style={{
                ...position,
                animationDelay: `${delay}s`,
                animationDuration: "6s",
              }}
            >
              <Icon size={32} className="text-violet-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to provide the ultimate DeFi
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Military-Grade Security",
                description:
                  "Advanced encryption and smart contract auditing ensure your assets are completely secure",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Zap,
                title: "Lightning-Fast Transactions",
                description:
                  "Experience instant settlements with minimal fees on the Polygon network",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Code,
                title: "Smart Contract Automation",
                description:
                  "Fully automated matrix system with transparent, immutable smart contracts",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description:
                  "Comprehensive dashboard with live statistics and earnings tracking",
                color: "from-purple-500 to-violet-500",
              },
              {
                icon: Globe,
                title: "Global Accessibility",
                description:
                  "Access your matrix from anywhere in the world with full mobile support",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: Award,
                title: "Proven Matrix System",
                description:
                  "Time-tested 3x3 matrix structure with automatic spillover benefits",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-violet-300 hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-violet-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 to-cyan-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps and begin earning
              immediately.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Connect Your Wallet",
                  description:
                    "Link your SafePal wallet or any Web3 wallet to securely access the platform and manage your digital assets with complete control.",
                  icon: Wallet,
                },
                {
                  step: "02",
                  title: "Choose Your Matrix Level",
                  description:
                    "Select your preferred investment tier and enter the 3x3 matrix system with transparent pricing and clear earning potential.",
                  icon: Target,
                },
                {
                  step: "03",
                  title: "Invite & Earn",
                  description:
                    "Share your referral link with friends and colleagues to build your network and unlock unlimited earning opportunities.",
                  icon: Users,
                },
                {
                  step: "04",
                  title: "Watch Your Earnings Grow",
                  description:
                    "Monitor your passive income through our advanced dashboard as you receive automatic spillover benefits and referral rewards.",
                  icon: TrendingUp,
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-violet-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <step.icon size={24} className="text-violet-500" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl rotate-6 animate-pulse shadow-lg" />
                  <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl -rotate-6 opacity-70" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  SafePal Matrix
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
                Revolutionary 3x3 Matrix MLM platform powered by Polygon
                blockchain and SafePal wallet technology. Join the future of
                decentralized finance.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Github, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-violet-500 hover:to-cyan-500 hover:border-transparent transition-all duration-300 group shadow-sm"
                  >
                    <social.icon
                      size={18}
                      className="text-gray-500 group-hover:text-white transition-colors duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gray-900">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "#" },
                  { name: "Features", href: "#features" },
                  { name: "How It Works", href: "#how-it-works" },
                  { name: "Whitepaper", href: "#" },
                  { name: "Roadmap", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-violet-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      {link.name}
                      <ChevronRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-500"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gray-900">
                Support
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                    <Mail size={16} className="text-violet-600" />
                  </div>
                  <span className="text-gray-600 text-sm">
                    support@safepalmatrix.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Phone size={16} className="text-cyan-600" />
                  </div>
                  <span className="text-gray-600 text-sm">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-600 text-sm">
                    San Francisco, CA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 md:mb-0">
                © 2024 Jaaneram. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-violet-600 transition-colors duration-300 text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blockchain-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-money {
          animation: float-money 4s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 4s ease infinite;
        }

        .animate-blockchain-pulse {
          animation: blockchain-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
