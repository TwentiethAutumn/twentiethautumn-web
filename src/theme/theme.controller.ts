import {ApiBody, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ThemesService} from "./theme.service";
import {CreateThemeDto} from "./dto/create-theme.dto";

@ApiTags('Themes')
@Controller('themes')
export class ThemesController {
    constructor(private readonly themesService: ThemesService){
        this.themesService = themesService;
    }

    @Get()
    async findAll() {
        return await this.themesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.themesService.findOne(id);
    }

    @ApiBody({type: CreateThemeDto})
    @Post()
    async create(@Body() createThemeDto: CreateThemeDto) {
        await this.themesService.create(createThemeDto);
    }
}