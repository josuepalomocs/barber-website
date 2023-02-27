import { ScissorsIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

interface ContactFormContainerProps {}

export default function ContactFormContainer({}: ContactFormContainerProps) {
  return (
    <div className="text-sm">
      <ContactForm />
    </div>
  );
}
