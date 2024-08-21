import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { User } from "@/features/auth/interfaces/user";
import { ROLE_TO_DISPLAY } from "@/features/common/utils";
import { useNavigate } from "react-router-dom";
import UserProfileAvatar from "./user-profile-avatar";

export default function UserList(props: { users: User[] }) {
  const navigate = useNavigate();

  const handleNavigation = (user: User) => () => {
    navigate(`/dashboard/users/${user.user_id}`);
  };

  // TODO: Maybe use a ShadCN DataTable component here?
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Usuario</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.users.map((user) => {
          return (
            <TableRow key={user.user_id}>
              <TableCell className="font-medium flex items-center">
                <UserProfileAvatar user={user} />
                <span className="ml-2">{user.username}</span>
              </TableCell>
              <TableCell>
                {user.username}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="flex gap-2">
                <RolePills user={user} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="default" onClick={handleNavigation(user)}>
                  <span>Ver</span>
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function UserListSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Usuario</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(10).fill(0).map((_, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="font-medium flex items-center"></TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="w-24 h-4" />
              </TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function RolePills(props: { user: User }) {
  return props.user.user_roles.map((role) => {
    return (
      <Badge key={role.name} variant={"default"}>
        {ROLE_TO_DISPLAY[role.name]}
      </Badge>
    );
  });
}
