import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Post} from "../../post/entities/post.entity";
import {User} from "../../user/entities/user.entity";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 512})
    text: string;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({name: "authorId"})
    author: User;

    @Column()
    authorId: number;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({name: "postId"})
    post: Post;

    @Column()
    postId: number;
}