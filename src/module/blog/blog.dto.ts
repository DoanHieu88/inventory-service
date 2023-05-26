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
export class SearchBlogDto extends SearchFilter {
  @ApiProperty({ description: 'name', required: false })
  @IsString()
  @IsOptional()
  name: string;
}
export class BlogDto extends AbstractEntity {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'url' })
  @IsString()
  @IsOptional()
  url: string;

  @ApiProperty({ description: 'author' })
  @IsString()
  @IsOptional()
  author: string;

  @ApiProperty({ description: 'html_content' })
  @IsString()
  @IsOptional()
  html_content: string;

  @ApiProperty({ description: 'image' })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ description: 'date' })
  @IsString()
  @IsOptional()
  date: string;

  @ApiProperty({ description: 'description' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'status' })
  @IsOptional()
  status: boolean;

  @ApiProperty({ description: 'hot' })
  @IsOptional()
  hot: boolean;
}
