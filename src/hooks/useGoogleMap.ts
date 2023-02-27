import process from "process";
import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";

export function useGoogleMap() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const { isLoaded: googleMapIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    preventGoogleFontsLoading: true,
  });

  const googleMapCenter = {
    lat: 32.889965,
    lng: -96.771619,
  };

  const googleMapZoom = 16;

  const googleMapOnLoad = useCallback(
    (map: google.maps.Map) => {
      map.set("controlSize", 20);
      // map.set("disableDefaultUI", true);
    },
    [googleMapCenter]
  );

  return {
    googleMapIsLoaded,
    googleMapCenter,
    googleMapZoom,
    googleMapOnLoad,
  };
}
