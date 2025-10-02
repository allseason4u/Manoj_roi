"use client";
import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller"; // adjust import if needed

// Node component (smaller circle with ID under it)
const Node = ({ label }) => {
  return (
    <div className="flex flex-col items-center space-y-0.5">
      {/* Small Circle */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full 
                   bg-gradient-to-r from-purple-500 to-pink-500 
                   text-white text-sm font-semibold shadow-sm hover:scale-105 transition-transform"
      >
        {label?.charAt(0) || "U"}
      </div>
      {/* ID under circle */}
      <p className="text-[10px] font-medium text-gray-600">{label}</p>
    </div>
  );
};

// Single Binary Cycle Card
const BinaryCycle = ({ root, left, right, cycleId }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-48 hover:shadow-md transition-shadow">
      {/* Title */}
      <h3 className="text-center text-xs font-bold text-gray-700 mb-3">
        Cycle #{cycleId}
      </h3>

      {/* Root */}
      <div className="flex justify-center mb-4">
        <Node label={root} />
      </div>

      {/* Children */}
      <div className="flex justify-between px-4">
        <Node label={left} />
        <Node label={right} />
      </div>
    </div>
  );
};

// Turbo 2.O Cycle List Page
const Turbo2OList = () => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await apiCaller("/secure/turbo23");

      setTreeData(
        success ? (Array.isArray(data) ? data : data ? [data] : []) : []
      );

      if (!success) console.error("Fetch error:", error);
    } catch (e) {
      console.error("Unexpected fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      setBuying(true);
      const { success, error } = await apiCaller("/secure/buyturbo", {
        id: 23,
      });

      debugger;
      if (!success) {
        console.error("Buy error:", error);
        return;
      }
      await fetchData();
    } catch (e) {
      console.error("Unexpected buy error:", e);
    } finally {
      setBuying(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Turbo 2.O - $23</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading cycles...</p>
      ) : treeData.length === 0 ? (
        <div className="flex justify-center">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-6 text-center w-72">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-100">
              <svg
                className="w-7 h-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Start Your Matrix
            </h3>
            <p className="text-sm text-gray-600 mb-3">Upgrade Your Plan!</p>
            <button
              onClick={handleBuyNow}
              disabled={buying}
              className={`px-5 py-2 rounded-md font-medium text-white text-sm transition ${
                buying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }`}
            >
              {buying ? "Processing..." : "Buy Now - $23"}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {treeData.map((cycle, idx) => (
            <BinaryCycle
              key={idx}
              cycleId={treeData.length - idx}
              root={cycle.memberid}
              left={cycle.leftid}
              right={cycle.rightid}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Turbo2OList;
