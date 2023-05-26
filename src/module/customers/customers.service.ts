import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Customer } from 'src/entity/custormer.entity';
import { CustomerRepository } from 'src/repository/customer.repository';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomerRepository) {}

  public async getCustomerById(id: string): Promise<Customer> {
    try {
      return await this.customersRepository.findOne({ where: { id } });
    } catch (error) {
      console.log('errr', error);
      throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
    }
  }
}
