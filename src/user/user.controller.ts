import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UsersService} from "./user.service";
import {User} from "./entities/user.entity";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){
        this.usersService = usersService;
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.usersService.findOne(id);
    }

    @ApiBody({type: CreateUserDto})
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        await this.usersService.create(createUserDto);
    }
}