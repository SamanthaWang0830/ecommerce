"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { OrderColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/dataTable"


interface OrderProps{
    data: OrderColumn[]
}
export const OrderClient: React.FC<OrderProps>=({data})=>{
    return(
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manag orders"
            />

            <Separator/>

            <DataTable columns={columns} data={data} searchKey="products"/>
        </>
    )
}