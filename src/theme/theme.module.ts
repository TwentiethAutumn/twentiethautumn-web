import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Theme} from "./entities/theme.entity";
import {ThemesService} from "./theme.service";
import {ThemesController} from "./theme.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Theme])],
    providers: [ThemesService],
    controllers: [ThemesController],
})
export class ThemesModule {}