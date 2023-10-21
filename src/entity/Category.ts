import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: string

    @OneToMany(
        ()=>Post,
        (post) => post.category
    )
    posts: Post[]

    @Column()
    name:string

}
