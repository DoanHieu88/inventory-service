import { TypeBill } from 'src/common/enum';
import { toPaginationResponse } from 'src/common/until/query-util';
import { Bill } from 'src/entity/bill.entity';
import {
  SearchBillImportDto,
  SearchBillExportDto,
} from 'src/module/bill/bill.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Bill)
export class BillRepository extends Repository<Bill> {
  public async getAllImport(filter: SearchBillImportDto) {
    const querry = this.createQueryBuilder('bill').where(
      `bill.typeBill = '${TypeBill.Import}'`,
    );
    if (filter.date) {
      querry.andWhere(`DATE(bill.createdOnDate) = '${filter.date}'`);
    }
    querry.orderBy('bill.createdOnDate', 'DESC');
    querry.leftJoinAndSelect('bill.user', 'user');

    return await toPaginationResponse(querry, filter.size, filter.page);
  }
  public async getAllExport(filter: SearchBillExportDto) {
    const querry = this.createQueryBuilder('bill')
      .where(`bill.typeBill = '${TypeBill.Export}'`)
      .andWhere(`bill.flg_delete = false`);
    if (filter.customer) {
      querry.andWhere(`bill.customer like '%${filter.customer.trim()}%'`);
    }
    if (filter.code) {
      querry.andWhere(`bill.code like '%${filter.code.trim()}%'`);
    }
    if (filter.phone) {
      querry.andWhere(`bill.phone like '%${filter.phone.trim()}%'`);
    }
    querry.orderBy('bill.createdOnDate', 'DESC');
    querry.leftJoinAndSelect('bill.user', 'user');

    return await toPaginationResponse(querry, filter.size, filter.page);
  }
}
