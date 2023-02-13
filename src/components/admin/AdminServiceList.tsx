import { Service } from "@/types";
import AdminService from "@/components/admin/AdminService";

interface AdminServiceListProps {}

export default function AdminServiceList({}: AdminServiceListProps) {
  const services: Service[] = [
    {
      id: 0,
      name: "Haircut",
      description:
        "A basic haircut service involves trimming and shaping the hair to create a desired look and maintain its health.",
      durationInMinutes: 60,
      price: 30,
    },
  ];

  function renderServices() {
    return services.map(
      ({ id, name, description, durationInMinutes, price }) => {
        return (
          <li key={id}>
            <AdminService
              id={id}
              name={name}
              description={description}
              durationInMinutes={durationInMinutes}
              price={price}
            />
          </li>
        );
      }
    );
  }

  return <ul className="">{renderServices()}</ul>;
}
