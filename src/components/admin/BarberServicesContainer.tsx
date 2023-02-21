import BarberServices from "@/components/admin/BarberServices";
import useModal from "@/hooks/useModal";
import AddBarberServiceModal from "@/components/admin/AddBarberServiceModal";
import useBarberServices from "@/hooks/useBarberServices";

export default function BarberServicesContainer() {
  const {
    isOpen: addBarberServiceModalIsOpen,
    openModal: openAddBarberServiceModal,
    closeModal: closeAddBarberServiceModal,
  } = useModal();

  const {
    barberServices,
    createBarberService,
    updateBarberService,
    deleteBarberService,
  } = useBarberServices();

  return (
    <div className="w-full rounded bg-white">
      <div className="sticky top-0 bg-white w-full flex justify-between p-4 items-center">
        <h4 className="text-black text-base font-medium">Services 🛠️</h4>
        <button
          className="text-white bg-black text-xs p-3 rounded"
          onClick={openAddBarberServiceModal}
        >
          ADD SERVICE +
        </button>
      </div>
      <BarberServices
        barberServices={barberServices}
        updateBarberService={updateBarberService}
        deleteBarberService={deleteBarberService}
      />
      <AddBarberServiceModal
        isOpen={addBarberServiceModalIsOpen}
        closeModal={closeAddBarberServiceModal}
        createBarberService={createBarberService}
      />
    </div>
  );
}
