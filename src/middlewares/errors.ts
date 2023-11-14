import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";

@Middleware({type:"after"})
export class ErrorHandler implements ExpressErrorMiddlewareInterface{
    error(error: any, request: any, response: any, next: (err: any) => any){
        console.log('new error custom')
        response.status(500).json({ error: error.message });
    }
}