"use client";

import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller";

const Content = () => {
  const [activeTab, setActiveTab] = useState("credit");
  const [creditOption, setCreditOption] = useState("a");
  const [debitOption, setDebitOption] = useState("a");
  const [formDatacr, setFormDatacr] = useState([]);
  const [formDatadr, setFormDatadr] = useState([]);
  const [loading, setLoading] = useState(false);

  /** Fetch Data */
  const fetchdata = async (d, t) => {
    setLoading(true);
    const { success, data, error } = await apiCaller(
      "/secure/purchasehistory",
      { d, t }
    );
    if (success) {
      if (t === "c") setFormDatacr(data);
      if (t === "d") setFormDatadr(data);
    } else console.error("Fetch error:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchdata("a", "c");
  }, []);

  const crhistory = (option) => fetchdata(option, "c");
  const drhistory = (option) => fetchdata(option, "d");

  /** Calculate Totals */
  const totalCredit = formDatacr
    .reduce((sum, item) => sum + parseFloat(item.cr || 0), 0)
    .toFixed(2);
  const totalDebit = formDatadr
    .reduce((sum, item) => sum + parseFloat(item.dr || 0), 0)
    .toFixed(2);

  return (
    <div className="px-4 md:px-10 py-5 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 border border-blue-900 p-5 rounded-xl shadow-lg text-center mb-6">
        <h5 className="text-2xl font-bold text-white uppercase tracking-wide">
          Purchase Wallet
        </h5>
      </div>

      {/* Summary Section */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
        <SummaryCard
          title="Total Credit"
          value={`$${totalCredit}`}
          color="text-green-400"
        />
        <SummaryCard
          title="Total Debit"
          value={`$${totalDebit}`}
          color="text-red-400"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 justify-center mb-5">
        {["credit", "debit"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              tab === "credit" ? fetchdata("a", "c") : fetchdata("a", "d");
            }}
            className={`w-1/2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 ${
              activeTab === tab
                ? tab === "credit"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-red-600 text-white shadow-lg"
                : "bg-neutral-900 text-gray-300 hover:bg-neutral-800 border border-neutral-800"
            }`}
          >
            {tab === "credit" ? "💰 Credit" : "💸 Debit"}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-blue-400 animate-pulse">
          Loading data...
        </p>
      )}

      {/* CREDIT TAB */}
      {activeTab === "credit" && (
        <div>
          <FilterHeader
            title="Credit History"
            option={creditOption}
            setOption={setCreditOption}
            onChange={crhistory}
            accent="blue"
          />
          <TransactionList
            data={formDatacr}
            total={totalCredit}
            type="credit"
          />
        </div>
      )}

      {/* DEBIT TAB */}
      {activeTab === "debit" && (
        <div>
          <FilterHeader
            title="Debit History"
            option={debitOption}
            setOption={setDebitOption}
            onChange={drhistory}
            accent="red"
          />
          <TransactionList data={formDatadr} total={totalDebit} type="debit" />
        </div>
      )}
    </div>
  );
};

/** SummaryCard Component */
const SummaryCard = ({ title, value, color }) => (
  <div className="flex-1 bg-neutral-900 border border-neutral-800 p-4 rounded-lg shadow-sm text-center hover:shadow-blue-900/50 transition-all">
    <h3 className="text-sm text-gray-400">{title}</h3>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);

/** FilterHeader Component */
const FilterHeader = ({ title, option, setOption, onChange, accent }) => (
  <div
    className={`bg-neutral-900 border border-neutral-800 p-4 rounded-md shadow-sm flex justify-between items-center mb-4`}
  >
    <h3 className={`text-base font-semibold text-${accent}-400`}>{title}</h3>
    <select
      value={option}
      onChange={(e) => {
        setOption(e.target.value);
        onChange(e.target.value);
      }}
      className={`p-2 rounded-md bg-neutral-800 text-white text-sm border border-neutral-700 focus:ring focus:ring-${accent}-500`}
    >
      <option value="a">All</option>
      {title.includes("Credit") && <option value="d">From Income</option>}
      {title.includes("Credit") && <option value="t">Transfer</option>}
      {title.includes("Credit") && <option value="M">Add Money</option>}
      {title.includes("Debit") && <option value="t">Transfer</option>}
      {title.includes("Debit") && <option value="p">Purchase</option>}
    </select>
  </div>
);

/** TransactionList Component */
const TransactionList = ({ data, total, type }) => (
  <div className="flex justify-center">
    <div className="w-full max-w-2xl">
      <div className="bg-neutral-900 border border-neutral-800 rounded-md shadow-md overflow-hidden">
        <ul>
          {data?.map((item, index) => (
            <li
              key={index}
              className="border-b border-neutral-800 py-3 px-4 hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{item.d}</span>
                <span
                  className={`text-lg font-semibold ${
                    type === "credit" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ${item.cr || item.dr}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <p>{item.t}</p>
                <p>
                  {item.descr} {type === "debit" && item.drstatus}
                </p>
              </div>
            </li>
          ))}
          <li className="py-3 px-4 font-semibold flex justify-between text-blue-400">
            <span>Total</span>
            <span>${total}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Content;
