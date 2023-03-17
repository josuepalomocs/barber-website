import {
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon as BuildingStorefrontIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
} from "@heroicons/react/24/solid";
import { Screen } from "@/types";

interface BottomNavigationProps {
  selectedScreen: Screen;
  setSelectedScreen: (selectedScreen: Screen) => void;
}

export default function BottomNavigation({
  selectedScreen,
  setSelectedScreen,
}: BottomNavigationProps) {
  const selectedScreenStyles = "underline";

  function isScreenSelected(screen: Screen) {
    return selectedScreen === screen;
  }

  return (
    <div className="flex justify-center space-x-8 fixed bottom-0 bg-white text-neutral-700 w-full border-t pb-safe-bottom pt-4">
      <button
        className={`flex flex-col space-y-1 items-center`}
        onClick={() => {
          setSelectedScreen("home");
        }}
      >
        {isScreenSelected("home") ? (
          <BuildingStorefrontIconSolid className="w-[20px] h-[20px]" />
        ) : (
          <Squares2X2Icon className="w-[20px] h-[20px]" />
        )}
        <span className="text-xs">Home</span>
      </button>
      <button
        className="flex flex-col space-y-1 items-center"
        onClick={() => {
          setSelectedScreen("analytics");
        }}
      >
        {isScreenSelected("analytics") ? (
          <ChartBarIconSolid className="w-[20px] h-[20px]" />
        ) : (
          <ChartBarIcon className="w-[20px] h-[20px]" />
        )}
        <span className="text-xs">Analytics</span>
      </button>
      <button
        className="flex flex-col space-y-1 items-center"
        onClick={() => {
          setSelectedScreen("bookings");
        }}
      >
        {isScreenSelected("bookings") ? (
          <CalendarDaysIconSolid className="w-[20px] h-[20px]" />
        ) : (
          <CalendarDaysIcon className="w-[20px] h-[20px]" />
        )}
        <span className="text-xs">Bookings</span>
      </button>
      <button
        className="flex flex-col space-y-1 items-center"
        onClick={() => {
          setSelectedScreen("shop");
        }}
      >
        {isScreenSelected("shop") ? (
          <BuildingStorefrontIconSolid className="w-[20px] h-[20px]" />
        ) : (
          <BuildingStorefrontIcon className="w-[20px] h-[20px]" />
        )}
        <span className="text-xs">Shop</span>
      </button>
    </div>
  );
}
