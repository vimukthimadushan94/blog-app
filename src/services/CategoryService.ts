import { Service } from "typedi";
import { CategoryRepository } from "../repository/CategoryRepository";
import { validate } from "class-validator";
import { Category } from "../entity/Category";

@Service()
export class CategoryService{

    public categoryRepo

    public constructor(){
        this.categoryRepo = CategoryRepository
    }
    
    async getAllCategories(){
        const categories = await this.categoryRepo.find()
        return categories
    }

    async createCategory(data){
        try{
            const category = new Category()
            category.name = data.name
            const errors = await validate(category)
            console.log(errors.length)
            if(errors.length > 0){
                return errors
            }else{
                const newCategory = await this.categoryRepo.save(data)
                return newCategory
            }
            
        }catch(errors){
            throw new Error(errors)
        }
    }

    async deleteCategory(id){
        try{
            const category = await this.categoryRepo.findOneBy({id:id});
            const response = await this.categoryRepo.delete(category);
            return response;
        }catch(errors){
            throw new Error(errors)
        }
        
    }
}