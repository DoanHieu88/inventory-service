import { DetailBill } from 'src/entity/detailBill.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DetailBill)
export class DetailBillRepository extends Repository<DetailBill> {}
