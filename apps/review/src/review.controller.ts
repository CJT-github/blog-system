import { Controller, Get, Inject } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Inject('BLOG_SYSTEM')
  private blogClient: ClientProxy;

  @Get()
  async getHello() {
    const value = await firstValueFrom(this.blogClient.send('sum', [1, 3, 5]));
    return this.reviewService.getHello() + ' ' + value;
  }
}
