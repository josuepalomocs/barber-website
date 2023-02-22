import ServiceList from "@/components/ServiceList";
import { BarberService } from "@/types";

interface ServiceListProps {}

export default function ServiceListContainer({}: ServiceListProps) {
  const serviceList: BarberService[] = [
    { id: 0, name: "Haircut", durationInMinutes: 60, price: 30 },
    { id: 1, name: "Haircut + Eyebrows", durationInMinutes: 75, price: 35 },
    { id: 2, name: "Haircut + Beard", durationInMinutes: 75, price: 35 },
    {
      id: 3,
      name: "Haircut + Beard + Eyebrows",
      durationInMinutes: 90,
      price: 40,
    },
    { id: 4, name: "Kids' Haircut", durationInMinutes: 30, price: 25 },
  ];

  return (
    <div className="text-sm">
      <p className="text-neutral-500 mb-4">Pick a service</p>
      <ServiceList serviceList={serviceList} />
    </div>
  );
}
