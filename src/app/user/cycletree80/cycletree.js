"use client";

import React, { useState, useEffect } from "react";
import { apiCaller } from "@/utils/apiCaller";

const TreeNode = ({ label = "JR", level = 0, memberId, position }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isFilled = !!(memberId && String(memberId).trim() !== "");

  const getNodeColor = (lvl, filled) => {
    if (!filled) return "bg-gray-200 border border-gray-300 text-gray-500";
    const colors = [
      "bg-blue-600 text-white", // level 0
      "bg-green-600 text-white", // level 1
      "bg-purple-600 text-white", // level 2
    ];
    return colors[lvl] || "bg-gray-400 text-white";
  };

  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-medium shadow-sm cursor-default text-[10px] hover:scale-105 transition-transform ${getNodeColor(
          level,
          isFilled
        )}`}
        onMouseEnter={() => isFilled && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isFilled ? label : ""}
        {showTooltip && isFilled && (
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow">
            {memberId}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>
      <div className="text-[9px] text-gray-500 mt-0.5 text-center">
        {memberId}
      </div>
    </div>
  );
};

const TreeNodeLevel2 = ({ label = "JR", level = 0, memberId, position }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isFilled = !!(memberId && String(memberId).trim() !== "");

  const getNodeColor = (lvl, filled) => {
    if (!filled) return "bg-gray-200 border border-gray-300 text-gray-500";
    const colors = [
      "bg-blue-600 text-white", // level 0
      "bg-green-600 text-white", // level 1
      "bg-purple-600 text-white", // level 2
    ];
    return colors[lvl] || "bg-gray-400 text-white";
  };

  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-sm cursor-default text-[10px] hover:scale-105 transition-transform ${getNodeColor(
          level,
          isFilled
        )}`}
        onMouseEnter={() => isFilled && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isFilled ? label : ""}
        {showTooltip && isFilled && (
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-0.5 rounded text-[10px] whitespace-nowrap shadow">
            {memberId}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>
      {/* <div className="text-[9px] text-gray-500 mt-0.5 text-center">
        {memberId}
      </div> */}
    </div>
  );
};

/**
 * Lines between levels
 */
const LevelConnector = () => (
  <div className="relative w-full flex justify-center">
    <svg
      className="absolute -top-4"
      width="600"
      height="40"
      viewBox="0 0 600 40"
      aria-hidden="true"
    >
      {/* Left cluster */}
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="15"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="100"
        y1="15"
        x2="150"
        y2="15"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="150"
        y1="15"
        x2="150"
        y2="40"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      {/* Middle cluster */}
      <line
        x1="300"
        y1="0"
        x2="300"
        y2="15"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="250"
        y1="15"
        x2="350"
        y2="15"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="250"
        y1="15"
        x2="250"
        y2="40"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="350"
        y1="15"
        x2="350"
        y2="40"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      {/* Right cluster */}
      <line
        x1="500"
        y1="0"
        x2="500"
        y2="15"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="450"
        y1="15"
        x2="500"
        y2="15"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <line
        x1="450"
        y1="15"
        x2="450"
        y2="40"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
    </svg>
  </div>
);

const CycleTreePage = () => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);

  const [priddata, setPride] = useState({});

  const getMemberprid = async () => {
    const { success, data } = await apiCaller("/secure/getMemberprid");
    const MYdata = data[0];
    if (success && MYdata && typeof MYdata.prid !== "undefined") {
      setPride({ booster: MYdata.booster, nextbooster: MYdata.nextbooster });
      await fetchData();
    } else {
      setPride({});
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await apiCaller("/secure/cycletree80");
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
      const { success, error } = await apiCaller("/secure/buycycletree", {
        id: 3,
      });
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
    getMemberprid();
  }, []);

  const renderTree = (tree) => {
    const total = 12;
    const filled = Array.from({ length: total }, (_, i) =>
      String(i + 1)
    ).filter((key) => tree[key] !== undefined && tree[key] !== null).length;

    const empty = total - filled;

    return (
      <div className="flex flex-col items-center space-y-5 p-4 pt-8">
        <div className="flex justify-center">
          <TreeNode
            label="JR"
            memberId={tree.MemberId}
            level={0}
            position="Root"
          />
        </div>

        <div className="flex justify-center gap-16  ">
          <TreeNode label="JR" memberId={tree["1"]} level={1} />
          <TreeNode label="JR" memberId={tree["2"]} level={1} />
          <TreeNode label="JR" memberId={tree["3"]} level={1} />
        </div>

        <div className="flex justify-center gap-6 mt-0">
          <div className="flex gap-2">
            <TreeNodeLevel2 label="JR" memberId={tree["4"]} level={2} />
            <TreeNodeLevel2 label="JR" memberId={tree["5"]} level={2} />
            <TreeNodeLevel2 label="JR" memberId={tree["6"]} level={2} />
          </div>
          <div className="flex gap-2">
            <TreeNodeLevel2 label="JR" memberId={tree["7"]} level={2} />
            <TreeNodeLevel2 label="JR" memberId={tree["8"]} level={2} />
            <TreeNodeLevel2 label="JR" memberId={tree["9"]} level={2} />
          </div>
          <div className="flex gap-2">
            <TreeNodeLevel2 label="JR" memberId={tree["10"]} level={2} />
            <TreeNodeLevel2 label="JR" memberId={tree["11"]} level={2} />
            <TreeNodeLevel2 label="JR" memberId={tree["12"]} level={2} />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-600" />
            <span>Filled: {filled}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-600" />
            <span>Empty: {empty}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-4">
      <div className="container mx-auto px-2">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            JR Booster Income
          </h1>
          <div className="inline-flex items-center bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-sm">
            Booster Matrix Tree - $80
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
              <div className="text-sm text-gray-600">Loading tree...</div>
            </div>
          </div>
        ) : treeData.length === 0 ? (
          <>
            {priddata?.nextbooster == 80 ? (
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
                  <p className="text-sm text-gray-600 mb-3">
                    Join now and start earning!
                  </p>
                  <button
                    onClick={handleBuyNow}
                    disabled={buying}
                    className={`px-5 py-2 rounded-md font-medium text-white text-sm transition ${
                      buying
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
                  >
                    {buying ? "Processing..." : "Buy Now - $80"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg text-sm w-80 text-center shadow-sm">
                  Please upgrade to the next booster (${priddata?.nextbooster})
                  to unlock this matrix.
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4 w-80 mx-auto">
            {treeData.map((tree, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-center">
                  <h2 className="text-lg font-bold text-white">
                    Cycle #{tree.cycleno}
                  </h2>
                  <div className="text-xs text-blue-100">
                    Member ID: {tree.MemberId}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <div className="min-w-max">{renderTree(tree)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CycleTreePage;
