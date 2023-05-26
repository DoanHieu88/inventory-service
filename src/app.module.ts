import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormConfig';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { UserModule } from './module/user/users.module';
import { CustomersModule } from './module/customers/customers.module';
import { ProductsModule } from './module/products/products.module';
import { FileManagerModule } from './module/file-manager/file-manager.module';
import { BillModule } from './module/bill/bill.module';
import { DetailBillModule } from './module/detailBill/detailBill.module';
import { BlogModule } from './module/blog/blog.module';
import { CategoryModule } from './module/product-category/category.module';
import { ContactModule } from './module/contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
    DetailBillModule,
    ContactModule,
    CustomersModule,
    ProductsModule,
    CategoryModule,
    FileManagerModule,
    BillModule,
    BlogModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
