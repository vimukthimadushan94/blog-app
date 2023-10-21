import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"
import { Category } from "./entity/Category"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "blog-app",
    synchronize: true,
    logging: false,
    entities: [User,Post,Category],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
    migrationsTableName: "migrations",
})
