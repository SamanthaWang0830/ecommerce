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
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
  
      const billboard = await prismadb.billboard.findUnique({
        where: {
          storeId: params.storeId
        }
      });
    
      return NextResponse.json(billboard);
    } catch (error) {
      console.log('[BILLBOARDS_GET]', error);
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
        const {label, imageUrl}=body
        if(!userId){
            return new NextResponse('Unauthenticated', {status:401})
        }
        if(!label){
            return new NextResponse('Label is required', {status:400})
        }
        if(!imageUrl){
            return new NextResponse('ImageUrl is required', {status:400})
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

        const billboard= await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId: params.storeId
            }
        })
        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_POST]", error)
        return new NextResponse('Internal error', {status:500})
    }
}

