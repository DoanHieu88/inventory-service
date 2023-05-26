import { Customer } from 'src/entity/custormer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {}
