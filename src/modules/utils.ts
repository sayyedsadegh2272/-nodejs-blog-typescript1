import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { error } from "console";
import { Algorithm, sign } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import { jwtGeneratorPayloadDTO } from "../types/public.types";
const AccessTokenSecretKey = "55916731F97BE2EB3B4AAA46963D186D7C145287"
export function HashString(data: string): string {
    const salt : string = genSaltSync(10);
    const HashedString: string = hashSync(data , salt);
    return HashedString
}
export function compareHashString (data: string , encrypted : string) : boolean {
    return compareSync(data , encrypted)
}
export  async function jwtGenerator (payload : jwtGeneratorPayloadDTO) : Promise<void>{
    const {id} = payload;
    const user = await UserModel.findById(id)
    if(!user) throw {status: 404, message: "notFoundUser"}
    const expiresIn = new Date().getTime() + (1000 * 60 * 60 * 24)//1day
    const algorithm : Algorithm = "HS512"
    sign(payload , AccessTokenSecretKey , {expiresIn , algorithm } , async (error , token) => {
        if(!error && token){
            user.accessToken = token
            await user.save()
        }
    })
}
export function errorHandler(errors : any[]){
    let errorTexts : string[] = []
    for (const errorItem of errors){
        errorTexts = errorTexts.concat(errorItem.constraints)
    }
    return errorTexts
}