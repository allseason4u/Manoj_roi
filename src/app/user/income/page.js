"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Content from "./Content";

const MyPage = () => {
  return (
    <SidebarLayout activeTabName="Income">
      <Content />
    </SidebarLayout>
  );
};

export default MyPage;
