import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import Modal from "@/components/Modal";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { Service } from "@/types";

interface AddServiceModal {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AddServiceModal({
  isOpen,
  closeModal,
}: AddServiceModal) {
  const [serviceData, setServiceData] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    durationInMinutes: 0,
    price: 0,
  });

  function handleServiceNameChange(e: ChangeEvent<HTMLInputElement>) {
    setServiceData({ ...serviceData, name: e.target.value });
  }
  function handleServiceDescription(e: ChangeEvent<HTMLInputElement>) {
    setServiceData({ ...serviceData, description: e.target.value });
  }
  function handleServiceDurationInMinutesChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setServiceData({
      ...serviceData,
      durationInMinutes: e.target.valueAsNumber,
    });
  }
  function handleServicePriceInUSDChange(e: ChangeEvent<HTMLInputElement>) {
    setServiceData({
      ...serviceData,
      price: e.target.valueAsNumber,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    closeModal();
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
