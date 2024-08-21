import useAuth from "@/features/auth/hooks/use-auth";
import { SignUpParams } from "@/features/auth/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { useState } from "react";
import { signUpSchema } from "../schemas/sign-up.schema";

export default function SignUp() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<typeof signUpSchema._output>({
    resolver: zodResolver(signUpSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { signUp } = useAuth();

  const onSubmit = async (values: SignUpParams) => {
    console.log("Submitting...");
    try {
      await signUp(values);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      console.log("Hubo un error...", err);
      console.log(error.code);
      if (error.response.status === 409) {
        setErrorMessage("El usuario ya existe");
      }
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Error de conexión, intente nuevamente más tarde.");
      }

      if (error.response?.status === 401) {
        setErrorMessage("Credenciales inválidas");
      }
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          {errorMessage}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingrese su correo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repetir contraseña</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Repita su contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="border-none mt-5 w-full">
            Registrarse
          </Button>
        </form>
      </Form>
    </div>
  );
}
