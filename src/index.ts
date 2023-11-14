import 'reflect-metadata';
import { createExpressServer } from "routing-controllers"
import { AppDataSource } from "./data-source"
import { PostsController } from './controllers/PostsController';
import { datasource } from './config/datasource';
import { CategoryController } from './controllers/CategoryController';
import { ErrorHandler } from './middlewares/errors';

AppDataSource.initialize().then(async () => {
    console.log('Database Connected...')
}).catch(error => console.log('General Error '+error))



const app = createExpressServer({
    defaultErrorHandler:false,
    cors: true,
    routePrefix:'/api',
    controllers: [
        PostsController,
        CategoryController
    ],
    middlewares:[
        ErrorHandler
    ],
});


app.listen(8080,() => {
    console.log("Server is running on port 3000");
});

