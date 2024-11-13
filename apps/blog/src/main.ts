import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BlogModule);

  //微服务通信
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });
  app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  app.enableCors();

  await app.listen(3005);
}
bootstrap();
