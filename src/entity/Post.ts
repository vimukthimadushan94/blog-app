import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BaseEntity } from "typeorm"
import { Category } from "./Category"
import { MinLength } from "class-validator"

@Entity()
export class Post extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        ()=> Category,
        (category)=>category.posts
    )
    category: Category

    @Column()
    @MinLength(5,{
        message: 'Title is too short'
    })
    title: string

    @Column()
    @MinLength(10,{
        message: 'Description is too short'
    })
    description: string

    @CreateDateColumn()
    created_at: Date

}
