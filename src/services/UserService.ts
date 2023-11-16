import { Service } from "typedi";
import { UserRepository } from "../repository/UserRepository";
import { validate } from "class-validator";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';

@Service()
export class UserService{
    private userRepo
    private secretKey:string = '1234'

    constructor(){
        this.userRepo = UserRepository
    }

    async createUser(data){

        try{
        
            const user = this.userRepo.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                age: data.age,
                avatar_path: data.avatar_path,
                password: data.password
            })

            const newUser = await this.userRepo.save(user)

            //create jwt token
            const options: jwt.SignOptions = {
                expiresIn: '72h',
            }
    
            const token = jwt.sign(data,this.secretKey,options);
            newUser.token = token
            console.log(token)
            return newUser
            
        }catch(error){
            throw new Error(error)
        }
        
    }

    async loginUser(request) {
        if(!request.email || !request.password){
            throw new Error('Please enter valid email or password')
        }

        const user = await this.userRepo.findOneBy({email:request.email})
        if(!user){
            throw new Error("User Not found")
        }

        const result = await bcrypt.compare(request.password,user.password);
        if(!result){
            throw new Error("Invalid Credentials")
        }

        const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, {
            expiresIn: '72h', // Token expiration time
          });
        
        user.token = token
        return user
        
    }
}