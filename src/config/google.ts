import process from "process";

if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_ACCESS_KEY)
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_GOOGLE_MAPS_ACCESS_KEY"
  );

if (!process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_ACCESS_KEY)
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_GOOGLE_RECAPTCHA_ACCESS_KEY"
  );

const googleMapsAccessKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ACCESS_KEY;
const googleRecaptchaAccessKey =
  process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_ACCESS_KEY;

export { googleMapsAccessKey, googleRecaptchaAccessKey };
