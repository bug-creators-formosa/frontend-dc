import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteReport } from "../services/user-reports";

export default function DeleteButton({ report_id }: { report_id: string }) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteReport,
    mutationKey: ["reports", "delete", report_id],
  });
  const [show, setShow] = useState(false);
  const client = useQueryClient();

  const handleDelete = async (report_id: string) => {
    await mutateAsync({ report_id });
    await client.invalidateQueries({
      queryKey: ["user", "reports"],
    });
  };
  return (
    <>
      <Dialog open={show} modal={true} onOpenChange={(open) => setShow(open)}>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            onClick={() => setShow(true)}
            disabled={isPending}
          >
            Eliminar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              ¿Estás seguro de que desea eliminar el reclamo?
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setShow(false);
                }}
                variant="secondary"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={isPending}
              type="submit"
              variant="destructive"
              onClick={() => {
                handleDelete(report_id);
                setShow(false);
              }}
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
