import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillRepository } from 'src/repository/bill.repository';
import { DetailBillRepository } from 'src/repository/detailBill.repository';
import { UserRepository } from 'src/repository/users.repository';
import { AuthModule } from '../auth/auth.module';
import { DetailBillModule } from '../detailBill/detailBill.module';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
  imports: [
    DetailBillModule,
    TypeOrmModule.forFeature([
      BillRepository,
      DetailBillRepository,
      UserRepository,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [BillController],
  providers: [BillService],
  exports: [BillService],
})
export class BillModule {}
