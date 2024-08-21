import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Roles } from "@/features/auth/constants/roles";
import { User } from "@/features/auth/interfaces/user";

import { Button } from "@/components/shadcn/ui/button";

import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { ROLE_TO_DISPLAY } from "@/features/common/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserRoles } from "../services/users";
import { RolePills } from "./user-list";

export default function UserRoles({ user }: { user: User }) {
  return (
    <p className="flex gap-1 items-center">
      Roles: <RolePills user={user} />
      <ModalRoleSelector user={user} />
    </p>
  );
}

const roles = ["admin", "authority"] as Partial<Roles>[];
const RoleFormSchema = z.object({
  roles: z.string().array(),
});

function ModalRoleSelector({ user }: { user: User }) {
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const defaultRoles = user.user_roles.map((role) => role.name as Roles);

  const form = useForm<z.infer<typeof RoleFormSchema>>({
    defaultValues: {
      roles: defaultRoles,
    },
    resolver: zodResolver(RoleFormSchema),
  });

  async function onSubmit(data: z.infer<typeof RoleFormSchema>) {
    try {
      const response = await updateUserRoles(user.user_id, data.roles);
      console.log({ response });
      queryClient.refetchQueries({
        queryKey: ["user", user.user_id],
        type: "all",
      });
      setOpenModal(false);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.code);
      if (error.code === "ERR_NETWORK") {
        form.setError("roles", {
          message: "Error de conexión, intente nuevamente más tarde.",
        });
      }

      if (error.response?.status === 404) {
        form.setError("roles", { message: "" });
      }
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button title="Agregar rol" variant="secondary" className="shadow-md">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar o cambiar rol</DialogTitle>
          <DialogDescription>
            Selecciona un rol para agregar al usuario.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-100 space-y-6"
            >
              <FormField
                control={form.control}
                name="roles"
                render={() => (
                  <FormItem>
                    {roles.map((role) => (
                      <FormField
                        key={role}
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role + "in"}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value.some(
                                    (value) => value === role
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, role])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== role
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {ROLE_TO_DISPLAY[role]}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button
                    onClick={() => form.clearErrors()}
                    variant="secondary"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button variant="outline" type="submit">
                  Guardar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
