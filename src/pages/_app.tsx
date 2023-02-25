import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito, Roboto } from "@next/font/google";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as process from "process";

const rubik = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});
const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      <div className={`${rubik.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </GoogleReCaptchaProvider>
  );
}
