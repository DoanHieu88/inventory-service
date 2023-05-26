import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';
import { CustomersModule } from '../customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CustomersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
