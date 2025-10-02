"use client";

import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller";

const Content = () => {
  const [formData, setFormData] = useState([]);
  const [history, setHistory] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchData = async (id = "") => {
    const { success, data, error } = await apiCaller("/secure/referrals", {
      id,
    });
    if (success) {
      if (!isInitialLoad) setHistory((prev) => [...prev, formData]);
      setFormData(data);
      setIsInitialLoad(false);
    } else {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paramValue = query.get("id");
    fetchData(paramValue || "");
  }, []);

  const goBack = () => {
    if (history.length > 0) {
      const previousData = history.pop();
      setFormData(previousData);
      setHistory([...history]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-6">
      {/* Header Section */}
      <div className="bg-white p-5 md:p-8 rounded-xl shadow-md flex justify-center items-center mb-6">
        <h5 className="text-xl md:text-2xl font-bold text-gray-800 uppercase tracking-wider">
          Referrals
        </h5>
      </div>

      {/* Table Section */}
      <div className="flex justify-center items-center pb-12">
        <div className="w-full max-w-4xl">
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 w-[8%] text-center">
                    #
                  </th>
                  <th className="border border-gray-200 px-3 py-2 w-[22%]">
                    ID
                  </th>
                  <th className="border border-gray-200 px-3 py-2 w-[25%]">
                    Date
                  </th>
                  <th className="border border-gray-200 px-3 py-2 w-[15%] text-center">
                    Ref.
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-800">
                {formData?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No referrals found.
                    </td>
                  </tr>
                ) : (
                  formData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="border border-gray-200 px-2 py-2 text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 truncate">
                        {item.walletid}
                      </td>
                      <td className="border border-gray-200 px-2 py-2">
                        {item.date}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-center">
                        {item.totcnt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Go Back Button */}
          {history.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={goBack}
                className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow transition duration-150"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
