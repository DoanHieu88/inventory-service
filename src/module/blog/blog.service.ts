import { BadRequestException, Injectable } from '@nestjs/common';
import { Guid } from 'guid-typescript';

import { BlogDto, SearchBlogDto } from './blog.dto';
import { BlogException, BlogMessage } from './blog.exception';
import { BlogRepository } from 'src/repository/blog.repository';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  public async createBlog(payload: BlogDto) {
    try {
      return await this.blogRepository.save({ ...payload });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('CREATE_BLOG_FAILED');
    }
  }
  public async getAllBlog(filter: SearchBlogDto) {
    try {
      const listProduct = await this.blogRepository.getAll(filter);
      return listProduct;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }
  public async deleteById(id: string) {
    try {
      const product = await this.blogRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        throw new BadRequestException('PRODUCT_NOT_FOUND');
      }
      await this.blogRepository.update(product.id, {
        flg_delete: true,
      });
      return {
        message: 'Delete Success',
      };
    } catch (error) {
      return error;
    }
  }

  public async getBlogById(id: string) {
    try {
      const product = await this.blogRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        return {
          message: 'Blog already exists',
        };
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_BLOG_BY_ID_FAILED');
    }
  }
  public async getAllBlogApp(filter: SearchBlogDto) {
    try {
      const listProduct = await this.blogRepository.getAllBlogApp(filter);
      return listProduct;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }

  public async update(id: string, payload: BlogDto) {
    try {
      const product = await this.blogRepository.findOne({ where: { id } });
      if (!product) throw new BadRequestException('PRODUCT_NOT_FOUND');

      await this.blogRepository.update(id, { ...payload });
      return { message: 'Update Success' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('UPDATE_PRODUCT_FAILED');
    }
  }

  public async getBlogByUrl(url: string) {
    try {
      const product = await this.blogRepository.findOne({
        where: { url, flg_delete: false },
      });
      if (!product) {
        return {
          message: 'Blog already exists',
        };
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_BLOG_BY_ID_FAILED');
    }
  }
}
