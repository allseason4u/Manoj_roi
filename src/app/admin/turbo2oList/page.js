import SidebarLayoutAdmin from "@/components/SidebarLayoutAdmin";
import Content from "./content";

export default function MemberPage() {
  return (
    <SidebarLayoutAdmin activeTabName="Members">
      <div className="p-6">
        <Content />
      </div>
    </SidebarLayoutAdmin>
  );
}
