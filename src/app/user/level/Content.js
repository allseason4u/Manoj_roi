"use client";

import { apiCaller } from "@/utils/apiCaller";
import React, { useState, useEffect } from "react";

const Content = () => {
  const [formData, setFormData] = useState([]);
  const [level, setLevel] = useState({
    lno: 1,
    active: 0,
    dailyamount: 0,
    total: 0,
    totdiractive: 0,
  });

  const fetchData = async (lno = 1) => {
    const { success, data, error } = await apiCaller("/secure/levels", { lno });
    if (success) {
      setFormData(data);
      setLevel({
        lno,
        active: data.length > 0 ? data[0].totalactive : 0,
        dailyamount: data.length > 0 ? data[0].dailyamount : 0,
        total: data.length,
        totdiractive: data.length > 0 ? data[0].totdiractive : 0,
      });
    } else {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 py-6">
      {/* Header */}
      <div className="bg-gray-900 p-5 md:p-8 rounded-xl shadow-lg flex flex-col gap-4 mb-6">
        <h5 className="text-xl md:text-2xl font-bold text-center text-amber-400 uppercase">
          Team Level
        </h5>

        {/* Level Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <p className="text-white font-medium">Level No</p>
            <p className="text-blue-400 font-bold">{level.lno}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <p className="text-white font-medium">Active Ids</p>
            <p className="text-green-400 font-bold">{level.active}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <p className="text-white font-medium">Total Ids</p>
            <p className="text-orange-400 font-bold">{level.total}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm mt-2">
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <p className="text-white">Total Direct Active</p>
            <p className="text-yellow-400 font-bold">{level.totdiractive}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 shadow-md">
            <p className="text-white">Daily Income</p>
            <p className="text-green-400 font-bold">{level.dailyamount}</p>
          </div>
        </div>
      </div>

      {/* Table and Filter */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Dropdown */}
          <div className="mb-4 flex justify-center">
            <div className="relative w-48">
              <select
                className="appearance-none w-full bg-gray-800 text-gray-100 p-3 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                onChange={(e) => fetchData(Number(e.target.value))}
                defaultValue="1"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Level {i + 1}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-lg">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-800 text-gray-300 uppercase">
                <tr>
                  <th className="px-3 py-2 border border-gray-700 w-[10%]">
                    #
                  </th>
                  <th className="px-3 py-2 border border-gray-700 w-[20%]">
                    ID
                  </th>
                  <th className="px-3 py-2 border border-gray-700 w-[25%]">
                    Date
                  </th>
                  <th className="px-3 py-2 border border-gray-700 w-[20%]">
                    Ref.
                  </th>
                  <th className="px-3 py-2 border border-gray-700 w-[25%]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900">
                {formData?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  formData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-800 transition-colors duration-200"
                    >
                      <td className="px-3 py-2 border border-gray-700 text-center">
                        {index + 1}
                      </td>
                      <td className="px-3 py-2 border border-gray-700">
                        {item.memberid}
                      </td>
                      <td className="px-3 py-2 border border-gray-700">
                        {item.dop}
                      </td>
                      <td className="px-3 py-2 border border-gray-700 text-center">
                        {item.introid}
                      </td>
                      <td className="px-3 py-2 border border-gray-700 text-center">
                        {item.totdirect > 0 ? (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                            Nonactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
