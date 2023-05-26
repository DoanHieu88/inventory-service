import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { AuthType } from 'src/common/enum';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { Bill } from './bill.entity';

@Entity('user')
export class User extends AbstractEntity {
  @Column({ nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'enum', enum: AuthType })
  roleType: AuthType;
}
