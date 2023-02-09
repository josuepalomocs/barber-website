import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "@next/font/google";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as process from "process";
import Recaptcha from "@/components/Recaptcha";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
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
