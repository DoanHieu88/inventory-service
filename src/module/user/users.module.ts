import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';
import { CustomersModule } from '../customers/customers.module';
import { CustomerRepository } from 'src/repository/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerRepository, UserRepository]),
    AuthModule,
    CustomersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
