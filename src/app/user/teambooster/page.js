"use client";
import React, { useEffect, useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Content from "./Content";

const MyPage = () => {
  const [t, setT] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setT(query.get("t") || "");
  }, []);

  return (
    <SidebarLayout activeTabName={t === "a" ? "Active" : "Team"}>
      <Content key={t} t={t} />
    </SidebarLayout>
  );
};

export default MyPage;
