import { BadRequestException, Injectable } from '@nestjs/common';
import { Guid } from 'guid-typescript';

import { ContactDto, SearchContactDto } from './contact.dto';
import { ContactException, ContactMessage } from './contact.exception';
import { ContactRepository } from 'src/repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private contactRepository: ContactRepository) {}

  public async createContact(payload: ContactDto) {
    try {
      return await this.contactRepository.save({ ...payload });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('CREATE_BLOG_FAILED');
    }
  }
  public async getAllContact(filter: SearchContactDto) {
    try {
      const listContact = await this.contactRepository.getAll(filter);
      return listContact;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }
  public async deleteById(id: string) {
    try {
      const product = await this.contactRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        throw new BadRequestException('PRODUCT_NOT_FOUND');
      }
      await this.contactRepository.update(product.id, {
        flg_delete: true,
      });
      return {
        message: 'Delete Success',
      };
    } catch (error) {
      return error;
    }
  }

  public async getContactById(id: string) {
    try {
      const product = await this.contactRepository.findOne({
        where: { id, flg_delete: false },
      });
      if (!product) {
        return {
          message: 'Contact already exists',
        };
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('GET_BLOG_BY_ID_FAILED');
    }
  }
  public async getAllContactApp(filter: SearchContactDto) {
    try {
      // const listProduct = await this.contactRepository.getAllContactApp(filter);
      // return listProduct;
    } catch (err) {
      throw new BadRequestException('GET_ALL_PRODUCT_FAILED');
    }
  }

  public async update(id: string, payload: ContactDto) {
    try {
      const product = await this.contactRepository.findOne({ where: { id } });
      if (!product) throw new BadRequestException('PRODUCT_NOT_FOUND');

      await this.contactRepository.update(id, { ...payload });
      return { message: 'Update Success' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('UPDATE_PRODUCT_FAILED');
    }
  }
}
