"use client";
import React, { useEffect, useState } from "react";
import { apiCallerAdmin } from "@/utils/apiCallerAdmin";

const AdminIncomePage = () => {
  const [memberId, setMemberId] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("s");
      if (ref) {
        setMemberId(atob(ref).split("-")[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (memberId) {
      fetchMemberIncomes(memberId); // pass memberId if required
    }
  }, [memberId]);

  const fetchMemberIncomes = async () => {
    if (!memberId.trim()) {
      setError("Please enter a Member ID");
      return;
    }
    setError("");
    setLoading(true);
    setIncomes([]);

    const { success, data, error } = await apiCallerAdmin("/admin/Incomelist", {
      memberid: memberId.trim(),
    });
    if (success) {
      if (data.length === 0) {
        setError("No income records found for this member.");
      }
      setIncomes(data);
    } else {
      console.error("Fetch error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white text-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Member Income Details
      </h2>

      {/* Member ID Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Member ID (e.g., MB001)"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="px-4 py-2 w-full sm:w-1/3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchMemberIncomes}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-600 text-lg py-6">Loading...</div>
      )}

      {/* Table */}
      {!loading && incomes.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Income Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 text-blue-600">{income.ctype}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    ${income.cr}
                  </td>
                  <td className="px-4 py-3">{income.crdate}</td>
                  <td className="px-4 py-3">{income.descr || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminIncomePage;
