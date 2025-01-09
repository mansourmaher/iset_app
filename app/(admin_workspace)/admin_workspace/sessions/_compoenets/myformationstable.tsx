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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, PlusCircle, Recycle, TableCellsSplit, Trash } from "lucide-react";
import SessionTrainingDialog from "@/app/(espace_trainer)/_compoenets/sessionmodal";
import { handelDeletesession } from "@/actions/session/session";
import Deletesession from "./deletesession";
import Link from "next/link";
import { format } from "date-fns";

export type SessionData = {
  id: string;
  title: string; // Session title
  startDate: string; // Start date
  endDate: string; // End date
  trainingTitle: string; // Training title
};
const handelDelete = async (id: string) => {
  await handelDeletesession(id);
};

export const columns: ColumnDef<SessionData>[] = [
  {
    accessorKey: "title",
    header: "Session Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "trainingTitle",
    header: "Training Title",
    cell: ({ row }) => <div>{row.getValue("trainingTitle")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue("startDate")), "PPP")}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue("endDate")), "PPP")}</div>
    ),
  },

  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-6 items-center">
        <Link href={`/admin_workspace/sessions/${row.getValue("id")}/planning`}>
          <Button variant={"outline"} size="sm" className="space-x-2">
            <TableCellsSplit className="w-4 h-4" />
            <span>Planning</span>
          </Button>
        </Link>

        <SessionTrainingDialog id={row.getValue("id")} />
        <Link href={`/admin_workspace/sessions/${row.getValue("id")}`}>
          <Button variant="green" className="space-x-2" size="sm">
            <Recycle className="w-4 h-4" />
            <span>Edit</span>
          </Button>
        </Link>
        <Deletesession id={row.getValue("id")} />
      </div>
    ),
  },
];

interface DataTableDemoProps {
  sessions: SessionData[];
}

export function SessionTableForAdmin({ sessions }: DataTableDemoProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: sessions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
        pageSize: 5, // Display only 2 rows per page
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
