import Link from "next/link";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

export default function BarberContact() {
  return (
    <div className="w-full p-4 bg-white rounded-sm border">
      <h4 className="text-xs text-neutral-500 mb-4">CONTACT</h4>
      <div className="mb-4">
        <Link
          className="flex items-center gap-2 text-sm text-neutral-700"
          href="mailto:ocfadesdevelop@gmail.com"
        >
          <EnvelopeIcon className="w-[16px] h-[16px]" />
          admin@ocf.com
        </Link>
      </div>
      <Link
        className="flex items-center gap-2 text-sm text-neutral-700"
        href="tel:4695351515"
      >
        <PhoneIcon className="w-[16px] h-[16px]" />
        (469) 535-1515
      </Link>
    </div>
  );
}
