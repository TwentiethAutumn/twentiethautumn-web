import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Post} from "../../post/entities/post.entity";

@Entity()
export class Theme {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 128})
    title: string;

    @Column("varchar", {length: 512})
    imgUrl: string;

    @OneToMany(() => Post, (post) => post.theme)
    posts: Post[]
}