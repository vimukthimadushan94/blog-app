import 'reflect-metadata';
import { Service } from 'typedi';
import { PostsRepository } from '../repository/PostsRepository';
import { json } from 'body-parser';
import { Post } from '../entity/Post';
import { Category } from '../entity/Category';
import { CategoryRepository } from '../repository/CategoryRepository';

@Service()
export class PostService{
    private postRepo
    private categoryRepo
    
    constructor(){
        this.postRepo = PostsRepository
        this.categoryRepo = CategoryRepository
    }

    async getAllPosts() {
        console.log('testsestss')
        const post =  await this.postRepo.find()

        return post
    }

    async create(data) {
       
        const category = await this.categoryRepo.findOneBy({id:data.categoryId})
        if(category){
            const post = new Post()
            post.title = data.title
            post.description = data.description
            post.category = category
            const newPost = await this.postRepo.save(post)
            console.log(newPost)
            return newPost
        }

        return false
        
    }
   
}