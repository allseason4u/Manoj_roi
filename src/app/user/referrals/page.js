"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Referrals from "./referrals";

const referrals = () => {
  return (
    <SidebarLayout activeTabName="Referral">
      <Referrals />
    </SidebarLayout>
  );
};

export default referrals;
