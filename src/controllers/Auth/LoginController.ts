import { Body, JsonController, Post, UseAfter, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { UserService } from "../../services/UserService";
import { Response } from "express";
import { CheckAuth } from "../../middlewares/CheckAuth";

@Service()
@JsonController()
// @UseBefore(CheckAuth)
@UseAfter(CheckAuth)
export class LoginController{

    private userService;

    constructor(){
        this.userService = Container.get(UserService)
    }

    @Post('/login')
    async login(@Body() req,res: Response){
        const user = this.userService.loginUser(req)
        return user
    }

}