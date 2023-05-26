import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppBlogController, BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from 'src/repository/blog.repository';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([BlogRepository])],
  controllers: [BlogController, AppBlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
