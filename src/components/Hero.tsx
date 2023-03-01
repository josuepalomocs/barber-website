import { ArrowRightIcon } from "@heroicons/react/20/solid";

interface HeroProps {
  openSidebar: () => void;
}

export default function Hero({ openSidebar }: HeroProps) {
  return (
    <div className="px-4 text-center">
      <h1 className="text-4xl font-display mx-4 text-neutral-700 mb-6">
        THE HIGHEST QUALITY CUTS. NO LESS.
      </h1>
      <p className="text-lg text-neutral-500 mx-4 mb-6">
        From classic cuts to modern styles, we&apos;ve got you covered.
      </p>
      <button
        className="flex justify-center items-center gap-1.5 w-full p-4 bg-cyan-700 text-white rounded-sm"
        onClick={openSidebar}
      >
        Book Appointment <ArrowRightIcon className="w-[16px]" />
      </button>
    </div>
  );
}
