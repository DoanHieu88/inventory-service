import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthType } from 'src/common/enum';
import { Auth } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CategoryDto, SearchCategoryDto } from './category.dto';

@Controller('product/category')
@ApiTags('product/category')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  public async getAllCategory(@Query() filter: SearchCategoryDto) {
    return await this.categoryService.getAllCategory(filter);
  }

  @Post()
  public async createCategory(@Body() payload: CategoryDto) {
    return await this.categoryService.createCategory(payload);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.categoryService.deleteCategoryByid(id);
  }
}
@Controller('app/product/category')
@ApiTags('app/product/category')
export class AppCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('get')
  public async getAllCategoryApp() {
    return await this.categoryService.getAllCategoryApp();
  }
}
