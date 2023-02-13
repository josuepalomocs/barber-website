import AdminServiceList from "@/components/admin/AdminServiceList";

interface AdminServiceListContainerProps {
  openAddServiceModal: () => void;
}

export default function AdminServiceListContainer({
  openAddServiceModal,
}: AdminServiceListContainerProps) {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <p className="text-neutral-500">Services</p>
        <button onClick={openAddServiceModal}>Add</button>
      </div>
      <AdminServiceList />
    </div>
  );
}
