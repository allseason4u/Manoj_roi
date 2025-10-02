"use client";
import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import DashboardPage from "./dasboardpage";

const Dashboard = () => {
  return (
    <SidebarLayout activeTabName="Dashboard">
      <DashboardPage />
    </SidebarLayout>
  );
};

export default Dashboard;
