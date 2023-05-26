import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { SearchFilter } from 'src/common/dto/search-query';

export class ProductDto extends AbstractEntity {
  @ApiProperty({ required: true, description: 'code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ required: true, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true, description: 'barCode' })
  @IsOptional()
  @IsString()
  barCode: string;

  @ApiProperty({ required: true, description: 'image' })
  @IsString()
  image: string;

  @ApiProperty({ required: false, description: 'price' })
  @IsNumber()
  price: number;

  @ApiProperty({ required: false, description: 'wholesalePrice' })
  @IsNumber()
  wholesalePrice: number;

  @ApiProperty({ required: false, description: 'collaboratorPrice' })
  @IsNumber()
  collaboratorPrice: number;

  @ApiProperty({ required: false, description: 'importPrice' })
  @IsNumber()
  importPrice: number;

  @ApiProperty({ required: false, description: 'amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ required: true, description: 'note' })
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty({ required: true, description: 'category_id' })
  @IsString()
  @IsOptional()
  category_id: string;

  @ApiProperty({ required: true, description: 'url' })
  @IsOptional()
  @IsString()
  url: string;
}
export class SearchProductDto extends SearchFilter {
  @ApiProperty({ required: false, description: 'name' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false, description: 'code' })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({ required: false, description: 'barCode' })
  @IsString()
  @IsOptional()
  barCode: string;
}
export class FilterProduct extends SearchFilter {
  @ApiProperty({ required: false, description: 'category_id' })
  @IsString()
  @IsOptional()
  category_id: string;
  @ApiProperty({ required: false, description: 'category_id' })
  @IsString()
  @IsOptional()
  name: string;
}
export class UpdateProductDto {
  @ApiProperty({ required: true, description: 'name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: true, description: 'image' })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false, description: 'price' })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false, description: 'wholesalePrice' })
  @IsOptional()
  @IsNumber()
  wholesalePrice: number;

  @ApiProperty({ required: false, description: 'collaboratorPrice' })
  @IsOptional()
  @IsNumber()
  collaboratorPrice: number;

  @ApiProperty({ required: false, description: 'importPrice' })
  @IsOptional()
  @IsNumber()
  importPrice: number;

  @ApiProperty({ required: false, description: 'amount' })
  @IsOptional()
  @IsNumber()
  amount: number;

  @ApiProperty({ required: true, description: 'note' })
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty({ required: true, description: 'category_id' })
  @IsString()
  @IsOptional()
  category_id: string;

  @ApiProperty({ required: true, description: 'note' })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({ required: true, description: 'html_content' })
  @IsOptional()
  @IsString()
  html_content: string;

  @ApiProperty({ required: true, description: 'html_content' })
  @IsOptional()
  @IsString()
  description: string;
}
