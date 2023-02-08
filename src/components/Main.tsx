import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="flex-1 flex flex-col space-y-4 text-sm text-neutral-800 bg-neutral-50">
      {children}
    </main>
  );
}
