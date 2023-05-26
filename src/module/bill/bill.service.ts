import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeBill } from 'src/common/enum';
import { BillRepository } from 'src/repository/bill.repository';
import { DetailBillRepository } from 'src/repository/detailBill.repository';
import { DetailBillService } from '../detailBill/detailBill.service';
import {
  BillDto,
  CreateBillDto,
  SearchBillExportDto,
  SearchBillImportDto,
} from './bill.dto';

@Injectable()
export class BillService {
  constructor(
    private billRepository: BillRepository,
    private detailBillService: DetailBillService,
    private detailBillRepository: DetailBillRepository,
  ) {}

  public async getAllImport(filter: SearchBillImportDto) {
    try {
      const bill = await this.billRepository.getAllImport(filter);
      return bill;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_ALL_BILL_FAILED');
    }
  }
  public async getAllExport(filter: SearchBillExportDto) {
    try {
      const bill = await this.billRepository.getAllExport(filter);
      return bill;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_ALL_BILL_FAILED');
    }
  }

  public async create(userId: string, payload: CreateBillDto) {
    try {
      const dataSave = {
        createdByUserId: userId,
        typeBill: payload.TypeBill,
        totalAmount: payload.bills
          .map((item) => item.importAmount)
          .reduce((a: number, b: number) => a + b, 0),
        totalPrice:
          payload.bills
            .map((item) => item.totalPrice)
            .reduce((a: number, b: number) => a + b, 0) || 0,
      };
      const bill = await this.billRepository.save({
        id: payload.id,
        ...dataSave,
        ...payload,
      });
      if (!bill) throw new BadRequestException('BILL_NOT_FOUND');

      await this.detailBillService.create(userId, payload.bills, bill.id);
      return bill;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('CREATE_BILL_FAILED');
    }
  }

  public async getById(id: string) {
    try {
      const bill = await this.billRepository.findOne({
        where: { id: id },
        relations: ['user'],
      });
      const detailsBill = await this.detailBillRepository.find({
        where: { idBill: id },
        relations: ['product'],
      });

      return { bill: bill, detailsBills: [...detailsBill] };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('BILL_NOT_FOUND');
    }
  }
  public async deleteBillByid(id: string) {
    try {
      const product = await this.billRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        throw new BadRequestException('PRODUCT_NOT_FOUND');
      }
      await this.billRepository.update(product.id, {
        flg_delete: true,
      });
      return {
        message: 'Delete Success',
      };
    } catch (error) {
      return error;
    }
  }
}
