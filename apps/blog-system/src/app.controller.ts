import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlogSystemService } from './app.service';
import { createBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class AppController {
  constructor(private readonly blogSystemService: BlogSystemService) {}

  @Get()
  getHello(): string {
    return this.blogSystemService.getHello();
  }

  //创建博客
  @Post('create-blog')
  async createBlog(@Body() createBlog: createBlogDto) {
    await this.blogSystemService.createBlog(createBlog, 1);
    return '创建成功';
  }

  //修改博客
  @Post('update-blog')
  updateBlog(): string {
    return '修改成功';
  }

  //删除博客
  @Post('delete-blog')
  deleteBlog(): string {
    return '删除成功';
  }

  //查看博客
  @Post('search-blog')
  searchBlog(): string {
    return '';
  }

  //博客详情
  @Post('blog-detail')
  blogDetail(): string {
    return '';
  }
}
