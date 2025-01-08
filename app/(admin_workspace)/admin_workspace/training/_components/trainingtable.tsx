"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, PlusCircle, Recycle, Router, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type Course = {
  id: string;
  title: string;
  description: string;
  program: string;
  duration: string;
  difficulty: string;
  tags: string[];
  category: string[];
};

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="truncate max-w-xs">{row.getValue("description")}</div>
    ),
  },

  {
    accessorKey: "duration",
    header: "Duration (mins)",
    cell: ({ row }) => <div>{row.getValue("duration")}</div>,
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => <div>{row.getValue("difficulty")}</div>,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    //@ts-ignore
    cell: ({ row }) => <div>{row.getValue("tags").join(", ")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    //@ts-ignore

    cell: ({ row }) => <div>{row.getValue("category").join(", ")}</div>,
  },
  {
    accessorKey: "program",
    header: "Program",
    cell: ({ row }) => (
      <a
        href={row.getValue("program")}
        target="_blank"
        rel="noopener noreferrer"
      >
        <File className="h-6 w-6 text-blue-400" />
      </a>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Link href={`/admin_workspace/training/addsession/${row.original.id}`}>
          {" "}
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2"
          >
            <PlusCircle className="h-4 w-4 " />
            <span>Add new session</span>
          </Button>
        </Link>
        <Link href={"/admin_workspace/training/" + row.original.id}>
          <Button
            variant="green"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Recycle className="h-4 w-4 " />
            <span>Edit</span>
          </Button>
        </Link>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
          className="flex items-center space-x-2"
        >
          <Trash className="h-4 w-4 " />
          <span>Delete</span>
        </Button>
      </div>
    ),
  },
];

const handleDelete = (courseId: string) => {};

interface TrainingTableProps {
  courses: Course[];
}

export function TrainingTable({ courses }: TrainingTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
        <Button
          className="flex items-center space-x-2"
          variant={"primary"}
          size={"sm"}
          onClick={() => {
            router.push("/admin_workspace/training/add");
          }}
        >
          <PlusCircle className="h-4 w-4 " />
          <span>Add new training</span>
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
