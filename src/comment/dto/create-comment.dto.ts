import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    readonly text: string;

    @ApiProperty()
    readonly authorId: number;

    @ApiProperty()
    readonly postId: number;
}