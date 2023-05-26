import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Bill } from './bill.entity';
import { IMAGE } from 'src/common/constant/validate-constant';

@Entity('product_category')
export class ProductCategory extends AbstractEntity {
  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;
}
