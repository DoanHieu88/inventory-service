import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/repository/products.repository';
import { DetailBillDto } from './detailBill.dto';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { DetailBillRepository } from 'src/repository/detailBill.repository';
import { BillRepository } from 'src/repository/bill.repository';
import { TypeBill } from 'src/common/enum';

@Injectable()
export class DetailBillService {
  constructor(
    private productRepository: ProductsRepository,
    private detailBillRepository: DetailBillRepository,
    private billRepository: BillRepository,
  ) {}

  public async create(
    userId: string,
    payload: DetailBillDto[],
    billId: string,
  ) {
    try {
      const result = await Promise.all(
        payload.map((item) => {
          return this._create(userId, item, billId);
        }),
      );
      return result;
    } catch (error) {
      console.log(error);

      // throw new BadRequestException('IMPORT_PRODUCT_FAILED');
    }
  }

  private async _create(id: string, payload: DetailBillDto, billId: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: payload.idProduct },
      });

      if (!product) throw new BadRequestException('PRODUCT_NOT_FOUND');

      const bill = await this.billRepository.findOne({ where: { id: billId } });
      if (!bill) throw new BadRequestException('BILL_NOT_FOUND');
      console.log(bill, '>>>>>>>');
      await this.productRepository.update(product.id, {
        amount:
          bill.typeBill == TypeBill.Import
            ? Number(product.amount) + Number(payload.importAmount)
            : Number(product.amount) - Number(payload.importAmount),
        importPrice:
          bill.typeBill == TypeBill.Import
            ? Number(payload.importPrice)
            : product.importPrice,
      });

      const audit = {
        createdByUserId: id,
        idBill: bill.id,
        typeBill: bill.typeBill,
      };

      return await this.detailBillRepository.save({ ...payload, ...audit });
    } catch (error) {
      console.log(error);

      throw new BadRequestException('PRODUCT_NOT_FOUND Aa');
    }
  }
}
