import { Body, Delete, Get, JsonController, Param, Post, Req, Res, UseBefore } from "routing-controllers";
import Container, { Service } from "typedi";
import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { CheckAuth } from "../middlewares/CheckAuth";

@Service()
@JsonController()
// @UseBefore(CheckAuth)
export class CategoryController{
    private categoryService

    public constructor(){
        this.categoryService = Container.get(CategoryService)
    }

    @Get('/category')
    async getAll(@Res() res: Response){
        const categories = await this.categoryService.getAllCategories()
        if(categories){
            return res.status(200).json(categories)
        }

        return res.status(404).json({message:'Couldnt found any categories'})

    }

    @Post('/category')
    async create(@Body() category, @Res() res: Response){
        const newCategory = await this.categoryService.createCategory(category);
        return res.status(200).json(newCategory)
    }

    @Delete('/category/:id')
    async deleteCategory(@Param('id') id:number,@Res() res:Response){
        
        const response = await this.categoryService.deleteCategory(id);
        return res.status(200).json(response);
    }

}