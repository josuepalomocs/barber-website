import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="max-w-screen bg-neutral-50 text-sm text-neutral-800">
      {children}
    </div>
  );
}
