import { useState } from "react";

type Screen = "home" | "analytics" | "bookings" | "shop";

export default function useBottomNavigation() {
  const [selectedScreen, setSelectedScreen] = useState<Screen>("home");

  return {
    selectedScreen,
    setSelectedScreen,
  };
}
