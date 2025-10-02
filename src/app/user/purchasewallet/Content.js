"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller";

const Content = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [dataset, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const [memberId, setMemberId] = useState("");
  const [purchaseWalletId, setPurchaseWalletId] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("$40");
  const [transferAmount, setTransferAmount] = useState("");
  const [addAmount, setAddAmount] = useState(10);

  const router = useRouter();
  const [copiedText, setCopiedText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { success, data, error } = await apiCaller("/secure/purchasewallet");
    if (success) setData(data);
    else console.error("Fetch error:", error);
    setLoading(false);
  };

  useEffect(() => {
    if (!isQrModalOpen || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isQrModalOpen, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCopy = (text) => {
    copy(text);
    setCopiedText("Copied to clipboard");
    setTimeout(() => setCopiedText(""), 2000);
  };

  const transferProcess = async (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);

    if (!memberId.trim()) return toast.error("Please enter Wallet ID.");
    if (isNaN(amount)) return toast.error("Please enter a valid number.");
    if (amount <= 1) return toast.warning("Amount must be greater than $1.");
    if (amount > dataset.balance) return toast.error("Insufficient balance.");

    toast.success(`Transfer of $${amount} submitted.`);
    setTransferAmount("");
    setMemberId("");
    fetchData();
    setIsTransferModalOpen(false);
  };

  const purchaseProcess = async (e) => {
    e.preventDefault();
    const amount = parseFloat(purchaseAmount);
    if (!purchaseWalletId.trim()) return toast.error("Please enter Wallet ID.");
    if (amount > dataset.balance) return toast.error("Insufficient balance.");

    toast.success(`Purchase of ${purchaseAmount} submitted.`);
    setPurchaseWalletId("");
    setPurchaseAmount("$20");
    fetchData();
    setIsPurchaseModalOpen(false);
  };

  const buyslot = (e) => {
    e.preventDefault();
    router.push(
      dataset?.isverified === 0 && dataset?.rtime === 0
        ? "/account/instantslot"
        : "/account/buyslot"
    );
  };

  return (
    <>
      {/* Toast Copy Notification */}
      {copiedText && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md text-sm z-50 animate-fade-in">
          {copiedText}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 rounded-xl shadow-md text-center mb-8">
        <h5 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
          Purchase Wallet
        </h5>
      </div>

      {/* Wallet Info */}
      <div className="flex justify-center items-center pb-20">
        <div className="w-full max-w-2xl">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="p-8 bg-white rounded-lg shadow-md animate-fade-in">
              <ul className="divide-y divide-gray-200">
                <li className="flex justify-between py-4">
                  <span className="text-green-600 font-medium text-lg">
                    Total Credit
                  </span>
                  <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-lg">
                    ${dataset?.crtotal || "0.00"}
                  </span>
                </li>
                <li className="flex justify-between py-4">
                  <span className="text-red-600 font-medium text-lg">
                    Total Debit
                  </span>
                  <span className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-lg">
                    ${dataset?.drtotal || "0.00"}
                  </span>
                </li>
              </ul>

              <button className="mt-6 w-full text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow hover:scale-105 transition-all duration-300">
                Balance: ${dataset?.balance || "0.00"}
              </button>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setIsTransferModalOpen(true)}
                  className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition-all duration-300"
                >
                  Transfer
                </button>
                <button
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-lg shadow hover:scale-105 transition-all duration-300"
                >
                  Add Money
                </button>
                <button
                  onClick={buyslot}
                  className="col-span-1 sm:col-span-2 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition-all duration-300"
                >
                  Buy Slot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isTransferModalOpen && (
        <Modal
          title="Enter Transfer Details"
          inputs={[
            {
              placeholder: "Wallet ID",
              value: memberId,
              setValue: setMemberId,
              type: "text",
            },
            {
              placeholder: "Amount",
              value: transferAmount,
              setValue: setTransferAmount,
              type: "number",
            },
          ]}
          onCancel={() => setIsTransferModalOpen(false)}
          onSubmit={transferProcess}
        />
      )}

      {isPurchaseModalOpen && (
        <Modal
          title="Enter Purchase Details"
          inputs={[
            {
              placeholder: "Amount",
              value: addAmount,
              setValue: setAddAmount,
              type: "number",
            },
          ]}
          onCancel={() => setIsPurchaseModalOpen(false)}
          onSubmit={() => {
            setTimeLeft(600);
            setIsPurchaseModalOpen(false);
            setIsQrModalOpen(true);
          }}
        />
      )}

      {isQrModalOpen && (
        <Modal
          title={`Transfer ${addAmount} USDT Bep20`}
          content={
            <div className="text-center">
              <p
                className={`text-sm mb-4 ${
                  timeLeft < 60 ? "text-red-500" : "text-gray-600"
                }`}
              >
                Time remaining: {formatTime(timeLeft)}
              </p>
              <div className="flex justify-center mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${dataset?.walletaddress}`}
                  alt="USDT Payment QR Code"
                  className="h-52 w-52 rounded-lg shadow"
                />
              </div>
              <button
                onClick={() => handleCopy(dataset?.walletaddress)}
                className="text-blue-600 text-sm underline hover:text-blue-500"
              >
                {dataset?.walletaddress}
              </button>
            </div>
          }
          onCancel={() => setIsQrModalOpen(false)}
          hideSubmit
        />
      )}
    </>
  );
};

/** Reusable Modal Component (white theme) */
const Modal = ({
  title,
  inputs = [],
  content,
  onCancel,
  onSubmit,
  hideSubmit = false,
}) => (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in"
    onClick={onCancel}
  >
    <div
      className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg border border-gray-200 transform scale-95 animate-slide-up"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      {content ||
        inputs.map((input, i) => (
          <input
            key={i}
            type={input.type}
            value={input.value}
            onChange={(e) => input.setValue(e.target.value)}
            className="w-full p-2 mb-3 border border-gray-300 rounded bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder={input.placeholder}
          />
        ))}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        {!hideSubmit && (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Content;
