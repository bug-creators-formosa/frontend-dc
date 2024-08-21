import { LucideComputer } from "lucide-react";

export function Logo(props: {
  className?: string;
}) {
  return <LucideComputer className={props.className}/>;
}

export function WhiteLogo(props: { className?: string }) {
  return <LucideComputer className={props.className} />;
}
