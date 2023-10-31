import 'reflect-metadata';
import { createExpressServer } from "routing-controllers"
import { AppDataSource } from "./data-source"
import { PostsController } from './controllers/PostsController';
import { datasource } from './config/datasource';

AppDataSource.initialize().then(async () => {
    console.log('Database Connected...')
}).catch(error => console.log('General Error '+error))



const app = createExpressServer({
    routePrefix:'/api',
    controllers: [
        PostsController
    ]
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});

