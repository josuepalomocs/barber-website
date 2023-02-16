import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import Modal from "@/components/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { BarberService } from "@/types";

interface AdminAddServiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
  createBarberService: (barberService: BarberService) => void;
}

export default function AdminAddServiceModal({
  isOpen,
  closeModal,
  createBarberService,
}: AdminAddServiceModalProps) {
  const [barberServiceData, setBarberServiceData] = useState<BarberService>({
    id: "",
    name: "",
    description: "",
    durationInMinutes: 0,
    priceInUSD: 0,
  });

  function handleServiceNameChange(e: ChangeEvent<HTMLInputElement>) {
    setBarberServiceData({ ...barberServiceData, name: e.target.value });
  }
  function handleServiceDescription(e: ChangeEvent<HTMLInputElement>) {
    setBarberServiceData({ ...barberServiceData, description: e.target.value });
  }
  function handleServiceDurationInMinutesChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setBarberServiceData({
      ...barberServiceData,
      durationInMinutes: e.target.valueAsNumber,
    });
  }
  function handleServicePriceInUSDChange(e: ChangeEvent<HTMLInputElement>) {
    setBarberServiceData({
      ...barberServiceData,
      priceInUSD: e.target.valueAsNumber,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    closeModal();
    createBarberService(barberServiceData);
  }

  return (
    <Modal title="Add service" isOpen={isOpen} closeModal={closeModal}>
      <Form handleSubmit={handleSubmit}>
        <FormInput
          id="serviceName"
          name="serviceName"
          type="text"
          placeholder="Basic Haircut"
          label="Name"
          handleChange={handleServiceNameChange}
        ></FormInput>
        <FormInput
          id="serviceDescription"
          name="serviceDescription"
          type="text"
          placeholder="A basic haircut service."
          label="Description"
          handleChange={handleServiceDescription}
        ></FormInput>
        <FormInput
          id="serviceDurationInMinutes"
          name="serviceDurationInMinutes"
          type="number"
          placeholder="60"
          label="Duration (Minutes)"
          handleChange={handleServiceDurationInMinutesChange}
        ></FormInput>
        <FormInput
          id="servicePriceInUSD"
          name="servicePriceInUSD"
          type="number"
          placeholder="30"
          label="Price (USD)"
          handleChange={handleServicePriceInUSDChange}
        ></FormInput>
        <FormSubmit id="addServiceSubmit" name="addServiceSubmit" />
      </Form>
    </Modal>
  );
}
