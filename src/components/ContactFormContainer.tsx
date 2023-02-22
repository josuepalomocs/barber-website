import { ScissorsIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

interface ContactFormContainerProps {}

export default function ContactFormContainer({}: ContactFormContainerProps) {
  return (
    <div className="text-sm">
      <p className="text-neutral-500 mb-4">Add contact information</p>
      <ContactForm />
    </div>
  );
}
