"use client";

import { apiCaller } from "@/utils/apiCaller";
import React, { useState, useEffect } from "react";

const Content = () => {
  const [formData, setFormData] = useState([]);
  const [history, setHistory] = useState([]);
  const [teamType, setTeamType] = useState("All Team");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("8");

  const fetchData = async (t = "") => {
    const { success, data, error } = await apiCaller("/secure/team", { t });
    if (success) {
      if (!isInitialLoad) setHistory((prev) => [...prev, formData]);
      setFormData(data);
      setTeamType(t === "a" ? "Active Team" : "All Team");
      setIsInitialLoad(false);
    } else {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paramValue = query.get("t") || "";
    fetchData(paramValue);
  }, []);

  const goBack = () => {
    if (history.length > 0) {
      const previousData = history.pop();
      setFormData(previousData);
      setHistory([...history]);
    }
  };

  // Filtered data
  const filteredData = formData.filter((item) => {
    const matchSearch = item.walletid
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchPackage = selectedPackage
      ? String(item.package) === selectedPackage
      : true;

    return matchSearch && matchPackage;
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-6">
      {/* Header */}
      <div className="bg-gray-100 p-5 md:p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border border-gray-200">
        <h5 className="text-lg md:text-xl font-bold text-center text-black-600 uppercase">
          JTurbo 2.o Team - Package ${selectedPackage}
        </h5>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by Wallet ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-48 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Package Select */}
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-32 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">All Packages</option>
            <option value="8">$8</option>
            <option value="23">$23</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-2 py-3 border border-gray-200 w-[8%]">#</th>
                  <th className="px-2 py-3 border border-gray-200 w-[18%]">
                    ID
                  </th>
                  <th className="px-2 py-3 border border-gray-200 w-[20%]">
                    Date
                  </th>
                  <th className="px-2 py-3 border border-gray-200 w-[15%]">
                    Ref.
                  </th>
                  <th className="px-2 py-3 border border-gray-200 w-[15%]">
                    Package
                  </th>
                  <th className="px-2 py-3 border border-gray-200 w-[24%]">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-800">
                {filteredData?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="border border-gray-200 px-2 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 break-words">
                        {item.walletid}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 break-words">
                        {item.date}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-center">
                        {item.totcnt}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-center">
                        ${item.package}
                      </td>
                      <td className="border border-gray-200 px-2 py-2 text-center">
                        {/* {item.totcnt > 0 ? (
                          <button
                            onClick={() => fetchData(item.walletid)}
                            className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full hover:bg-green-400 transition"
                          >
                            Active
                          </button>
                        ) : (
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                            Nonactive
                          </span>
                        )} */}
                        {item.walletadr}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Go Back Button */}
          {history.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={goBack}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition"
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
