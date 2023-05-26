import { BadRequestException, Injectable } from '@nestjs/common';

import { FilterCategory, CategoryDto, SearchCategoryDto } from './category.dto';
import { CategoryRepository } from 'src/repository/category.reporsitory';
import { Guid } from 'guid-typescript';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  public async getAllCategory(filter: SearchCategoryDto) {
    try {
      const listCategory = await this.categoryRepository.getAll(filter);
      return listCategory;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }

  public async createCategory(payload: CategoryDto) {
    try {
      const product = await this.categoryRepository.findOne({
        where: { name: payload.name, flg_delete: false },
      });
      if (product)
        return {
          message: 'CalistCategory already exists',
        };
      return await this.categoryRepository.save({
        id: payload?.id,
        ...payload,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('CREATE_PRODUCT_FAILED');
    }
  }

  public async deleteCategoryByid(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!category) {
        throw new BadRequestException('PRODUCT_NOT_FOUND');
      }
      await this.categoryRepository.update(category.id, {
        flg_delete: true,
      });
      return {
        message: 'Delete Success',
      };
    } catch (error) {
      return error;
    }
  }
  public async getAllCategoryApp() {
    try {
      const listCategory = await this.categoryRepository.getAllApp();
      return listCategory;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }
}
