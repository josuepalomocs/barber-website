import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useCallback, useEffect } from "react";

interface RecaptchaProps {}

export default function Recaptcha({}: RecaptchaProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha("book_appointment");
    console.log(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify().catch((error) => console.log(error));
  }, [handleReCaptchaVerify]);

  return <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>;
}
