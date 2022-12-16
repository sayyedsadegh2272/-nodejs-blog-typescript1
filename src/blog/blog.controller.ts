import { plainToClass } from "class-transformer";
import { NextFunction, Request, response, Response } from "express";
import { Controller, Delete, Get, Post } from "../decorators/router.decorators";
import { findDoc } from "../types/public.types";
import { BlogIdDto, CrateBlogDto } from "./blog.dto";
import { BlogService } from "./blog.service";
import { IBlog } from "./blog.type";

const blogService : BlogService = new BlogService()
@Controller("/blog")
export class BlogController {
    @Post()
    async createBlog(req : Request, res:Response, next: NextFunction){
        try {
            const blogDto : CrateBlogDto = plainToClass(CrateBlogDto , req.body)
            const blog : IBlog = await blogService.create(blogDto)
            return response.status(201).json({
                statusCode : 201,
                message : "created",
                data : {blog}
            })
        } catch (error) {
            error
        }
    }
    @Get()
    async GetAllBlog(req : Request, res:Response, next: NextFunction){
        try {
            const blogs : IBlog[] = await blogService.fetchAll()
            return res.status(200).json({
                statusCode : 200,
                data : {
                    blogs
                }
            })
        } catch (error) {
            error
        }
    }
    @Get("/find/:id")
    async GetBlogByID(req : Request, res:Response, next: NextFunction) {
        try {
            const blogDto : BlogIdDto = plainToClass(BlogIdDto , req.params)
            const blog : findDoc<IBlog> = await blogService.fetchByID(blogDto)
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    @Delete("/delete/:id")
    async RemoveBlogByID(req: Request, res: Response, next: NextFunction) {
        try {
            const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params)
            const message: string = await blogService.removeByID(blogDto);
            return res.status(200).json({
                statusCode: 200,
                message
            })
        } catch (error) {
            next(error)
        }
    }
}