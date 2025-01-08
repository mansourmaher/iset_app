"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  File,
  MoreHorizontal,
  Plus,
  Recycle,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { changeStatusOfuser, getAllFormateurs } from "@/actions/admin/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getAllTrainer } from "@/actions/trainer/trainer";

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  number: string;
  cinNumber: string;
  photo: string;
  cv: string;
  role: string;
  active: boolean;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const photo = row.original.photo;
      const email = row.original.email;
      return (
        <div className="flex items-center">
          <Avatar className="rounded-full cursor-pointer w-12 h-12">
            <AvatarImage src={photo || ""} alt="User profile" />
            <AvatarFallback>{email[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {row.getValue("name")}
            </div>
            <div className="mt-1 text-gray-500">{email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "number",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.getValue("number")}</div>,
  },
  {
    accessorKey: "cinNumber",
    header: "CIN Number",
    cell: ({ row }) => <div>{row.getValue("cinNumber")}</div>,
  },

  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue("active") ? (
          <Badge variant="yellow" className="">
            Active
          </Badge>
        ) : (
          <Badge variant="slate" className="">
            Inactive
          </Badge>
        )}
      </div>
    ),
  },

  {
    id: "actiive",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Link href={`/admin_workspace/trainer/${row.original.id}`}>
          <Button
            variant={"green"}
            className="flex items-center space-x-2"
            size="sm"
          >
            <Recycle className="h-4 w-4 text-white" />

            <span className="">Edit</span>
          </Button>
        </Link>
        <Button
          variant={row.getValue("active") ? "destructive" : "primary"}
          size="sm"
          onClick={() => handleEdit(row.original)}
          className="flex items-center space-x-2"
        >
          {row.getValue("active") ? "Deactivate" : "Activate"}
        </Button>
      </div>
    ),
  },
];

const handleEdit = async (user: User) => {
  await changeStatusOfuser(user.id);
  window.location.reload();

  // Add your edit logic here (e.g., open a modal or navigate to an edit page)
};

const handleDelete = (userId: string) => {
  console.log("Delete user with ID:", userId);
  // Add your delete logic here (e.g., API call to delete the user)
};

interface DataTableDemoProps {
  response: Awaited<ReturnType<typeof getAllTrainer>>;
}

export function StudentTable({ response }: DataTableDemoProps) {
  const users = response.user;
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    // @ts-ignore
    data: users,
    // @ts-ignore
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          variant={"primary"}
          size={"sm"}
          onClick={() => router.push("/admin_workspace/trainer/add")}
        >
          <Plus className="h-4 w-4 text-white" />
          Add trainer
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
