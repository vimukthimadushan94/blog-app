import 'reflect-metadata';
import { Service } from 'typedi';
import { PostsRepository } from '../repository/PostsRepository';
import { json } from 'body-parser';
import { Post } from '../entity/Post';
import { Category } from '../entity/Category';
import { CategoryRepository } from '../repository/CategoryRepository';
import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { ErrorHandler } from '../middlewares/errors';

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
        const post =  await this.postRepo.find({
            relations: {
                category: true
            }
        })

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

    async getPostById(id:number, next:NextFunction){
        if(!id) {
            throw new Error("Id is required!");
        }
        try{
            const blogPost = await this.postRepo.findOneBy({id:id})
            if(!blogPost){
                // return {error: 'Please add a valid post id'}
                throw new Error('Please add a valid post id');
            }
            return blogPost

        }catch(error){
            throw new Error(error.message);
        }
        
    }

    async updatePost(id, data){
        const blogPost = await this.postRepo.findOneBy({id:id})
        if(!blogPost){
            throw new Error("Cannot find specific blog post")
        }

        blogPost.title = data.title;
        blogPost.description = data.description;
        await this.postRepo.save(blogPost)
        return blogPost
    }
   
}