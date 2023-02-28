import Link from "next/link";
import Image from "next/image";

interface FooterProps {}

export default function Footer({}: FooterProps) {
  return (
    <footer className="px-4 w-full">
      <div className="flex justify-center space-x-4 mb-4">
        <Link href="https://www.instagram.com/oc_fades/">
          <Image
            src="/instagram_logo.svg"
            alt="Instagram logo"
            width={20}
            height={20}
          />
        </Link>
        <Link href="https://www.tiktok.com/@oc_fades">
          <Image
            src="/tiktok_logo.svg"
            alt="TikTok logo"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <p className="text-xs text-center text-neutral-500">
        © 2023 OCF <br />
        All Rights Reserved.
      </p>
    </footer>
  );
}
