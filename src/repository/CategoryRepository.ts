
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export const CategoryRepository = AppDataSource.getRepository(Category)