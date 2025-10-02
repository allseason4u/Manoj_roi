import SidebarLayoutAdmin from "@/components/SidebarLayoutAdmin";
import Content from "./Content";

export default function MemberPage() {
  return (
    <SidebarLayoutAdmin activeTabName="Member Income">
      <div className="p-6">
        <Content />
      </div>
    </SidebarLayoutAdmin>
  );
}
