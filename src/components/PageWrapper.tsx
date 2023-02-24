import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="flex flex-col max-w-screen min-h-screen bg-white text-sm text-neutral-800">
      {children}
    </div>
  );
}
