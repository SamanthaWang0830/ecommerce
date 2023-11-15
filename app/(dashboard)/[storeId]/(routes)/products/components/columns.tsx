"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cellAction"


export type ProductColumn = {
  id: string
  name: string;
  price: string;
  category: string;
  createdAt: string;
  isFeatured: boolean;
  stockOfSmallSize: Number;
  stockOfMediumSize:Number;
  stockOfLargeSize: Number;
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "stockOfSmallSize",
    header: "Stock- S",
  },
  {
    accessorKey: "stockOfMediumSize",
    header: "Stock- M",
  },
  {
    accessorKey: "stockOfLargeSize",
    header: "Stock- L",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:'actions',
    cell:({row})=><CellAction data={row.original}/>
  }
]
