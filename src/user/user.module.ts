import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Module} from "@nestjs/common";
import {UsersService} from "./user.service";
import {UsersController} from "./user.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}