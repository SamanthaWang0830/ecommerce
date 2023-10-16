"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams,useRouter } from "next/navigation"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/dataTable"
import { ApiList } from "@/components/ui/apiList"


interface SizeProps{
    data: SizeColumn[]
}
export const SizeClient: React.FC<SizeProps>=({data})=>{
    const router= useRouter()
    const params= useParams()
    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Manage Sizes"
                />
                <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>

            <Separator/>

            <DataTable columns={columns} data={data} searchKey="name"/>

            <Heading title="API" description="API calls for Size"/>

            <Separator/>

            <ApiList
                entityIdName='sizeId'
                entityName='sizes'
            />
        </>
    )
}