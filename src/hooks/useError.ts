import { useState } from "react";
import { CustomError } from "@/types";

export default function useError() {
  const [error, setError] = useState<CustomError | null>(null);

  return { error, setError };
}
