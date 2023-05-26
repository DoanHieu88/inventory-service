import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { TypeBill } from 'src/common/enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DetailBill } from './detailBill.entity';
import { User } from './user.entity';

@Entity('bill')
export class Bill extends AbstractEntity {
  @Column('int', { nullable: false, default: 0 })
  totalAmount: number;

  @Column('enum', { nullable: false, enum: TypeBill })
  typeBill: TypeBill;

  @Column('varchar', { nullable: true })
  code: string;

  @Column('varchar', { nullable: true })
  customer: string;

  @Column('varchar', { nullable: true })
  address: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('double', { nullable: true })
  totalPrice: number;

  @Column('varchar', { nullable: true })
  note: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'createdByUserId' })
  user: User;

  @OneToMany(() => DetailBill, (detailBill) => detailBill.bill)
  detailBill: DetailBill;
}
