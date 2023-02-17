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
    <div className="w-full p-4 drop-shadow rounded bg-white">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-neutral-600 text-sm font-medium">Services</h4>
        <button
          className="text-white bg-black py-2 px-3 rounded-2xl"
          onClick={openAddBarberServiceModal}
        >
          Add service
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
