import { plainToClass } from "class-transformer"
import { NextFunction, Request, response, Response } from "express";
import { Controller, Get, Post } from "../decorators/router.decorators";
import { UserModel } from "../models/user.model";
import { IUser } from "../types/user.types";
import { RegisterDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
const authService : AuthService = new AuthService()
@Controller('/auth')
export class AuthController{
    @Post()
    async register(req: Request, res:Response, next: NextFunction){
        try {
            const registerDto : RegisterDTO = plainToClass(RegisterDTO , req.body , {excludeExtraneousValues : true})
            const user : IUser = await authService.register(registerDto)
            return response.send(user)
        } catch (error) {
            next(error)
        }
    }
}