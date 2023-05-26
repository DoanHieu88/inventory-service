import { Controller, UseGuards, Get, Post, Body, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DetailBillService } from './detailBill.service';
import { DetailBillDto } from './detailBill.dto';
import { AuthService } from '../auth/auth.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { DetailBillRepository } from 'src/repository/detailBill.repository';

@Controller('import-product')
@ApiTags('import-product')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class DetailBillController {
  constructor(
    private authService: AuthService,
    private importProductsService: DetailBillService,
    private detailRepo: DetailBillRepository,
  ) {}

  // @Get('get-all')
  // public async getAllProduct() {
  //   return await this.detailRepo.find({
  //     relations: ['bill'],
  //   });
  // }

  // @Post('create')
  // public async create(
  //   @Req() req: Request,
  //   @Body() payload: DetailBillDto[],
  // ) {
  //   const user = await this.authService.decode(req.headers.authorization);
  //   if (!user) throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
  //   return await this.importProductsService.create(user.id, payload);
  // }
}
