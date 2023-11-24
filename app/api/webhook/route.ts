import Stripe from "stripe";
import {headers} from 'next/headers';
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req:Request) {
    // this is a web hook
    const body= await req.text()
    const signature= headers().get("Stripe-Signature") as string

    let event: Stripe.Event


    try{
        event= stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch(error:any){
        return new NextResponse(`Webhook Error: ${error.message}`, {status:400})
    }

    const session= event.data.object as Stripe.Checkout.Session
    const address= session?.customer_details?.address
    const addressComponent=[
            address?.line1,
            address?.line2,
            address?.city,
            address?.state,
            address?.postal_code,
            address?.country
    ]
    const addressString= addressComponent.filter((c)=>c!==null).join(', ')

    console.log('this is a testing before the address string')
    console.log(addressString)
    

    console.log(event.type)


    
    if(event.type=='checkout.session.completed'){
        
        
        const order = await prismadb.order.update({
            where:{
                id: session?.metadata?.orderId
            },
            data:{
                isPaid:true,
                address:addressString,
                phone:session?.customer_details?.phone || ''
            },
            include:{
                orderItems:true
            }
        })

        for(let orderItem of order.orderItems){
            const product = await prismadb.product.findUnique({
                where:{
                    id: orderItem.productId
                }
            })

            // Update the product with the new stock values
            let updatedStock
            if(orderItem.size.toLowerCase()=='s'){
                updatedStock= product?.stockOfSmallSize!- orderItem.num

                
                await prismadb.product.update({
                    where: {
                        id: orderItem.productId,
                    },
                    data: {
                        stockOfSmallSize: updatedStock,
                    },
                });
            }else if(orderItem.size.toLowerCase()=='m'){
                updatedStock= product?.stockOfMediumSize!- orderItem.num

                await prismadb.product.update({
                    where: {
                        id: orderItem.productId,
                    },
                    data: {
                        stockOfMediumSize: updatedStock,
                    },
                });
            }else{
                updatedStock=product?.stockOfLargeSize!- orderItem.num

                await prismadb.product.update({
                    where: {
                        id: orderItem.productId,
                    },
                    data: {
                        stockOfLargeSize: updatedStock,
                    },
                });
            }

            // if every size stock of this product is equal to 0, then archive it.
            if(product?.stockOfLargeSize==0 && product.stockOfMediumSize==0 && product.stockOfSmallSize==0){
                await prismadb.product.update({
                    where: {
                        id: orderItem.productId,
                    },
                    data: {
                        isArchived:true
                    },
                });
            }
        }
    }

    return new NextResponse(null, {status:200})
}