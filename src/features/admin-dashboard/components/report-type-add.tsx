import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReportType, saveReportType } from "../services/report-types";
import { AxiosError } from "axios";

const ReportTypeSchema = z.object({
  report_type_id: z.string().optional(),
  name: z.string().nonempty({ message: "El nombre es requerido." }),
  description: z.string().nonempty({ message: "La descripción es requerida." }),
});

export function ReportTypeAdd(props: {
  reportType?: ReportType;
  buttonTitle: string;
  buttonVariant?: "default" | "outline" | "secondary";
}) {
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ReportTypeSchema>>({
    defaultValues: {
      report_type_id: undefined,
      name: "",
      description: "",
    },
    resolver: zodResolver(ReportTypeSchema),
  });

  useEffect(() => {
    if (props.reportType) {
      form.reset(props.reportType);
    }
  }, []);

  async function onSubmit(data: z.infer<typeof ReportTypeSchema>) {
    try {
      const response = await saveReportType(data);
      console.log({ response });
      queryClient.refetchQueries({
        queryKey: ["report-types"],
        type: "all",
      });
      setOpenModal(false);
      form.reset();
      form.clearErrors();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.code);
      if (error.code === "ERR_NETWORK") {
        form.setError("name", {
          message: "Error de conexión, intente nuevamente más tarde.",
        });
      }
      if (error.response?.status === 404) {
        form.setError("name", { message: "" });
      }
    }
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant={props.buttonVariant}>{props.buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo tipo de reclamo</DialogTitle>
          <DialogDescription>Ingrese los valores dispuestos.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de reclamo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombre del tipo de reclamo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del tipo de reclamo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descripción del tipo de reclamo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      form.clearErrors();
                      form.reset();
                    }}
                    variant="secondary"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button disabled={form.formState.isSubmitting} type="submit">
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
