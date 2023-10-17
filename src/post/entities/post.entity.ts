import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {User} from "../../user/entities/user.entity";
import {Theme} from "../../theme/entities/theme.entity";
import {Comment} from "../../comment/entities/comment.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 64})
    title: string;

    @Column("varchar", {length: 512})
    text: string;

    @Column({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name: 'authorId'})
    author: User;

    @Column()
    authorId: number;

    @ManyToOne(() => Theme, (theme) => theme.posts)
    @JoinColumn({name: 'themeId'})
    theme: Theme;

    @Column()
    themeId: number;
}