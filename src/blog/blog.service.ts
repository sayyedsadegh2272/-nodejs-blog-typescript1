import { validateSync } from "class-validator";
import { errorHandler } from "../modules/utils";
import { findDoc } from "../types/public.types";
import { BlogIdDto, CrateBlogDto } from "./blog.dto";
import { BlogModel } from "./blog.model";
import { IBlog } from "./blog.type";

export class BlogService {
    async create (blogDto : CrateBlogDto) : Promise<IBlog>{
        const errors = validateSync(blogDto);
        const checkedErrors = errorHandler(errors)
        if(checkedErrors.length > 0 ) throw {status: 400 , errors : checkedErrors , message: "validation Error"}
        const blog : IBlog = await BlogModel.create(blogDto)
        return blog
    }
    async fetchAll() : Promise<IBlog[]>{
        const blogs: IBlog[] = await BlogModel.find({});
        return blogs
    }
    async fetchByID(blogId : BlogIdDto) : Promise<findDoc<IBlog>> {
        const blog : findDoc<IBlog> = await BlogModel.findById(blogId.id)
        if(!blog) throw {status: 404, message: "notFound Blog"}
        return blog
    }
    async removeByID(blogId : BlogIdDto) : Promise<string>{
        const blog : findDoc<IBlog> = await this.fetchByID(blogId)
        const deleteResult : any = await BlogModel.deleteOne({_id : blogId.id})
        if(deleteResult.deleteCount > 0) return "deleted blog successfuly";
        return "error: cannot remove blog"
    }
}