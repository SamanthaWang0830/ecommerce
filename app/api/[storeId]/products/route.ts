import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

//manipulate individual billboard

export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    // 不用 auth， 因为不sign-in的每一个人都应该可以看到
    try {
        const {searchParams}= new URL(req.url)
        const categoryId= searchParams.get('categoryId') || undefined
        const sizeId= searchParams.get('sizeId') || undefined
        const isFeatured= searchParams.get('isFeatured')
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }
    
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                isFeatured: isFeatured? true: undefined,
                isArchived: false 
            },
            include: {
                images: true,
                category:true
            },
            orderBy:{
                createAt:'desc'
            }
        });
        
        return NextResponse.json(products);
    } catch (error) {
      console.log('[PRODUCT_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
};

  
export async function POST(
    req: Request,
    {params}:{params:{storeId: string}}
){
    try {
        const {userId}= auth()
        const body= await req.json()
        const {name, price, categoryId, stockOfSmallSize,stockOfMediumSize,stockOfLargeSize, isFeatured, isArchived,images}=body
        if(!userId){
            return new NextResponse('Unauthenticated', {status:401})
        }
        if(!name){
            return new NextResponse('Name is required', {status:400})
        }
        if(! images || !images.length){
            return new NextResponse('Images is required', {status:400})
        }
        if(!price){
            return new NextResponse('Price is required', {status:400})
        }
        if(!categoryId){
            return new NextResponse('CategoryId is required', {status:400})
        }
        if(!params.storeId){
            return new NextResponse('StoreId is required', {status:400})
        }

        // check if this store doesn't belong to this user
        const storeByUserId= await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId:userId
            }
        })
        if(!storeByUserId){
            return new NextResponse('Unauthorized', {status:403})
        }

        const product= await prismadb.product.create({
            data:{
                name,
                price, 
                categoryId, 
                stockOfSmallSize,
                stockOfMediumSize,
                stockOfLargeSize, 
                isFeatured, 
                isArchived,
                storeId: params.storeId,
                // beacuse image is a separate model
                images:{
                    createMany:{
                        data:[
                            ...images.map((image:{url:string})=>image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log("[PRODUCT_POST]", error)
        return new NextResponse('Internal error', {status:500})
    }
}

