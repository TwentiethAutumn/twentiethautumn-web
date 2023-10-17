import {ApiBody, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./post.service";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){
        this.postsService = postsService;
    }

    @Get()
    async findAll() {
        return await this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.postsService.findOne(id);
    }

    @ApiBody({type: CreatePostDto})
    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        await this.postsService.create(createPostDto);
    }
}