
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const PostsRepository = AppDataSource.getRepository(Post)