import process from "process";
import { useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";
import { googleMapsAccessKey } from "@/config/google";

export function useGoogleMap() {
  const { isLoaded: googleMapIsLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsAccessKey,
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
      map.set("disableDefaultUI", true);
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
