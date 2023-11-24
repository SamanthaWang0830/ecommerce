import prismadb from "@/lib/prismadb"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import OrderList from "./components/orderList"

const OrderPage=async({params}:{params:{storeId: string}})=>{

    const orders=await prismadb.order.findMany({
        where:{
            storeId: params.storeId
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        },
        orderBy:{
            createAt:'desc'
        }
    }) 

    return (
            
                <Table className="flex flex-col">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-medium">Order ID</TableHead>
                            <TableHead className="font-medium">Phone</TableHead>
                            <TableHead className="font-medium">Address</TableHead>
                            <TableHead className="font-medium">Total Price</TableHead>
                            <TableHead className="font-medium">isPaid</TableHead>
                            <TableHead className="font-medium">OrderItems Detail</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <OrderList orders={orders}/>
                    </TableBody>
                </Table>
    )
}

export default OrderPage