import { Body, Get, JsonController, Post, Req, Res } from "routing-controllers";
import Container, { Service } from "typedi";
import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";
import { Category } from "../entity/Category";

@Service()
@JsonController()
export class CategoryController{
    private categoryService

    public constructor(){
        this.categoryService = Container.get(CategoryService)
    }

    @Get('/category')
    async getAll(@Res() res: Response){
        const categories = await this.categoryService.getAllCategories()
        if(categories){
            return res.status(200).json({data:categories})
        }

        return res.status(404).json({message:'Couldnt found any categories'})

    }

    @Post('/category')
    async create(@Body() category, @Res() res: Response){
        const newCategory = await this.categoryService.createCategory(category);
        return res.status(200).json({data:newCategory})
    }

}