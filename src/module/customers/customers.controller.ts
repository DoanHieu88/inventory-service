import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { CustomersService } from './customers.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Auth } from '../auth/auth.decorator';
import { AuthType } from 'src/common/enum';

@Controller('customers')
@ApiTags('customers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomersController {
  constructor(
    private authService: AuthService,
    private customersService: CustomersService,
  ) {}

  @Auth(AuthType.Customer)
  @Get('get-info-customer-by-token')
  public async getInforUserByToken(@Req() req: Request) {
    const user = await this.authService.decode(req.headers.authorization);
    if (!user) throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
    return this.customersService.getCustomerById(user.id);
  }
}
