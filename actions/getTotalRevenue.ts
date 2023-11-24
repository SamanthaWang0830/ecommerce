import prismadb from "@/lib/prismadb";

export const getTotalRevenue= async(storeId: string)=>{
    const paidOrders= await prismadb.order.findMany({
        where:{
            storeId,
            isPaid:true
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    })


    let sum=0;
    for(let order of paidOrders){
        for(let orderItem of order.orderItems){
            sum+= orderItem.product.price.toNumber() * orderItem.num
        }
    }

    return sum
}