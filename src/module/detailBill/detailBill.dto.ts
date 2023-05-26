import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SearchFilter } from 'src/common/dto/search-query';

export class DetailBillDto extends SearchFilter {
  @ApiProperty({ required: true, description: 'idProduct', name: 'idProduct' })
  @IsNotEmpty()
  @IsString()
  idProduct: string;

  @ApiProperty({ required: true, description: 'numberOfImport' })
  @IsNotEmpty()
  @IsNumber()
  importAmount: number;

  @ApiProperty({ required: false, description: 'totalImportPrice' })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: false, description: 'importPrice' })
  @IsOptional()
  @IsNumber()
  importPrice: number;
}
