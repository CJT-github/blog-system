import { NestFactory } from '@nestjs/core';
import { BlogModule } from './blog.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(BlogModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });
  app.startAllMicroservices();
  await app.listen(3005);
}
bootstrap();
