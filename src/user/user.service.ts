import {Injectable} from "@nestjs/common";
import { Repository } from 'typeorm';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
       private usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({id});
        if (!user) {
            return null;
        }
        return user;
    }

    async create(dto: CreateUserDto): Promise<void> {
        const {name, email, password} = dto;
        let newUser = new User();

        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.posts = [];
        newUser.comments = [];

        await this.usersRepository.save(newUser);
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}