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
import {UsersService} from "./user/user.service";
import {UsersModule} from "./user/user.module";
import {UsersController} from "./user/user.controller";
import {ThemesModule} from "./theme/theme.module";
import {PostsModule} from "./post/post.module";
import {CommentsModule} from "./comment/comment.module";

//const databaseUrl: string = process.env.DATABASE_URL; // PROD
/*
const databaseUrl: string = "PGPASSWORD=Eo0wCrJEJCBDld6gW7rTkEyvPKv7PWlj psql -h dpg-ck9fjlmgtj9c73ck1m10-a.frankfurt-postgres.render.com -U twentiethautumn twentiethautumn"; // DEBUG
const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);
const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: connectionOptions.host,
  port: +connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  entities: [User, Theme, Comment, Post],
  synchronize: false,
}
 */

const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'dpg-ck9fjlmgtj9c73ck1m10-a.frankfurt-postgres.render.com',
  port: 5432,
  username: 'twentiethautumn',
  password: 'Eo0wCrJEJCBDld6gW7rTkEyvPKv7PWlj',
  database: 'twentiethautumn',
  entities: [User, Theme, Comment, Post],
  synchronize: true,
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
