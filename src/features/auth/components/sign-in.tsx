import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/features/auth/schemas/sign-in.schema";
import { SignInParams } from "@/features/auth/services/auth";
import useAuth from "@/features/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignInParams>({
    defaultValues: {
      name: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { signIn } = useAuth();

  const onSubmit = async (values: SignInParams) => {
    try {
      await signIn(values);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.code);
      if (error.response?.status === 404) {
        setErrorMessage("Credenciales inválidas");
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
            name="name"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ingrese su contraseña" {...field} />
                </FormControl>              
                <FormMessage />
              </FormItem>
            )}
          />
         <Button disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white mt-5 w-full">Iniciar Sesión</Button>
        </form>
      </Form>
    </div>
  );
}
