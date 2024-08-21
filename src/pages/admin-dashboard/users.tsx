import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import UserList, {
  UserListSkeleton,
} from "@/features/admin-dashboard/components/user-list";
import { getUsers } from "@/features/admin-dashboard/services/users";
import { ROLES } from "@/features/auth/constants/roles";
import SearchBar from "@/features/ui/search-bar";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown, FilterIcon, XIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function UserListPage() {
  const [params, setParams] = useSearchParams();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", params.toString()],
    queryFn: () => getUsers(params),
  });

  const mergeParams = (obj: Record<string, string>) => {
    const newParams = new URLSearchParams(params);
    for (const [key, value] of Object.entries(obj)) {
      if (value == "null") {
        newParams.delete(key);
        continue;
      }
      newParams.set(key, value);
    }
    setParams(newParams);
  };

  return (
    <main className="px-7 py-6 overflow-y-scroll max-h-full">
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Usuarios registrados</h1>
      </hgroup>
      <div className="grid grid-cols-[60%_20%_20%] p-2 gap-3">
        <SearchBar
          onSearch={(s) => mergeParams({ q: s })}
          defaultSearch={params.get("q") ?? ""}
        />
        <FilterBar
          onChange={(filter) => mergeParams({ filter_role: filter })}
          filter={params.get("filter_role") ?? ""}
        />
        <SortBar
          onChange={(sort) => mergeParams({ order_by: sort })}
          sort={params.get("order_by") ?? ""}
        />
      </div>
      {isLoading && <UserListSkeleton />}
      {!isLoading && users && (
        <div>
          <UserList users={users} />
        </div>
      )}
    </main>
  );
}

// TODO: Refactor FilterBar and SortBar into reusables components
type FilterBarProps<TOptions extends string[]> = {
  onChange: (filter: TOptions[number]) => void;
  filter?: TOptions[number];
};

function FilterBar<T extends string[]>(props: FilterBarProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={(value) => {
          props.onChange(value);
        }}
        value={props.filter}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={
              <div className="flex items-center gap-2">
                <FilterIcon className="w-6 h-6 stroke-current" />
                <span>Filtrar</span>
              </div>
            }
            className="rounded-xl max-w-24 transition duration-300 hover:bg-gray-100 flex items-center"
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={ROLES["ADMIN"]}>Administrador</SelectItem>
            <SelectItem value={ROLES["USER"]}>Usuario</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {props.filter !== "" && <XIcon onClick={() => props.onChange("null")} />}
    </div>
  );
}

type SortBarProps = {
  onChange: (sort: string) => void;
  sort?: string;
};

function SortBar(props: SortBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={props.onChange} value={props.sort}>
        <SelectTrigger>
          <SelectValue
            placeholder={
              <div className="flex">
                <ArrowUpDown className="w-5 h-5" />
                <span>Ordenar</span>
              </div>
            }
            className="rounded-xl max-w-32 transition duration-300 hover:bg-gray-100 flex items-center gap-1"
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="createdAt">Por fecha de creación</SelectItem>
            <SelectItem value="username">Orden alfabético (A-Z)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {props.sort !== "" && <XIcon onClick={() => props.onChange("null")} />}
    </div>
  );
}
