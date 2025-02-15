"use client";
import { ICustomer } from "@/interfaces/customer.interface";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Link from "next/link";
import { RootTable } from "@/components/common/table/root-table";
import { useAppSelector } from "@/store/hooks";
import LoaderWrapper from "@/components/common/loadingWrappers/loader-wrapper";
const customerColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "firstName",
    header: "Nombre",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "lastName",
    header: "Apellido",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    meta: {
      filterVariant: "select",
      filterType: "customers",
    },
    enableColumnFilter: false,
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "phone",
    header: "Celular",
    size: 120,
    cell: ({ getValue }) => <p>{getValue<string>()}</p>,
  },
  {
    accessorKey: "Appointments",
    header: "Turnos Agendados",
    size: 100,
    cell: ({ getValue }) => (
      <div className="size-10 border flex items-center justify-center rounded-full bg-muted mx-auto p-0">
        <p className="mx-auto text-center">{getValue<[]>().length}</p>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "",
    size: 50,
    cell: ({ row, getValue }) => (
      <Link
        className="bg-secondary text-center text-primary hover:bg-sky-100 transition-all duration-150  flex  justify-center p-1 rounded-md  text-xs font-semibold "
        href={`/dashboard/customers/${row.original.id}`}
      >
        detalles
      </Link>
    ),
  },
];
export default function CustomerTable() {
  const { loading, customers, fetched } = useAppSelector((s) => s.customers);

  return (
    <LoaderWrapper loading={loading && !fetched} type="customers">
      <RootTable
        columns={customerColumns}
        data={customers}
        tableType="customers"
      />
    </LoaderWrapper>
  );
}
