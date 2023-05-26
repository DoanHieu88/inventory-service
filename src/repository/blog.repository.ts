import { toPaginationResponse } from 'src/common/until/query-util';
import { Blog } from 'src/entity/blog.entity';
import { SearchBlogDto } from 'src/module/blog/blog.dto';
// import { FilterProduct  } from 'src/module/blog/blog.dto';
import {
  Brackets,
  EntityRepository,
  LessThanOrEqual,
  Repository,
} from 'typeorm';

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  public async getAll(filter: SearchBlogDto) {
    const querry = this.createQueryBuilder('blog').where(`blog.flg_delete = 0`);
    if (filter.name) {
      querry.andWhere(`blog.name like '%${filter.name.trim()}%'`);
    }

    querry.orderBy('blog.createdOnDate', 'DESC');
    return await toPaginationResponse(querry, filter.size, filter.page);
  }
  public async getAllBlogApp(filter: SearchBlogDto) {
    const querry = this.createQueryBuilder('blog')
      .where(`blog.flg_delete = 0`)
      .andWhere(
        new Brackets((q) =>
          q
            .where({
              date: null,
            })
            .orWhere({
              date: LessThanOrEqual(new Date()),
            }),
        ),
      )
      .andWhere(`blog.status = 1`);
    if (filter.name) {
      querry.andWhere(`blog.name like '%${filter.name.trim()}%'`);
    }
    querry.orderBy('blog.createdOnDate', 'DESC');
    return await toPaginationResponse(querry, filter.size, filter.page);
  }

  //   public async getAllByFilter(filter: FilterProduct) {
  //     const querry = this.createQueryBuilder('blog').where(
  //       `blog.status = "${Status.Active}"`,
  //     );

  //     querry.orderBy('blog.createdOnDate', 'DESC');
  //     return await toPaginationResponse(querry, filter.size, filter.page);
  //   }
}
