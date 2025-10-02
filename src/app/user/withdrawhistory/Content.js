"use client";

import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller";

const Content = () => {
  const [activeTab, setActiveTab] = useState("credit");
  const [creditOption, setCreditOption] = useState("a");
  const [debitOption, setDebitOption] = useState("a");
  const [formDatacr, setFormDatacr] = useState([]);
  const [formDatadr, setFormDatadr] = useState([]);

  const fetchdata = async (d, t) => {
    const { success, data, error } = await apiCaller(
      "/secure/withdrawhistory",
      { d, t }
    );
    if (success) {
      if (t === "c") setFormDatacr(data || []);
      if (t === "d") setFormDatadr(data || []);
    } else {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchdata("a", "c");
  }, []);

  const crhistory = (option) => {
    setCreditOption(option);
    fetchdata(option, "c");
  };

  const drhistory = (option) => {
    setDebitOption(option);
    fetchdata(option, "d");
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-gray-900 to-black min-h-screen text-gray-200">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-6 md:p-10 rounded-xl shadow-2xl text-center mb-6">
        <h5 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">
          Withdraw Wallet
        </h5>
      </div>

      {/* TABS */}
      <div className="flex space-x-3 mb-6 justify-center md:justify-between">
        <button
          onClick={() => {
            setActiveTab("credit");
            crhistory("a");
          }}
          className={`w-1/2 md:w-48 px-4 py-2 rounded-lg font-bold text-sm transition-transform duration-300 shadow-md ${
            activeTab === "credit"
              ? "bg-gradient-to-r from-green-400 to-blue-500 text-white scale-105"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
          }`}
        >
          💰 Credit
        </button>
        <button
          onClick={() => {
            setActiveTab("debit");
            drhistory("a");
          }}
          className={`w-1/2 md:w-48 px-4 py-2 rounded-lg font-bold text-sm transition-transform duration-300 shadow-md ${
            activeTab === "debit"
              ? "bg-gradient-to-r from-pink-500 to-red-500 text-white scale-105"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
          }`}
        >
          💸 Debit
        </button>
      </div>

      {/* CREDIT TAB */}
      {activeTab === "credit" && (
        <div className="space-y-4">
          {/* Filter */}
          <div className="bg-gray-900 p-3 rounded-lg shadow-lg flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-200">
              Credit History
            </h3>
            <select
              value={creditOption}
              onChange={(e) => crhistory(e.target.value)}
              className="p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 text-sm"
            >
              <option value="a">All</option>
              <option value="d">Direct Income</option>
              <option value="l">Level Income</option>
              <option value="r">Royalty Income</option>
              <option value="o">Others Income</option>
            </select>
          </div>

          {/* Data List */}
          <TransactionList data={formDatacr} type="credit" />
        </div>
      )}

      {/* DEBIT TAB */}
      {activeTab === "debit" && (
        <div className="space-y-4">
          {/* Filter */}
          <div className="bg-gray-900 p-3 rounded-lg shadow-lg flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-200">
              Debit History
            </h3>
            <select
              value={debitOption}
              onChange={(e) => drhistory(e.target.value)}
              className="p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 text-sm"
            >
              <option value="a">All</option>
              <option value="w">Withdrawal</option>
              <option value="t">Transfer</option>
            </select>
          </div>

          {/* Data List */}
          <TransactionList data={formDatadr} type="debit" />
        </div>
      )}
    </div>
  );
};

const TransactionList = ({ data, type }) => {
  return (
    <div className="flex justify-center items-center pt-4 pb-8">
      <div className="w-full max-w-2xl">
        <div className="overflow-auto rounded-xl shadow-lg border border-gray-800">
          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
            <ul>
              {data?.map((item, index) => (
                <li
                  key={index}
                  className="border-t border-gray-800 py-3 px-2 text-sm hover:bg-gray-800 transition duration-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{item.d}</span>
                    <span
                      className={`font-semibold ${
                        type === "credit" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      ${item[type === "credit" ? "cr" : "dr"]}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <p>{item.t}</p>
                    <p>
                      {item.descr} {type === "debit" && item.drstatus}
                    </p>
                  </div>
                </li>
              ))}
              <li className="border-t border-gray-800 py-3 px-2 text-sm font-bold text-green-400 flex justify-between">
                <span>Total</span>
                <span>
                  $
                  {data
                    .reduce(
                      (sum, item) =>
                        sum +
                        parseFloat(item[type === "credit" ? "cr" : "dr"] || 0),
                      0
                    )
                    .toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
