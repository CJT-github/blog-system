import { NestFactory } from '@nestjs/core';
import { ReviewModule } from './review.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ReviewModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  app.enableCors();
  await app.listen(3003);
}
bootstrap();
