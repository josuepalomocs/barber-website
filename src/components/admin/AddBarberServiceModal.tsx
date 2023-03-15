import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import Modal from "@/components/Modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { BarberService } from "@/types";

interface AddBarberServiceModalProps {
  isOpen: boolean;
  closeModal: () => void;
  createBarberService: (barberService: BarberService) => void;
}

export default function AddBarberServiceModal({
  isOpen,
  closeModal,
  createBarberService,
}: AddBarberServiceModalProps) {
  const [barberServiceData, setBarberServiceData] = useState<BarberService>({
    id: "",
    name: "",
    description: "",
    durationInMinutes: -1,
    priceInUsd: -1,
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
      priceInUsd: e.target.valueAsNumber,
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
          value={barberServiceData.name}
          handleChange={handleServiceNameChange}
        ></FormInput>
        <FormInput
          id="serviceDescription"
          name="serviceDescription"
          type="text"
          placeholder="A basic haircut service."
          label="Description"
          value={barberServiceData.description}
          handleChange={handleServiceDescription}
        ></FormInput>
        <FormInput
          id="serviceDurationInMinutes"
          name="serviceDurationInMinutes"
          type="number"
          placeholder="60"
          label="Duration (Minutes)"
          value={
            barberServiceData.durationInMinutes < 0
              ? ""
              : barberServiceData.durationInMinutes
          }
          handleChange={handleServiceDurationInMinutesChange}
        ></FormInput>
        <FormInput
          id="servicePriceInUSD"
          name="servicePriceInUSD"
          type="number"
          placeholder="30"
          label="Price (USD)"
          value={
            barberServiceData.priceInUsd < 0 ? "" : barberServiceData.priceInUsd
          }
          handleChange={handleServicePriceInUSDChange}
        ></FormInput>
        <FormSubmit id="addServiceSubmit" name="addServiceSubmit" />
      </Form>
    </Modal>
  );
}
