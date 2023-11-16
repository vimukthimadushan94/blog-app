import { Body, JsonController, Post, Req, Res, UseAfter, UseBefore } from "routing-controllers";
import Container, { Service } from "typedi";
import { UserService } from "../../services/UserService";
import { Request, Response } from "express";
import { CheckAuth } from "../../middlewares/CheckAuth";

@Service()
@JsonController()
export class UserController{
    private userService;

    constructor(){
        this.userService = Container.get(UserService)
    }

    @Post('/register')
    async create(@Body() request, @Res() response:Response){
        const user = this.userService.createUser(request);
        return user
    }
}