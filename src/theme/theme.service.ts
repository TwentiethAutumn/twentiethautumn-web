import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Theme} from "./entities/theme.entity";
import {CreateThemeDto} from "./dto/create-theme.dto";

@Injectable()
export class ThemesService{
    constructor(
        @InjectRepository(Theme)
        private themesRepository: Repository<Theme>,
    ) {}

    async findAll(): Promise<Theme[]> {
        return await this.themesRepository.find();
    }

    async findOne(id: number): Promise<Theme | null> {
        const theme = await this.themesRepository.findOne({
            relations: {
                posts: {
                    author: true,
                }
            },
            where: {
                id: id,
            }
        });
        if (!theme) {
            return null;
        }
        return theme;
    }

    async create(dto: CreateThemeDto): Promise<void> {
        const {title, imageUrl} = dto;
        let newTheme = new Theme();

        newTheme.title = title;
        newTheme.imgUrl = imageUrl;
        newTheme.posts = [];

        await this.themesRepository.save(newTheme);
    }

    async remove(id: number): Promise<void> {
        await this.themesRepository.delete(id);
    }
}