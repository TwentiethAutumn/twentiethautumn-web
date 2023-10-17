import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly text: string;

    @ApiProperty()
    readonly authorId: number;

    @ApiProperty()
    readonly themeId: number;
}