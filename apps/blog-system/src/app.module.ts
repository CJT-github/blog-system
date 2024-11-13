import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogSystemService } from './app.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [RedisModule, PrismaModule],
  controllers: [AppController],
  providers: [BlogSystemService],
})
export class AppModule {}
