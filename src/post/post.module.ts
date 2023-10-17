import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostsController} from "./post.controller";
import {Post} from "./entities/post.entity";
import {PostsService} from "./post.service";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}