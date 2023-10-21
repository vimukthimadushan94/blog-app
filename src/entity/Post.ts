import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Category } from "./Category"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(
        ()=> Category,
        (category)=>category.posts
    )
    category: Category

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    age: number

    @CreateDateColumn()
    created_at: Date

}
