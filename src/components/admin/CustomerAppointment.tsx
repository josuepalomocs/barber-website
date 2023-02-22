import { useEffect } from "react";
import { formatDate } from "@/utilities/date";
import { CustomerAppointment as ICustomerAppointment } from "../../types";

interface CustomerAppointmentCardProps extends ICustomerAppointment {}

export default function CustomerAppointment({
  startTimestamp,
  endTimestamp,
  barberServiceId,
  customerInformation,
}: CustomerAppointmentCardProps) {
  return (
    <div className="p-4 text-sm bg-neutral-100 mb-2 text-neutral-500 rounded-md">
      <div className="flex justify-between mb-2">
        <p>{`${customerInformation.firstName} ${customerInformation.lastName}`}</p>
        <p>{`${formatDate(
          new Date(startTimestamp * 1000),
          "h:mmaaa"
        )} - ${formatDate(new Date(endTimestamp * 1000), "h:mmaaa")}`}</p>
      </div>
      <p>{customerInformation.email}</p>
      <p>{formatPhoneNumber(customerInformation.phone)}</p>
    </div>
  );
}

function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phoneNumber;
}
