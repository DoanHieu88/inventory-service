import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { AuthType } from 'src/common/enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('customer')
export class Customer extends AbstractEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  address: string;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  company: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'date' })
  lastLoginOnDate: Date;

  @Column({ nullable: false, type: 'enum', enum: AuthType })
  roleType: AuthType;
}
