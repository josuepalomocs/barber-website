import {
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function BottomNavigation() {
  return (
    <div className="flex justify-center space-x-8 fixed bottom-0 bg-white text-neutral-700 w-full border-t pb-safe-bottom pt-4">
      <button className="flex flex-col space-y-1 items-center">
        <Squares2X2Icon className="w-[20px] h-[20px]" />
        <span className="text-xs">Dashboard</span>
      </button>
      <button className="flex flex-col space-y-1 items-center">
        <ChartBarIcon className="w-[20px] h-[20px]" />
        <span className="text-xs">Analytics</span>
      </button>
      <button className="flex flex-col space-y-1 items-center">
        <CalendarDaysIcon className="w-[20px] h-[20px]" />
        <span className="text-xs">Bookings</span>
      </button>
      <button className="flex flex-col space-y-1 items-center">
        <BuildingStorefrontIcon className="w-[20px] h-[20px]" />
        <span className="text-xs">Shop</span>
      </button>
    </div>
  );
}
