'use client'

import {TableCell, TableRow} from "@/components/ui/table";
import {Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronsUpDown} from "lucide-react"
import { Button } from "@/components/ui/button"


{/* @ts-expect-error */}
const OrderList=({orders})=>{
    const [openCollapsibleIndex, setOpenCollapsibleIndex] = useState(-1)

    const handleToggleCollapsible = (index: any) => {
        setOpenCollapsibleIndex((prevIndex) => (prevIndex === index ? -1 : index));
    }

    return (
        <>
            {orders && orders.map((order:any, index:any)=>{
                const totalPrice = order.orderItems.reduce((total:any, item:any) => {
                    return total + Number(item.product.price)* item.num
                }, 0)

                return (
                    <TableRow
                        key={index}
                    >
                        <Collapsible
                            open={index=== openCollapsibleIndex}
                            onOpenChange={() => handleToggleCollapsible(index)}
                            className="space-y-2"
                            asChild
                        >
                            <>
                                <TableRow className="flex items-center">
                                    <TableCell className="text-sm font-semibold">
                                        {order.id}
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">
                                        €{totalPrice}
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">
                                        {order.phone}
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">
                                        {order.address}
                                    </TableCell>
                                    <TableCell className="text-sm font-semibold">
                                        {order.isPaid? 'True': 'False'}
                                    </TableCell>
                                    <CollapsibleTrigger asChild >
                                        <Button variant="ghost" size="sm" className="w-9 p-0 ">
                                            <ChevronsUpDown className="h-4 w-4" />
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                </TableRow>
                        
                                <CollapsibleContent className="space-y-2">
                                {
                                    order.orderItems.map((orderItem:any, index:any)=>(
                                        <TableRow key={index}>
                                            <TableCell>Name: {orderItem.product.name} </TableCell>
                                            <TableCell>Size: {orderItem.size} </TableCell>
                                            <TableCell>Number: {orderItem.num} </TableCell>
                                        </TableRow>
                                    ))
                                }
                                </CollapsibleContent>
                            </>
                        </Collapsible>
                    </TableRow>
                )
                    
            })}
        </>
    )
}
export default OrderList