import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogSystemService } from './app.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, CommonModule } from '@app/common';
import { QiniuService } from '@app/qiniu';

@Module({
  imports: [RedisModule, PrismaModule, CommonModule],
  controllers: [AppController],
  providers: [
    BlogSystemService,
    QiniuService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
