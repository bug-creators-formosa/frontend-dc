import { NavigationMenuItem } from "@/components/shadcn/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function SidebarItem(props: {
  text: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <NavigationMenuItem
      className={cn(
        "flex items-center font-sans-accent gap-2 text-lg px-3 py-3 w-full",
        props.className
      )}
    >
      <span className="flex-shrink-0 me-4">{props.icon}</span>
      <span className="text-nowrap">{props.text}</span>
    </NavigationMenuItem>
  );
}