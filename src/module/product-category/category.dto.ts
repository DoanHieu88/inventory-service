import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AbstractEntity } from 'src/common/abstract/abstract.entity';
import { SearchFilter } from 'src/common/dto/search-query';

export class CategoryDto extends AbstractEntity {
  @ApiProperty({ required: true, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class SearchCategoryDto extends SearchFilter {
  @ApiProperty({ required: false, description: 'name' })
  @IsString()
  @IsOptional()
  name: string;
}
export class FilterCategory extends SearchFilter {}
