"use client";

import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller";

const Content = () => {
  const [incomeType, setIncomeType] = useState("Income");
  const [formDatacr, setFormDatacr] = useState([]);
  const [isSelect, setIsSelect] = useState(true);

  const fetchData = async (d) => {
    const { success, data, error } = await apiCaller("/secure/incomehistory", {
      t: d,
    });
    if (success) {
      setFormDatacr(data);

      if (d === "d") setIncomeType("Direct Income");
      else if (d === "l") setIncomeType("Daily Income");
      else if (d === "r") setIncomeType("Royalty Income");
      else if (d === "o") setIncomeType("Other Income");
      else setIncomeType("Income");
    } else {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paramValue = query.get("t");
    if (paramValue) {
      setIsSelect(false);
      fetchData(paramValue);
    } else {
      fetchData("a");
    }
  }, []);

  const crhistory = (option) => fetchData(option);

  return (
    <>
      {/* Header */}
      <div className="bg-white border border-gray-200 p-5 md:p-8 rounded-2xl shadow-md m-3 flex justify-center md:justify-between items-center flex-wrap gap-2">
        <h5 className="text-lg font-bold text-gray-900 uppercase text-center">
          {incomeType}
        </h5>
      </div>

      {/* Content Section */}
      <div className="p-4 md:p-6 space-y-6">
        {isSelect && (
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-800">
                Income Types
              </h3>
              <select
                onChange={(e) => crhistory(e.target.value)}
                className="p-2 border rounded-lg bg-white text-gray-700 border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="a">All</option>
                <option value="d">Direct Income</option>
                <option value="l">Daily Income</option>
                <option value="r">Royalty Income</option>
                <option value="o">Others</option>
              </select>
            </div>
          </div>
        )}

        {/* Income List */}
        <div className="flex justify-center items-center pt-5 pb-10">
          <div className="w-full max-w-2xl">
            <div className="overflow-auto">
              <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-md max-w-full">
                <ul className="divide-y divide-gray-200">
                  {formDatacr?.map((item, index) => (
                    <li
                      key={index}
                      className="py-3 px-2 hover:bg-gray-50 rounded-lg transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {item.d}
                        </span>
                        <span className="text-lg font-semibold text-green-600">
                          ${item.cr}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <p className="mr-4 truncate">{item.t}</p>
                        <p className="truncate">{item.descr}</p>
                      </div>
                    </li>
                  ))}

                  {/* Total Row */}
                  <li className="py-3 px-2 bg-gray-50 rounded-lg mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">
                        Total
                      </span>
                      <span className="text-lg font-bold text-green-700">
                        $
                        {formDatacr
                          .reduce(
                            (sum, item) => sum + parseFloat(item.cr || 0),
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
