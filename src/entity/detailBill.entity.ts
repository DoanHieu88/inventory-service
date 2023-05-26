import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { TypeBill } from 'src/common/enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Bill } from './bill.entity';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('detail_bill')
export class DetailBill extends AbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  idProduct: string;

  @Column('int', { nullable: false })
  importAmount: number;

  @Column('double', { nullable: true })
  totalImportPrice: number;

  @Column('enum', { nullable: false, enum: TypeBill })
  typeBill: TypeBill;

  @Column('varchar', { nullable: false })
  idBill: string;

  @ManyToOne(() => Bill, (bill) => bill.id)
  @JoinColumn({ name: 'idBill' })
  bill: Bill;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'createdByUserId' })
  user: User;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'idProduct' })
  product: Product;
}
