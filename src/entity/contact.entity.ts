import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { IMAGE } from 'src/common/constant/validate-constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('contact')
export class Contact extends AbstractEntity {
  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  email: string;

  @Column({ nullable: true, type: 'longtext' })
  content: string;
}
