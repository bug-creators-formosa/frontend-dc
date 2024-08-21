import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible";
import SidebarItem from "./sidebar-item";
import { Button } from "@/components/shadcn/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type SectionLinkProps = {
  title: string;
  icon: React.ReactNode;
  links: { text: string; href: string }[];
};

export default function SectionLink(props: SectionLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between hover:bg-gray-100 cursor-pointer">
          <SidebarItem text={props.title} icon={props.icon} />
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen && <ChevronDown className="h-4 w-4" />}
            {!isOpen && <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        {props.links.map((link) => {
          return (
            <Link
              to={link.href}
              key={link.href}
              className="block ps-8 py-2 text-sm hover:bg-gray-100"
            >
              <SidebarItem text={link.text} icon={null} className="ps-8 py-0" />
            </Link>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}