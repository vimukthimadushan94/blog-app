import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, BaseEntity } from "typeorm"
import { Category } from "./Category"

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
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

}
