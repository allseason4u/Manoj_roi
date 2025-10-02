"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Content from "./Content";

const MyPage = () => {
  return (
    <SidebarLayout activeTabName="Withdraw Transaction">
      <Content />
    </SidebarLayout>
  );
};

export default MyPage;
