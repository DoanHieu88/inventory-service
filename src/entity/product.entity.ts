import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Bill } from './bill.entity';
import { IMAGE } from 'src/common/constant/validate-constant';
import { ProductCategory } from './product_category';

@Entity('product')
export class Product extends AbstractEntity {
  @Column('uuid', { nullable: true })
  category_id: string;

  @Column('varchar', { nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: true })
  barCode: string;

  @Column({
    nullable: false,
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

  @Column({ nullable: true, type: 'varchar', length: 255 })
  url: string;

  @Column('double', { nullable: false })
  price: number;

  @Column('float', { nullable: false })
  wholesalePrice: number;

  @Column('float', { nullable: false })
  collaboratorPrice: number;

  @Column('double', { nullable: false, default: 0 })
  importPrice: number;

  @Column('double', { nullable: false, default: 0 })
  amount: number;

  @Column({ nullable: true, type: 'text' })
  html_content: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @Column({
    nullable: true,
    type: 'longtext',
    transformer: {
      from(val: string) {
        const value: any = JSON.parse(val);
        if (
          value?.length > 0 &&
          value?.filter((val) => val !== null).length > 0
        ) {
          return value.map((element: string) =>
            element ? process.env.API_URL + IMAGE + '/' + element : null,
          );
        }
        return null;
      },
      to(val: object) {
        return JSON.stringify(val);
      },
    },
  })
  list_image: string;
}
