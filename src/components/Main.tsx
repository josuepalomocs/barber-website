import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="flex-1 text-sm text-neutral-800 bg-neutral-50">
      {children}
    </main>
  );
}
