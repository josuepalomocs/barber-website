import Link from "next/link";

export default function BarberHours() {
  return (
    <div className="flex flex-col w-full p-4 [&>div]:mb-4 border rounded-sm bg-white">
      <div className="text-xs text-neutral-500">AVAILABLE HOURS</div>
      <div className="flex justify-between">
        <p className="">Monday</p>
        <div className="text-right">
          <p>11:00am - 2:00pm</p>
          <p>2:30pm - 6:30pm</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Tuesday</p>
        <div className="text-right">
          <p>10:00am - 2:00pm</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Wednesday</p>
        <div className="text-right">
          <p>Closed</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Thursday</p>
        <div className="text-right">
          <p>10:00am - 2:00pm</p>
          <p>2:35pm - 6:00pm</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Friday</p>
        <div className="text-right">
          <p>10:00am - 2:00pm</p>
          <p>2:35pm - 6:00pm</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Saturday</p>
        <div className="text-right">
          <p>10:00am - 2:00pm</p>
          <p>2:35pm - 6:00pm</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="">Sunday</p>
        <div className="text-right">
          <p>Closed</p>
        </div>
      </div>
    </div>
  );
}
