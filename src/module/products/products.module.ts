import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/repository/products.repository';
import { AuthModule } from '../auth/auth.module';
import {
  AppProductController,
  ProductsController,
} from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProductsRepository])],
  providers: [ProductsService],
  controllers: [ProductsController, AppProductController],
  exports: [ProductsService],
})
export class ProductsModule {}
