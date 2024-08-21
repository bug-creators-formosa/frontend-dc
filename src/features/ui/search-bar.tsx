import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

type SearchBarProps = {
  onSearch: (str: string) => void;
  defaultSearch: string;
};

export default function SearchBar(props: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        props.onSearch(inputRef.current?.value ?? "");
      }
    };

    inputRef.current?.addEventListener("keydown", handleEnter);
    const ref = inputRef.current;
    return () => {
      ref?.removeEventListener("keydown", handleEnter);
    };
  }, [props]);

  return (
    <div className="relative flex min-w-40 flex-grow-1">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar..."
        defaultValue={props.defaultSearch}
      />
      <Button className="flex items-center">
        <SearchIcon
          onClick={() => props.onSearch(inputRef.current?.value ?? "")}
        />
      </Button>
    </div>
  );
}
