import { useForm } from "react-hook-form";
import { BarberService } from "@/types";

interface BarberServicesFormProps {
  type: "add" | "edit";
}

export default function BarberServicesForm({ type }: BarberServicesFormProps) {
  const { register, handleSubmit } = useForm<BarberService>();

  function onSubmit(barberServiceData: BarberService) {
    const { name, durationInMinutes, priceInUsd } = barberServiceData;
  }

  return (
    <form
      className="flex flex-col space-y-4 text-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="barberServiceName">
          Name
        </label>
        <input
          className="border h-12"
          id="barberServiceName"
          type="text"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="barberServiceDurationInMinutes">
          Duration (Minutes)
        </label>
        <input
          className="border h-12"
          id="barberServiceDurationInMinutes"
          type="text"
          {...register("durationInMinutes")}
        />
      </div>
      <div className="flex flex-col">
        <label className="pb-2" htmlFor="barberServicePriceInUsd">
          Price (Usd)
        </label>
        <input
          className="border h-12"
          id="barberServicePriceInUsd"
          type="text"
          {...register("priceInUsd")}
        />
      </div>
      <button className="text-white bg-black rounded-sm h-12" type="submit">
        {type === "add" && "Add service"}
        {type === "edit" && "Edit service"}
      </button>
    </form>
  );
}
