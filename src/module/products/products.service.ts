import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/repository/products.repository';
import {
  FilterProduct,
  ProductDto,
  SearchProductDto,
  UpdateProductDto,
} from './products.dto';
import { toPaginationResponse } from 'src/common/until/query-util';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductsRepository) {}

  public async getAllProduct(filter: SearchProductDto) {
    try {
      const listProduct = await this.productRepository.getAll(filter);
      return listProduct;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }

  public async createProduct(payload: ProductDto) {
    try {
      const product = await this.productRepository.findOne({
        where: { code: payload.code },
      });
      if (product)
        return {
          message: 'Product already exists',
        };
      return await this.productRepository.save({ ...payload });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('CREATE_PRODUCT_FAILED');
    }
  }

  public async getProductByid(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        return {
          message: 'Product already exists',
        };
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_PRODUCT_BY_ID_FAILED');
    }
  }

  public async deleteProductByid(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        throw new BadRequestException('PRODUCT_NOT_FOUND');
      }
      await this.productRepository.update(product.id, {
        flg_delete: true,
      });
      return {
        message: 'Delete Success',
      };
    } catch (error) {
      return error;
    }
  }

  public async update(id: string, payload: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) throw new BadRequestException('PRODUCT_NOT_FOUND');

      await this.productRepository.update(id, { ...payload });
      return { message: 'Update Success' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('UPDATE_PRODUCT_FAILED');
    }
  }
  public async getAllProductFilter(filter: FilterProduct) {
    try {
      const listProduct = await this.productRepository.getAllFiter(filter);
      return listProduct;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }

  public async suggestProduct(textSearch: string) {
    try {
      return await this.productRepository.suggestProduct(textSearch);
    } catch (error) {
      throw new BadRequestException('GET_PRODUCT_SUGGEST_FAILED');
    }
  }

  public async getProductByUrl(url: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { url, flg_delete: false },
      });
      if (!product) {
        return {
          message: 'Product already exists',
        };
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_PRODUCT_BY_ID_FAILED');
    }
  }
}
