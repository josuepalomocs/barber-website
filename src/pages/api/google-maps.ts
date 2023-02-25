import type { NextApiRequest, NextApiResponse } from "next";
import * as process from "process";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    if (!GOOGLE_MAPS_API_KEY)
      return res.status(500).json({
        error: {
          code: "ENV_VAR_NOT_FOUND",
          message: "A required environment variable was not found.",
          details: { missingEnvVar: "GOOGLE_MAPS_API_KEY" },
        },
      });

    const googleMapsApiEndpoint = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    return await axios
      .get(googleMapsApiEndpoint)
      .then((response) => res.status(200).json(response))
      .catch((error) =>
        res.status(500).json({
          error: {
            code: "GOOGLE_MAPS_API_REQUEST_FAILED",
            message: "The Google Maps API returned an error response.",
            details: { googleMapsApiRequestError: error },
          },
        })
      );
  }
}
