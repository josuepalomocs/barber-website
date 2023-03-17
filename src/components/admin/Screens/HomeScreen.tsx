import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import BarberServicesContainer from "@/components/admin/BarberServices/BarberServicesContainer";
import BarberDaySchedulesContainer from "@/components/admin/BarberDaySchedules/BarberDaySchedulesContainer";

export default function HomeScreen() {
  return (
    <div className="w-full h-full text-sm bg-neutral-50 text-neutral-700 pb-20">
      <div className="p-4 border-b text-center">
        <h1 className="text-xl font-display">HOME</h1>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg">Analytics</h2>
          <select
            className="rounded-sm border bg-white p-2"
            name="timeRanges"
            id="timeRanges"
          >
            <option value="today">Today</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
              <CurrencyDollarIcon className="w-[20px] h-[20px]" />
            </div>
            <div className="">
              <p className="text-xs">REVENUE</p>
              <p className="text-lg">
                $235.<span className="text-sm">00</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
              <CalendarDaysIcon className="w-[20px] h-[20px]" />
            </div>
            <div className="">
              <p className="text-xs">BOOKINGS</p>
              <p className="text-lg">8</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
              <EyeIcon className="w-[20px] h-[20px]" />
            </div>
            <div className="">
              <p className="text-xs">SITE VISITS</p>
              <p className="text-lg">16</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-sm drop-shadow-sm">
            <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
              <UserGroupIcon className="w-[20px] h-[20px]" />
            </div>
            <div className="">
              <p className="text-xs">NEW CLIENTS</p>
              <p className="text-lg">5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg">Appointments</h2>
        </div>
        <div className="bg-white drop-shadow-sm p-4 rounded-sm">
          <h4 className="text-xs mb-4">TODAY</h4>
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-1 h-12 bg-neutral-200 rounded-l-full" />
                <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
                  <UserCircleIcon className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <div>Josue Palomo</div>
                  <div className="text-neutral-400">2:30am - 3:30am</div>
                </div>
              </div>
              <button className="p-2">
                <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-1 h-12 bg-red-200 rounded-l-full" />
                <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
                  <UserCircleIcon className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <div>Leo Dallis</div>
                  <div className="text-neutral-400">2:30am - 3:30am</div>
                </div>
              </div>
              <button className="p-2">
                <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
              </button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-1 h-12 bg-green-200 rounded-l-full" />
                <div className="flex justify-center items-center w-8 h-8 bg-neutral-100 rounded-sm">
                  <UserCircleIcon className="w-[20px] h-[20px]" />
                </div>
                <div>
                  <div>Osvaldo Catalan</div>
                  <div className="text-neutral-400">2:30am - 3:30am</div>
                </div>
              </div>
              <button className="p-2">
                <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <BarberServicesContainer />
      <BarberDaySchedulesContainer />
    </div>
  );
}
