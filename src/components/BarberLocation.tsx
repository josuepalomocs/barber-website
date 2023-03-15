import { useGoogleMap } from "@/hooks/useGoogleMap";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function BarberLocation() {
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
    <div className="w-full p-4 bg-white rounded-sm border">
      <div className="text-xs text-neutral-500 mb-4">LOCATION</div>
      <p className="text-sm text-neutral-700 mb-4">
        10455 N Central Expy Suite 21 <br /> Dallas, TX 75231
      </p>
      <div className="border-2 border-neutral-200 mb-4 rounded-sm -z-50">
        {renderGoogleMap()}
      </div>
      <Link
        className="text-xs flex items-center gap-2 text-cyan-700"
        href="https://goo.gl/maps/aeKb9Y83Kmzx4RFB9"
      >
        Open in Google Maps
        <ArrowTopRightOnSquareIcon className="w-[16px] h-[16px]" />
      </Link>
    </div>
  );
}
