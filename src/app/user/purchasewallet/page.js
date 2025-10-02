"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Content from "./Content";

const mypage = () => {
  return (
    <SidebarLayout activeTabName="Purchase Wallet">
      <Content />
    </SidebarLayout>
  );
};

export default mypage;
