import { toPaginationResponse } from 'src/common/until/query-util';
import { ProductCategory } from 'src/entity/product_category';
import { SearchCategoryDto } from 'src/module/product-category/category.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProductCategory)
export class CategoryRepository extends Repository<ProductCategory> {
  public async getAll(filter: SearchCategoryDto) {
    const querry = this.createQueryBuilder('product_category').where(
      `product_category.flg_delete = 0`,
    );
    if (filter.name) {
      querry.andWhere(`product_category.name like '%${filter.name.trim()}%'`);
    }

    querry.orderBy('product_category.createdOnDate', 'DESC');
    return await toPaginationResponse(querry, filter.size, filter.page);
  }

  public async getAllApp() {
    const querry = this.createQueryBuilder('product_category').where(
      `product_category.flg_delete = 0`,
    );

    querry.orderBy('product_category.createdOnDate', 'DESC');
    return await toPaginationResponse(querry);
  }
}
