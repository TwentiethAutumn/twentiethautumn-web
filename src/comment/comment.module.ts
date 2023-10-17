import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentsService} from "./comment.service";
import {CommentsController} from "./comment.controller";
import {Comment} from "./entities/comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentsService],
    controllers: [CommentsController],
})
export class CommentsModule {}