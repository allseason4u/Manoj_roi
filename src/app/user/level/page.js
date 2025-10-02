"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Content from "./Content";

const mypage = () => {
  return (
    <SidebarLayout activeTabName="Level">
      <Content />
    </SidebarLayout>
  );
};

export default mypage;
