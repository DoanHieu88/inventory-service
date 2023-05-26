import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdOnDate: Date;

  @Column({ nullable: true, type: 'uuid' })
  createdByUserId: string;

  @UpdateDateColumn({ select: true })
  lastModifiedOnDate: Date;

  @Column({ nullable: true, type: 'uuid', select: true })
  lastModifiedByUserId: string;

  @Column({ default: false })
  flg_delete: boolean;
}
