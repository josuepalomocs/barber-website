import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import Modal from "@/components/Modal";
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { BarberService } from "@/types";
import axios from "axios";

interface AddServiceModal {
  isOpen: boolean;
  closeModal: () => void;
}

export default function AddServiceModal({
  isOpen,
  closeModal,
}: AddServiceModal) {
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    closeModal();
    // create new service on the server
    const apiEndpoint = "http://localhost:3000/api/services";
    const response = axios.post<any>(apiEndpoint, barberServiceData);
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
