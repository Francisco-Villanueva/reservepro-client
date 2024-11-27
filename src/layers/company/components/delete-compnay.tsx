"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { ICompany } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useCreatingFetch from "@/app/hooks/useCreatingFetch";
import { AxiosResponse } from "axios";
export function DeleteCompany({ company }: { company: ICompany }) {
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { deleteCompany } = useCreatingFetch();
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteCompany(company.id);
      console.log("RES", res);
      toast({
        title: "Sucursal elimnada!",
      });
      router.push("/dashboard/company");
    } catch (error) {
      console.log("errrer", error);
      toast({
        title: `Error al elimnar surcursal ${company.name}`,
        // @ts-ignore
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"destructive"} className="flex items-center gap-2">
          <span>Eliminar</span>
          <TrashIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            ¿Seguro que desea eliminar la sucursal {company.name} ?
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente la
            sucursal y eliminará sus datos de nuestros servidores.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 justify-end  ">
          <Button
            size={"sm"}
            variant={"destructive"}
            isLoading={deleting}
            onClick={handleDelete}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
