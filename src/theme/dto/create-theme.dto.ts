import {ApiProperty} from "@nestjs/swagger";

export class CreateThemeDto{
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly imageUrl: string;
}