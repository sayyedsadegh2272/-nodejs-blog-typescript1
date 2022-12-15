import { NextFunction, Request, response, Response } from "express";
import { Controller, Get, Post } from "../decorators/router.decorators";
import { UserModel } from "../models/user.model";
import { HashString } from "../modules/utils";
@Controller('/auth')
export class AuthController{
    @Post()
    async register(req: Request, res:Response, next: NextFunction){
        try {
            const {username , password , fullname} = req.body
            const newPassword = HashString(password)
            const existUser = await UserModel.findOne({username});
            if(existUser) throw {status : 400 , message : "this username already exist"}
            const user = await UserModel.create({
                username,
                password : newPassword,
                fullname
            })
            return response.send(user)
        } catch (error) {
            next(error)
        }
    }
}