import prismadb from "@/lib/prismadb"
import { ProductClient } from "./components/client"
import { ProductColumn } from "./components/columns"
import {format} from 'date-fns'
import { formatter } from "@/lib/utils"

const BillboardPage=async({params}:{params:{storeId: string}})=>{
    const products=await prismadb.product.findMany({
        where:{
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true
        },
        orderBy:{
            createAt:'desc'
        }
    })

    const formattedProducts: ProductColumn[]=products.map((item)=>({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        category: item.category.name,
        size: item.size.name,
        price: formatter.format(item.price.toNumber()),
        createdAt: format(item.createAt, 'MMMM do, yyyy')
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts}/>
            </div>
        </div>
    )
}

export default BillboardPage