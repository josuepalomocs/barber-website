import Service from "@/components/Service";
import { Service as IService } from "../types";

interface ServiceListProps {
  serviceList: IService[];
}

export default function ServiceList({ serviceList }: ServiceListProps) {
  function renderServices() {
    return serviceList.map(({ id, name, durationInMinutes, price }, index) => {
      return (
        <li
          key={index}
          className="flex justify-between items-center border border-neutral-200 bg-white hover:bg-neutral-200"
        >
          <Service
            id={id}
            name={name}
            durationInMinutes={durationInMinutes}
            price={price}
          />
        </li>
      );
    });
  }

  return <ul className="flex flex-col space-y-2">{renderServices()}</ul>;
}
