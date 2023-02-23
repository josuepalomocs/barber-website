import ServiceList from "@/components/ServiceList";
import { BarberService } from "@/types";

interface ServiceListProps {}

export default function ServiceListContainer({}: ServiceListProps) {
  return (
    <div className="text-sm">
      <p className="text-neutral-500 mb-4">Pick a service</p>
      <ServiceList />
    </div>
  );
}
