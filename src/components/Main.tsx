import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return <main className="flex-1 bg-neutral-50">{children}</main>;
}
