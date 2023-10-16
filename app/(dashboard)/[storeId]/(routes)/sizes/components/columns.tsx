"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cellAction"


export type SizeColumn = {
  id: string
  value: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:'action',
    cell:({row})=><CellAction data={row.original}/>
  }
]
