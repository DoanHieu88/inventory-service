import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import {
  AppCategoryController,
  CategoryController,
} from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from 'src/repository/category.reporsitory';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoryService],
  controllers: [CategoryController, AppCategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
