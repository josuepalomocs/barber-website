import useModal from "@/components/admin/Modal/useModal";
import BarberServices from "@/components/admin/BarberServices/BarberServices";
import BarberServicesForm from "@/components/admin/Form/BarberServicesForm";
import Modal from "@/components/admin/Modal/Modal";
import useBarberServices from "@/components/admin/BarberServices/useBarberServices";

export default function BarberServicesContainer() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { barberServices } = useBarberServices();

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg">Services</h2>
        <button className="" onClick={handleOpenModal}>
          Add service
        </button>
      </div>
      <BarberServices barberServices={barberServices ?? []} />
      <Modal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title="Add service"
      >
        <BarberServicesForm type="add" />
      </Modal>
    </div>
  );
}
