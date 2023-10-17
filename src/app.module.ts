import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { DataSource }  from "typeorm";
import * as PostgresConnectionStringParser from "pg-connection-string"
import * as process from "process";
import {User} from "./user/entities/user.entity";
import {Theme} from "./theme/entities/theme.entity";
import {Comment} from "./comment/entities/comment.entity";
import {Post} from "./post/entities/post.entity";
import {UsersModule} from "./user/user.module";
import {ThemesModule} from "./theme/theme.module";
import {PostsModule} from "./post/post.module";
import {CommentsModule} from "./comment/comment.module";

const databaseUrl: string = process.env.DATABASE_URL; // PROD
const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);
const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: connectionOptions.host,
  port: +connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  entities: [User, Theme, Comment, Post],
  synchronize: true, // not for prod
  ssl: true,
  extra: {
    rejectUnauthorized: false,
  }
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => (typeOrmOptions),
    }),
      UsersModule,
      ThemesModule,
      PostsModule,
      CommentsModule,
  ],
  controllers: [
      AppController,
  ],
  providers: [
      AppService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
