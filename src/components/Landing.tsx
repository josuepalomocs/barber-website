import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import Link from "next/link";

export default function Landing() {
  const { googleMapIsLoaded, googleMapCenter, googleMapZoom, googleMapOnLoad } =
    useGoogleMap();

  function renderGoogleMap() {
    return googleMapIsLoaded ? (
      <GoogleMap
        mapContainerClassName="w-full h-[200px]"
        center={googleMapCenter}
        zoom={googleMapZoom}
        onLoad={googleMapOnLoad}
      >
        <Marker position={googleMapCenter} />
      </GoogleMap>
    ) : (
      <></>
    );
  }

  return (
    <div className="space-y-8 my-8">
      <div className="px-4">
        <div className="p-4 bg-white rounded-lg border">
          <div className="mb-4">{renderGoogleMap()}</div>
          <p className="flex flex-col text-sm text-neutral-500 mb-2">
            <span className="text-neutral-800 font-medium mb-1">Address</span>
            10455 N Central Expy, Suite #21, Dallas, 75231
          </p>
          <p className="flex flex-col text-sm text-neutral-500">
            <span className="text-neutral-800 font-medium mb-1">Room</span>
            #21. Located at the back of the building.
          </p>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg border">
          <div className="flex justify-between">
            <p className="">Monday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>11:00am - 2:00pm</p>
              <p>2:30pm - 6:30pm</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="">Tuesday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>10:00am - 2:00pm</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="">Wednesday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>Closed</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="">Thursday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>10:00am - 2:00pm</p>
              <p>2:35pm - 6:00pm</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="">Friday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>10:00am - 2:00pm</p>
              <p>2:35pm - 6:00pm</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="">Saturday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>10:00am - 2:00pm</p>
              <p>2:35pm - 6:00pm</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="">Sunday</p>
            <div className="auto-cols-auto text-neutral-500 text-right">
              <p>Closed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-col space-y-4 p-4 bg-white border rounded-lg">
          <div className="flex justify-between text-neutral-500">
            <span className="text-neutral-800 font-medium">Email</span>
            <Link
              className="underline text-blue-500"
              href="mailto:admin@ocf.com"
            >
              admin@ocf.com
            </Link>
          </div>
          <p className="flex justify-between text-neutral-500">
            <span className="text-neutral-800 font-medium">Phone</span>
            (469) 535-1515
          </p>
        </div>
      </div>
    </div>
  );
}
