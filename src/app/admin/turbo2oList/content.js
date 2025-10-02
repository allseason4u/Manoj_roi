"use client";
import React, { useEffect, useState } from "react";
import { decryptData } from "@/utils/cryptoUtils";
import { Edit, Trash2, Copy, ChevronRight, HandCoins } from "lucide-react"; // icons
import CopyButton from "@/components/copy";

const AdminTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [copiedId, setCopiedId] = useState(null); // track which row is copied

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/admin/turbo2olist", { method: "POST" });
        const encrypted = await res.json();
        const data = JSON.parse(decryptData(encrypted));
        setRows(data);
        setFilteredRows(data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    let updatedRows = [...rows];

    if (search.trim() !== "") {
      updatedRows = updatedRows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (verificationFilter !== "all") {
      updatedRows = updatedRows.filter((row) =>
        verificationFilter === "main" ? row.mtype == "M" : row.mtype == "R"
      );
    }

    setFilteredRows(updatedRows);
  }, [search, verificationFilter, rows]);

  const handleCopy = (wallet, id) => {
    navigator.clipboard.writeText(wallet);
    setCopiedId(id); // mark row as copied
    setTimeout(() => setCopiedId(null), 1000); // reset after 1 sec
  };

  const handleEdit = (id) => {
    alert(`Edit member ${id}`);
  };

  const handleIncome = (id) => {
    alert(`Edit member ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      alert(`Deleted member ${id}`);
    }
  };

  const handleMore = (id) => {
    alert(`Show more details for member ${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-0 bg-gray-50 text-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Turbo 2.0 Member List
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by any field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-1/3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Verification Filter */}
        <select
          value={verificationFilter}
          onChange={(e) => setVerificationFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All type</option>
          <option value="main">Main</option>
          <option value="recycle">Recycle</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Member ID</th>
              <th className="px-4 py-3">Intro ID</th>
              <th className="px-4 py-3">Owner Id</th>
              <th className="px-4 py-3">Leg</th>
              <th className="px-4 py-3">Parent Id</th>
              <th className="px-4 py-3">Cycle No</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => (
                <tr
                  key={row.memberid}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 font-mono">{row.memberid}</td>
                  <td className="px-4 py-3 font-mono">{row.introid}</td>
                  <td className="px-4 py-3 text-green-600 flex items-center gap-2">
                    {/* <CopyButton text={row.walletaddress} /> */}
                    <span>{row.masterid}</span>
                  </td>
                  <td className="px-4 py-3">{row.leg}</td>
                  <td className="px-4 py-3">{row.parentid}</td>
                  <td className="px-4 py-3">{row.cycleno}</td>

                  <td className="px-4 py-3 flex gap-5">
                    <button
                      onClick={() => handleEdit(row.memberid)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(row.memberid)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleMore(row.memberid)}
                      className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
