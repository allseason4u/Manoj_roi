"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { apiCaller } from "@/utils/apiCaller";

const Content = () => {
  const [dataset, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { success, data, error } = await apiCaller("/secure/withdrawwallet");
    if (success) {
      setData(data);
      setLoading(false);
    } else {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  const withdrawProcess = async (e) => {
    e.preventDefault();
    if (dataset.totalearning >= dataset.limits) {
      toast.error("Limit crossed. Please buy the next slot.");
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount)) return toast.error("Please enter a valid number.");
    if (amount <= 5) return toast.error("Amount must be greater than $5.");
    if (amount > dataset.balance) return toast.error("Insufficient balance.");

    // const { success, data } = await apiCaller("/secure/withdralrequest", {
    //   withdrawalamt: amount,
    // });

    // if (success && data?.result === "y") {
    //   setWithdrawAmount("");
    //   fetchData();
    //   toast.success(`Withdrawal of $${amount} submitted.`);
    // } else {
    //   toast.error(data?.result || "Failed to process withdrawal.");
    // }

    setIsModalOpen(false);
  };

  const transferProcess = async (e) => {
    e.preventDefault();
    if (dataset.totalearning >= dataset.limits) {
      toast.error("Limit crossed. Please buy the next slot.");
      return;
    }

    const amount = parseFloat(transferAmount);
    if (isNaN(amount)) return toast.error("Please enter a valid number.");
    if (amount <= 1) return toast.warning("Amount must be greater than $1.");
    if (amount > dataset.balance) return toast.error("Insufficient balance.");

    // const { success, data } = await apiCaller("/secure/transferamttopurchase", {
    //   tranferamt: amount,
    // });

    // if (success && data?.result === "y") {
    //   setTransferAmount("");
    //   fetchData();
    //   toast.success(`Transfer of $${amount} submitted.`);
    // } else {
    //   toast.error(data?.result || "Failed to process transfer.");
    // }

    setIsTransferModalOpen(false);
  };

  return (
    <div className="mt-6 mx-4 md:mx-12 text-white relative z-0">
      {/* HEADER CARD */}
      <div className="bg-gray-900 p-5 md:p-8 rounded-xl shadow-lg mb-6">
        <h5 className="text-lg font-bold text-center text-white uppercase mb-4">
          Withdraw Wallet
        </h5>

        {/* SLOT DETAILS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-300">
          <div className="bg-gray-800 rounded-lg p-2 text-center">
            <span className="block text-gray-400">Slot</span>
            <span className="text-sky-400 font-semibold">${dataset?.slot}</span>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 text-center">
            <span className="block text-gray-400">Limits</span>
            <span className="text-sky-400 font-semibold">
              ${dataset?.limits}
            </span>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 text-center">
            <span className="block text-gray-400">Gross</span>
            <span className="text-green-400 font-semibold">
              ${dataset?.totalearning}
            </span>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 text-center">
            <span className="block text-gray-400">Leftover</span>
            <span className="text-red-400 font-semibold">
              ${dataset?.remlimt}
            </span>
          </div>
        </div>
      </div>

      {/* WALLET INFO */}
      <div className="flex justify-center items-center pb-10">
        <div className="w-full max-w-2xl">
          {loading ? (
            <p className="text-center text-gray-300">Loading...</p>
          ) : (
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 space-y-5">
              <ul className="divide-y divide-gray-700">
                <li className="flex items-center justify-between py-3">
                  <p className="text-green-400 font-medium">Total Credit</p>
                  <p className="px-3 py-1 bg-green-600 rounded-full text-white text-sm">
                    ${dataset?.crtotal || "0.00"}
                  </p>
                </li>
                <li className="flex items-center justify-between py-3">
                  <p className="text-red-400 font-medium">Total Debit</p>
                  <p className="px-3 py-1 bg-red-600 rounded-full text-white text-sm">
                    ${dataset?.drtotal || "0.00"}
                  </p>
                </li>
              </ul>

              {/* BALANCE */}
              <button className="w-full text-lg font-bold bg-gradient-to-r from-sky-600 to-blue-700 py-3 rounded-lg shadow-md text-white hover:scale-105 transition">
                Balance: ${dataset?.balance || "0.00"}
              </button>

              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    if (dataset.totalearning >= dataset.limits) {
                      toast.error("Limit crossed. Please buy next slot.");
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  className="bg-teal-600 hover:bg-teal-500 py-2 px-4 rounded-lg text-white shadow-md transition"
                >
                  Withdraw
                  <span className="block text-xs text-gray-200">
                    Today Withdraw ${dataset?.tottodaywithdraw || "0.00"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    if (dataset.totalearning >= dataset.limits) {
                      toast.error("Limit crossed. Please buy next slot.");
                    } else {
                      setIsTransferModalOpen(true);
                    }
                  }}
                  className="bg-sky-600 hover:bg-sky-500 py-2 px-4 rounded-lg text-white shadow-md transition"
                >
                  Transfer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODALS */}
      {isModalOpen && (
        <Modal
          title="Enter Withdraw Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={withdrawProcess}
        />
      )}
      {isTransferModalOpen && (
        <Modal
          title="Enter Transfer Amount"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          onCancel={() => setIsTransferModalOpen(false)}
          onSubmit={transferProcess}
        />
      )}
    </div>
  );
};

const Modal = ({ title, value, onChange, onCancel, onSubmit }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onCancel();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 min-h-screen w-screen bg-black/40 backdrop-blur-sm z-[99999] flex justify-center items-center p-4"
    >
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl w-full max-w-sm shadow-xl border border-gray-700">
        <h2 className="text-lg font-bold mb-4 text-white text-center">
          {title}
        </h2>
        <input
          type="number"
          value={value}
          onChange={onChange}
          className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter amount"
        />
        <div className="flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
