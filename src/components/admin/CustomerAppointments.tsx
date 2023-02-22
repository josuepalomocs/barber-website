import { useEffect } from "react";
import useCustomerAppointments from "@/hooks/useCustomerAppointments";
import CustomerAppointment from "@/components/admin/CustomerAppointment";
import { isSameDay } from "date-fns";
import { formatDate } from "@/utilities/date";
import { CustomerAppointment as ICustomerAppointment } from "../../types";

interface CustomerAppointmentCardsProps {}

export default function CustomerAppointments({}: CustomerAppointmentCardsProps) {
  const { customerAppointments } = useCustomerAppointments();

  function renderCustomerAppointmentCards() {
    const customerAppointmentsByDate: {
      [key: string]: ICustomerAppointment[];
    } = customerAppointments.reduce((acc, customerAppointment) => {
      const date = formatDate(
        new Date(customerAppointment.startTimestamp * 1000),
        "MMM d, yyyy"
      );
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(customerAppointment);
      return acc;
    }, {});

    return Object.entries(customerAppointmentsByDate).map(
      ([date, customerAppointments]) => {
        return (
          <div className="px-4" key={date}>
            <div className="flex justify-between">
              <h3 className="mb-2 text-sm">{date}</h3>
            </div>
            <ul>
              {customerAppointments.map((customerAppointment) => (
                <li
                  key={customerAppointment.startTimestamp}
                  className="rounded-2xl"
                >
                  <CustomerAppointment
                    startTimestamp={customerAppointment.startTimestamp}
                    endTimestamp={customerAppointment.endTimestamp}
                    barberServiceId={customerAppointment.barberServiceId}
                    customerInformation={
                      customerAppointment.customerInformation
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      }
    );
  }

  if (!customerAppointments) return <></>;

  return <>{renderCustomerAppointmentCards()}</>;
}
