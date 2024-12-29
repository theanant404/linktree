import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import {z} from 'zod'
const UserNameQuerySchema=z.object({
    username:z.string()
})

export async function GET(req:Request){
    await dbConnect()
    const {searchParams} =new URL(req.url)
    try {
        
        const queryParam={
            username:searchParams.get('username')
        }
        // validate with zod
        const result=UserNameQuerySchema.safeParse(queryParam)
        // console.log(result)
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors ||[]
            return Response.json({
                message:usernameErrors?.length>0?usernameErrors.join(', '):'Invalid Query Parameters',
                success:false
            },{status:400})
        }
        const {username}=result.data
        // const username='anand'
        console.log(username)
        const user = await UserModel.aggregate([
            {
              $match: { username: username },
            },
            {
              $lookup: {
                from: 'linkcard',
                localField: 'userId',
                foreignField: 'userId',
                as: 'profile',
              },
            },
            {
              $unwind: '$profile',
            },
            {
              $project: {
                _id: 0,
                name: 1,
                email: 1,
                'profile.bio': 1,
                'profile.socialLinks': 1,
                'profile.otherLinks': 1,
                'profile.theme': 1,
                'profile.primaryColor': 1,
              },
            },
          ]);
          console.log(user)
        if(!user){
            return Response.json({
                success:false,
                message:'User Not found'
            },{status:201})
        }
       
        // console.log(userDetails)
        return Response.json({
            success:true,
            message:'Username is avlable'
        },{status:201})
    } catch (error:any) {
        console.error("Error during chacking username ",error)
        return Response.json({
            success:false,
            message:"Error during checking user name"
        },{status:500})
    }
}