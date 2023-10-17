import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreatePostDto} from "./dto/create-post.dto";
import {Post} from "./entities/post.entity";

@Injectable()
export class PostsService{
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async findAll(): Promise<Post[]> {
        return await this.postsRepository.find();
    }

    async findOne(id: number): Promise<Post | null> {
        const post = await this.postsRepository.findOne({
            relations: {
                comments: {
                    author: true,
                },
            },
            where: {
                id: id,
            }
        });
        if (!post) {
            return null;
        }
        return post;
    }

    async create(dto: CreatePostDto): Promise<void> {
        const {title, text, authorId, themeId} = dto;
        let newPost = new Post();

        newPost.text = text;
        newPost.authorId = authorId;
        newPost.themeId = themeId;
        newPost.title = title;
        newPost.comments = []

        await this.postsRepository.save(newPost);
    }

    async remove(id: number): Promise<void> {
        await this.postsRepository.delete(id);
    }
}