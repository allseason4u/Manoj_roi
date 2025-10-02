"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import CycleTree from "./cycletree";

const cycletree = () => {
  return (
    <SidebarLayout activeTabName="Cycle $120">
      <CycleTree />
    </SidebarLayout>
  );
};

export default cycletree;
