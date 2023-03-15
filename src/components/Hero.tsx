import { ArrowRightIcon } from "@heroicons/react/20/solid";

interface HeroProps {
  openSidebar: () => void;
}

export default function Hero({ openSidebar }: HeroProps) {
  return (
    <div className="px-4 text-center">
      <h1 className="text-4xl font-display mx-4 text-neutral-700 mb-6">
        We cut hair. Cortamos cabello.
      </h1>
      <p className="text-lg text-neutral-500 mx-4 mb-6">
        Book with Osvaldo in 5 minutes
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
