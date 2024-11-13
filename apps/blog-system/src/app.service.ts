import { Inject, Injectable, Logger } from '@nestjs/common';
import { createBlogDto } from './dto/create-blog.dto';
import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import { Prisma } from '@prisma/client';

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
