import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat, Yeseva_One } from "@next/font/google";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { googleRecaptchaAccessKey } from "@/config/google";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const yesevaOne = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yesevaOne",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={googleRecaptchaAccessKey}>
      <div className={`${yesevaOne.variable} font-display`}>
        <div className={`${montserrat.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
}
