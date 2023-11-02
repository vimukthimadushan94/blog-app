import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { IsNotEmpty, Length } from "class-validator";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(
        ()=>Post,
        (post) => post.category
    )
    posts: Post[]

    @Column()
    @Length(3)
    @IsNotEmpty()
    name:string

}
