import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/repository/products.repository';
import { AuthModule } from '../auth/auth.module';
import { DetailBillController } from './detailBill.controller';
import { DetailBillService } from './detailBill.service';
import { DetailBillRepository } from 'src/repository/detailBill.repository';
import { ProductsModule } from '../products/products.module';
import { BillRepository } from 'src/repository/bill.repository';
import { BillModule } from '../bill/bill.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    TypeOrmModule.forFeature([
      DetailBillRepository,
      ProductsRepository,
      BillRepository,
    ]),
  ],
  providers: [DetailBillService],
  controllers: [DetailBillController],
  exports: [DetailBillService],
})
export class DetailBillModule {}
