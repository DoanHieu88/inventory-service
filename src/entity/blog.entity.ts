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

@Entity('blog')
export class Blog extends AbstractEntity {
  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'longtext' })
  html_content: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  author: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
    transformer: {
      from(val: string) {
        return val ? process.env.API_URL + IMAGE + '/' + val : null;
      },
      to(val: string) {
        return val;
      },
    },
  })
  image: string;

  @Column({ default: true })
  hot: boolean;

  @Column({ default: true })
  date: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  url: string;
}
