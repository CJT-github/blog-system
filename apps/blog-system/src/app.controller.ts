import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogSystemService } from './app.service';
import { createBlogDto } from './dto/create-blog.dto';
import { RequireLogin, UserInfo } from '@app/common';
import { env } from 'process';
import { FileInterceptor } from '@nestjs/platform-express';
import { QiniuService } from '@app/qiniu';
import * as path from 'path';
import { createCategoryDto } from './dto/create-category.dto';

@Controller('blog')
export class AppController {
  @Inject(QiniuService)
  private qiniuService: QiniuService;

  constructor(private readonly blogSystemService: BlogSystemService) {}

  @Get()
  getHello(): string {
    return this.blogSystemService.getHello();
  }

  //创建分类
  @Post('category')
  @RequireLogin()
  async createCateGory(@Body() category: createCategoryDto) {
    return await this.blogSystemService.createCateGory(category);
  }

  //上传图片
  @Post('image')
  @RequireLogin()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 3,
      },
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.gif', '.wepb'].includes(extname)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileName = `${Date.now()}-${file.originalname}`;
    try {
      const url = await this.qiniuService.uploadFile(file.buffer, fileName);
      return { url };
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  //创建博客
  // @Body() createBlog: createBlogDto,
  @Post('create-blog')
  @RequireLogin()
  async createBlog(@UserInfo('userId') id: number) {
    console.log(env.ACCESS_KEY);
    // await this.blogSystemService.createBlog(createBlog, id);
    return '创建成功';
  }

  //修改博客
  @Post('update-blog')
  @RequireLogin()
  updateBlog(): string {
    return '修改成功';
  }

  //删除博客
  @Post('delete-blog')
  @RequireLogin()
  deleteBlog(): string {
    return '删除成功';
  }

  //查看博客
  @Post('search-blog')
  @RequireLogin()
  searchBlog(): string {
    return '';
  }

  //博客详情
  @Post('blog-detail')
  @RequireLogin()
  blogDetail(): string {
    return '';
  }
}
