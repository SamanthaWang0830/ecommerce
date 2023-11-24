import prismadb from "@/lib/prismadb"
import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"
import {format} from 'date-fns'

const BillboardPage=async({params}:{params:{storeId: string}})=>{
    const billboard=await prismadb.billboard.findMany({
        where:{
            storeId: params.storeId
        }
    })

    const formattedBillboards: BillboardColumn[]=billboard.map((item)=>({
        id: item.id,
        label: item.label,
        createdAt: format(item.createAt, 'MMMM do, yyyy')
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards}/>
            </div>
        </div>
    )
}

export default BillboardPage