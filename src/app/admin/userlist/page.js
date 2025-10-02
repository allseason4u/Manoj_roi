import SidebarLayoutAdmin from "@/components/SidebarLayoutAdmin";
import AdminTable from "./AdminTable";

export default function MemberPage() {
  return (
    <SidebarLayoutAdmin activeTabName="users">
      <div className="p-6">
        <AdminTable />
      </div>
    </SidebarLayoutAdmin>
  );
}
