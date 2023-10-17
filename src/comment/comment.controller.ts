import {ApiBody, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comment.service";

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService){
        this.commentsService = commentsService;
    }

    @Get()
    async findAll() {
        return await this.commentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.commentsService.findOne(id);
    }

    @ApiBody({type: CreateCommentDto})
    @Post()
    async create(@Body() createCommentDto: CreateCommentDto) {
        await this.commentsService.create(createCommentDto);
    }
}