import { toPaginationResponse } from 'src/common/until/query-util';
import { Product } from 'src/entity/product.entity';
import {
  FilterProduct,
  SearchProductDto,
} from 'src/module/products/products.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public async getAll(filter: SearchProductDto) {
    const querry = this.createQueryBuilder('product').where(
      `product.flg_delete = 0`,
    );
    if (filter.name) {
      querry.andWhere(`product.name like '%${filter.name.trim()}%'`);
    }
    if (filter.code) {
      querry.andWhere(`product.code like '%${filter.code.trim()}%'`);
    }
    if (filter.barCode) {
      querry.andWhere(`product.barCode like '%${filter.barCode.trim()}%'`);
    }
    querry.orderBy('product.createdOnDate', 'DESC');
    return await toPaginationResponse(querry, filter.size, filter.page);
  }
  public async getAllFiter(filter: FilterProduct) {
    const querry = this.createQueryBuilder('product').where(
      `product.flg_delete = 0`,
    );
    if (filter.category_id) {
      querry.andWhere(
        `product.category_id like '%${filter.category_id.trim()}%'`,
      );
    }
    if (filter.name) {
      querry.andWhere(`product.name like '%${filter.name.trim()}%'`);
    }
    querry.orderBy('product.createdOnDate', 'DESC');
    return await toPaginationResponse(querry, filter.size, filter.page);
  }

  public async suggestProduct(textSearch: string) {
    let dataSearch = [];
    const query = this.createQueryBuilder().where(`product.flg_delete = 0`);
    // .andWhere(`product.amount != 0`);
    if (textSearch) {
      dataSearch = [
        `product.name like '%${textSearch.trim()}%'`,
        `product.code like '%${textSearch.trim()}%'`,
        `product.barCode like '%${textSearch.trim()}%'`,
      ];
    }

    return await query.andWhere(`(${dataSearch.join(' or ')})`).getMany();
  }
}
