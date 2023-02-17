import { ReactElement } from "react";

interface TextProps {
  as: keyof HTMLElementTagNameMap;
  type: "titleText" | "bodyText";
  children: string;
}

export default function Text({ as, type, children }: TextProps) {
  let className = "";
  switch (type) {
    case "titleText":
      className = "text-sm text-neutral-500";
      break;
    case "bodyText":
      className = "text-xs text-neutral-600 font-medium";
      break;
  }

  const Component = as;
  return <Component className={className}>{children}</Component>;
}
