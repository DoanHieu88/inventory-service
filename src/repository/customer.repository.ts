import { Injectable } from '@nestjs/common';
import { Customer } from 'src/entity/custormer.entity';
import { DataSource, Repository, EntityRepository } from 'typeorm';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }
}
