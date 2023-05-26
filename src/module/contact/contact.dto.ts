import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';

import { SearchFilter } from 'src/common/dto/search-query';
export class SearchContactDto extends SearchFilter {
  @ApiProperty({ description: 'name', required: false })
  @IsString()
  @IsOptional()
  name: string;
}
export class ContactDto extends AbstractEntity {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'name' })
  @IsString()
  @IsOptional()
  content: string;
}
