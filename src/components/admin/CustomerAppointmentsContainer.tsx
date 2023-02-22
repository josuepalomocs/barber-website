import CustomerAppointments from "@/components/admin/CustomerAppointments";

export default function CustomerAppointmentsContainer() {
  return (
    <div className="w-full bg-white rounded">
      <div className="sticky top-0 bg-white w-full flex justify-between p-4 items-center">
        <h4 className="text-black text-base font-medium">Appointments 📅️</h4>
        <button
          className="text-white bg-black text-xs p-3 rounded"
          onClick={() => {}}
        >
          ADD APPOINTMENT +
        </button>
      </div>
      <CustomerAppointments />
    </div>
  );
}
