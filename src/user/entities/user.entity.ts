import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Post} from "../../post/entities/post.entity";
import {Comment} from "../../comment/entities/comment.entity";
import {ApiProperty} from "@nestjs/swagger";

export enum UserRole{
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 40, unique: true})
    email: string;

    @Column("varchar", {length: 20})
    name: string;

    @Column("varchar", {length: 40})
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[]
}