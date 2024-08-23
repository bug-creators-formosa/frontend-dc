import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import useAuth from "@/features/auth/hooks/use-auth";
import { FileInput } from "@/features/reports/componets/file-input";
import { getReportTypes } from "@/features/reports/services/report-types";
import {
  createReport,
  getOneReport,
} from "@/features/reports/services/user-reports";
import FullScreenSpinner from "@/features/ui/fullscreen-spinner";
import { resolveUrl } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../schema/report.schema";

type ReportFormProps = {
  report?: Awaited<ReturnType<typeof getOneReport>>;
};

export function ReportForm(props: ReportFormProps) {
  const {
    data: reportTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report", "types"],
    queryFn: () => getReportTypes(),
  });

  const { error: mutationError, mutateAsync } = useMutation({
    mutationKey: ["report"],
    mutationFn: createReport,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props?.report?.title ?? "",
      description: props.report?.description ?? "",
      address: props.report?.address ?? "",
      report_type_id: props.report?.type.report_type_id,
    },
  });
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!props.report) return;
    form.reset({
      title: props.report.title,
      description: props.report.description,
      address: props.report.address,
      report_type_id: props.report.type.report_type_id,
    });
  }, [props.report, form]);

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await mutateAsync(values);
    navigate(`/dashboard/reports/${isAdmin ? "admin" : "user"}`);
  }

  return (
    <>
      {mutationError && (
        <FormDescription>{mutationError.message}</FormDescription>
      )}
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título de una denuncia" {...field} />
                </FormControl>
                <FormDescription>
                  ¿Qué deseas reclamar en pocas palabras?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Una descripción del problema"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Pon detalles acerca de la problemática
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileInput
            name="image"
            label="Una imagen adjunta"
            initialUrl={
              props.report?.image_url
                ? resolveUrl(props.report?.image_url)
                : undefined
            }
            description="Pon detalles acerca de la problemática"
            placeholder="Una imagen relacionada al reclamo"
            onChange={(f) => {
              form.setValue("image", f);
            }}
          />
          <FormField
            control={form.control}
            name="report_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {reportTypes?.map((type) => {
                      return (
                        <SelectItem value={type.report_type_id}>
                          {type.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección" {...field} />
                </FormControl>
                <FormDescription>¿A qué dirección debemos ir?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isLoading}
            type="submit"
            className="w-full md:w-auto"
          >
            Enviar
          </Button>
        </form>
      </Form>
    </>
  );
}
