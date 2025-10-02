import SidebarLayoutAdmin from "@/components/SidebarLayoutAdmin";
import Content from "./content";

export default function MemberPage() {
  return (
    <SidebarLayoutAdmin activeTabName="dashboard">
      <Content />
    </SidebarLayoutAdmin>
  );
}
