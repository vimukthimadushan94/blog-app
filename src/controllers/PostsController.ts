import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";
import { BadRequestError, Body, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
import Container, { Inject, Service } from 'typedi';
import { PostService } from '../services/PostsService';
import { Post as BlogPost } from '../entity/Post';


@Service()
@JsonController()
export class PostsController{
    private postService;

    public constructor(){
        this.postService = Container.get(PostService)
    }
   

    @Get('/posts')
    async getAll(@Req() req: Request, @Res() res: Response) {
        const post = await this.postService.getAllPosts()
        return res.send(post)
        
    }

    @Post('/posts')
    async create(@Body() post: BlogPost,@Res() res:Response){
        const blogPost = await this.postService.create(post)
        if(blogPost){
            return res.status(200).json({payload:blogPost})
        }else{
            return res.status(404).json({message:'Please enter valid category'})
        }
        
    }

    @Get('/posts/:id')
    async getPostById(@Param('id') id:number){
        const blogPost = await this.postService.getPostById(id)
        return blogPost
    }

    @Put('/posts/:id')
    async updatePost(@Param('id') id:number, @Body() post:BlogPost, next: NextFunction){
        try{
            const blogPost = await this.postService.updatePost(id,post)
            return blogPost
        }catch(err){
            console.log("errrorrrrrr")
            throw new Error("Something went rongs sonali");
        }
        
    }
}