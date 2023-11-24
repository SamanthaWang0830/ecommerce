"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams,useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/dataTable"
import { ApiList } from "@/components/ui/apiList"


interface BillBoardProps{
    data: BillboardColumn[]
}
export const BillboardClient: React.FC<BillBoardProps>=({data})=>{
    const router= useRouter()
    const params= useParams()
    return(
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboard`}
                    description="Manage"
                />
                <Button 
                    onClick={()=> router.push(`/${params.storeId}/billboard/new`)}
                    disabled={data.length==1}
                >
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>

            <Separator/>

            <DataTable columns={columns} data={data} searchKey="label"/>

            <Heading title="API" description="API calls for Billboard"/>

            <Separator/>

            <ApiList
                entityIdName='billboardId'
                entityName='billboard'
            />
        </>
    )
}