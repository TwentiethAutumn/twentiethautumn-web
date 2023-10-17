import {Controller, Get, Param, Render, UseInterceptors} from '@nestjs/common';
import {AppService} from './app.service';
import {Theme} from "./theme/entities/theme.entity";
import {PageLoadTime} from "./page-load-time";
import {Post} from "./post/entities/post.entity";

@Controller()
@UseInterceptors(new PageLoadTime())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("home")
  async indexView(){
    const response = await fetch(process.env.ORIGIN + '/themes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      }
    });

    const data = await response.json();
    console.log(data);
    console.log(response.status);
    console.log(response.ok);
    if (response.ok) {
      const themes: [Theme] = data;

      const mappedThemes = themes.map(function (theme) {
        return {
          link: 'theme/' + theme.id,
          image: theme.imgUrl,
          title: theme.title,
        };
      });

      return { mappedThemes };
    }

    return {};
  }

  @Get('/theme/:id')
  @Render('theme')
  async themeView(@Param('id') id: number) {
    const response = await fetch(
        process.env.ORIGIN + '/themes/' + id,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        },
    );

    const data = await response.json();

    let title: string;
    let posts: Post[];

    if (response.ok) {
      const theme: Theme = data;

      title = theme.title;
      posts = theme.posts;
    }

    return { title, posts, id: id };
  }

  @Get('/post/:id')
  @Render('post')
  async postView(@Param('id') id: number) {
    const response = await fetch(process.env.ORIGIN + '/posts/' + id, {
      method: 'GET',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });

    const data = await response.json();

    if (response.ok) {
      const post: Post = data;
      return { post };
    }

    return {};
  }

  @Get('/create-post/:id')
  @Render('create-post')
  createPostView(@Param('id') id: number) {
    return { id: id };
  }

  @Get('/about')
  @Render('about')
  aboutView() {
    return {};
  }

  @Get('/sign-in')
  @Render('sign-in')
  signInView() {
    return {};
  }
}


