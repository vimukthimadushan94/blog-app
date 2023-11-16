import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import * as jwt from "jsonwebtoken";

@Middleware({type:'before'})
export class CheckAuth implements ExpressMiddlewareInterface {
    
    use(request:Request, response: Response, next: NextFunction) {
        console.log('check auth middleware')
        const token = request.headers.authorization;
        if(token){
            const bearerToken = token.slice('Bearer '.length);
            console.log(bearerToken)

            if (!bearerToken) {
            return response.status(403).json({ message: 'Token in invalid format' });
            }
        
            jwt.verify(bearerToken, '1234', (err: any, decoded: any) => {
            if (err) {
                return response.status(401).json({ message: 'Failed to authenticate token' });
            }

            next();
            });
        }
        return response.status(403).json({ message: 'Token not provided' });
    }
}