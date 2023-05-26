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
import { ProductsService } from './products.service';
import {
  FilterProduct,
  ProductDto,
  SearchProductDto,
  UpdateProductDto,
} from './products.dto';

@Controller('products')
@ApiTags('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('get-all-product')
  public async getAllProduct(@Query() filter: SearchProductDto) {
    return await this.productsService.getAllProduct(filter);
  }

  @Post('create-product')
  public async createProduct(@Body() payload: ProductDto) {
    return await this.productsService.createProduct(payload);
  }

  @Get('get-product/:id')
  public async getProduct(@Param('id') id: string) {
    return await this.productsService.getProductByid(id);
  }

  @Delete('delete-product/:id')
  public async delete(@Param('id') id: string) {
    return await this.productsService.deleteProductByid(id);
  }

  @Post('update-product/:id')
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.productsService.update(id, payload);
  }
  @Get('suggest-product')
  public async suggestProduct(@Query('textSearch') textSearch: string) {
    return await this.productsService.suggestProduct(textSearch);
  }
}
@Controller('app/product')
@ApiTags('app/product')
export class AppProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getAllProductFilter(@Query() filter: FilterProduct) {
    return await this.productsService.getAllProductFilter(filter);
  }

  @Get(':url')
  public async getProduct(@Param('url') url: string) {
    return await this.productsService.getProductByUrl(url);
  }
}
