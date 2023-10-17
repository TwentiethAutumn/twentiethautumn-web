import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Comment} from "./entities/comment.entity";


@Injectable()
export class CommentsService{
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ) {}

    async findAll(): Promise<Comment[]> {
        return await this.commentsRepository.find({
            relations: {
                author: true,
            }
        });
    }

    async findOne(id: number): Promise<Comment | null> {
        const comment = await this.commentsRepository.findOne({
            relations: {
              author: true,
            },
            where: {id: id}
        });
        if (!comment) {
            return null;
        }
        return comment;
    }

    async create(dto: CreateCommentDto): Promise<void> {
        const {text, authorId, postId} = dto;
        let newComment = new Comment();

        newComment.text = text;
        newComment.authorId = authorId;
        newComment.postId = postId;

        await this.commentsRepository.save(newComment);
    }

    async remove(id: number): Promise<void> {
        await this.commentsRepository.delete(id);
    }
}