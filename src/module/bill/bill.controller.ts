import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BillRepository } from 'src/repository/bill.repository';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  BillDto,
  CreateBillDto,
  SearchBillExportDto,
  SearchBillImportDto,
} from './bill.dto';
import { BillService } from './bill.service';

@Controller('bill')
@ApiTags('Bill')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BillController {
  constructor(
    private billService: BillService,
    private authService: AuthService,
  ) {}

  @Get('get-all-import')
  public async getAllImport(@Query() filter: SearchBillImportDto) {
    return await this.billService.getAllImport(filter);
  }

  @Get('get-all-export')
  public async getAllExport(@Query() filter: SearchBillExportDto) {
    return await this.billService.getAllExport(filter);
  }

  @Post('create')
  public async create(@Req() req: Request, @Body() payload: CreateBillDto) {
    const user = await this.authService.decode(req.headers.authorization);
    if (!user) throw new UnauthorizedException('CUSTOMER_NOT_FOUND');
    return await this.billService.create(user.id, payload);
  }

  @Get('detail-bill-by-id/:id')
  public async getById(@Param('id') id: string) {
    return await this.billService.getById(id);
  }

  @Delete('delete-bill/:id')
  public async delete(@Param('id') id: string) {
    return await this.billService.deleteBillByid(id);
  }
}
