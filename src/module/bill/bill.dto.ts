import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { SearchFilter } from 'src/common/dto/search-query';
import { TypeBill } from 'src/common/enum';

export class CreateBillDto extends AbstractEntity {
  @ApiProperty({
    required: true,
    description: 'Type Bill',
    enum: TypeBill,
    title: 'Type Bill',
  })
  @IsEnum(TypeBill)
  TypeBill: TypeBill;

  @ApiProperty({ required: false, description: 'code', title: 'code' })
  @IsOptional()
  code: string;

  @ApiProperty({
    required: false,
    description: 'user_name',
    title: 'user_name',
  })
  @IsOptional()
  customter: string;

  @ApiProperty({ required: false, description: 'address', title: 'address' })
  @IsOptional()
  address: string;

  @ApiProperty({ required: false, description: 'phone', title: 'phone' })
  @IsOptional()
  phone: string;

  @ApiProperty({ required: false, description: 'note', title: 'note' })
  @IsOptional()
  note: string;

  @ApiProperty({ required: true, description: 'Bills', title: 'bill' })
  @IsNotEmpty()
  bills: BillDto[];
}

export class SearchBillImportDto extends SearchFilter {
  @ApiProperty({ required: false, description: 'id' })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ required: false, description: 'date' })
  @IsOptional()
  date: string;
}

export class SearchBillExportDto extends SearchFilter {
  @ApiProperty({ required: false, description: 'code' })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({ required: false, description: 'customer' })
  @IsOptional()
  @IsString()
  customer: string;

  @ApiProperty({ required: false, description: 'phone' })
  @IsOptional()
  @IsString()
  phone: string;
}

export class BillDto {
  @ApiProperty({ required: true, description: 'idProduct', title: 'idProduct' })
  @IsNotEmpty()
  @IsString()
  idProduct: string;

  @ApiProperty({ required: true, description: 'numberOfImport' })
  @IsNotEmpty()
  @IsNumber()
  importAmount: number;

  @ApiProperty({ required: false, description: 'totalImportPrice' })
  @IsOptional()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ required: true, description: 'importPrice' })
  @IsOptional()
  @IsNumber()
  importPrice: number;

  // @ApiProperty({ required: false, description: 'code', title: 'code' })
  // @IsOptional()
  // code: string;

  // @ApiProperty({
  //   required: false,
  //   description: 'user_name',
  //   title: 'user_name',
  // })
  // @IsOptional()
  // customter: string;

  // @ApiProperty({ required: false, description: 'address', title: 'address' })
  // @IsOptional()
  // address: string;

  // @ApiProperty({ required: false, description: 'phone', title: 'phone' })
  // @IsOptional()
  // phone: string;

  // @ApiProperty({ required: false, description: 'note', title: 'note' })
  // @IsOptional()
  // note: string;
}
