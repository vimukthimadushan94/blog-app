import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({nullable:false})
    email: string

    @Column()
    age: number

    @Column({nullable:true})
    avatar_path:string

    @Column()
    @IsNotEmpty({message:'Password cannot be empty'})
    password:string

    @BeforeInsert()
    async hashPassword() {
        if(this.password){
            this.password = await bcrypt.hash(this.password,10)
        }
    }

}
