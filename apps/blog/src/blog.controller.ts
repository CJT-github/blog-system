import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  getHello(): string {
    return this.blogService.getHello();
  }

  @MessagePattern('sum')
  sum(numArr: Array<number>): number {
    return numArr.reduce((total, item) => total + item, 0);
  }
}
