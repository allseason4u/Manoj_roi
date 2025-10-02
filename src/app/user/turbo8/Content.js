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

  const fetchData = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await apiCaller("/secure/turbo8");

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Turbo 2.O - $8</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading cycles...</p>
      ) : treeData.length === 0 ? (
        <p className="text-gray-500 text-sm">No cycles found</p>
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
