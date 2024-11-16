import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { createBlogDto } from './dto/create-blog.dto';
import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import { createCategoryDto } from './dto/create-category.dto';

@Injectable()
export class BlogSystemService {
  @Inject(PrismaService)
  private prisma: PrismaService;

  @Inject(RedisService)
  private redisService: RedisService;

  private logger = new Logger();

  getHello(): string {
    return 'Hello World!';
  }

  //创建分类
  async createCateGory(category: createCategoryDto) {
    const cate = await this.prisma.category.findUnique({
      where: {
        key: category.key,
      },
    });

    if (cate) {
      throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.prisma.category.create({
        data: {
          key: category.key,
          name: category.name,
        },
        select: {
          key: true,
          name: true,
        },
      });
    } catch (error) {
      this.logger.error(error, BlogSystemService);
      return null;
    }
  }

  //获取分类列表
  async getCateGoryList(category: createCategoryDto) {
    const cate = await this.prisma.category.findUnique({
      where: {
        key: category.key,
      },
    });

    if (cate) {
      throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.prisma.category.create({
        data: {
          key: category.key,
          name: category.name,
        },
        select: {
          key: true,
          name: true,
        },
      });
    } catch (error) {
      this.logger.error(error, BlogSystemService);
      return null;
    }
  }

  //创建博客
  async createBlog(blog: createBlogDto, authorId: number) {
    try {
      return await this.prisma.blog.create({
        data: {
          image: blog.image,
          title: blog.title,
          desc: blog.desc,
          content: blog.content,
          published: blog.published,
          authorId: authorId,
        },
        select: {
          id: true,
          title: true,
          desc: true,
          content: true,
          published: true,
        },
      });
    } catch (error) {
      this.logger.error(error, BlogSystemService);
      return null;
    }
  }
}
