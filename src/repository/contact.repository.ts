import { toPaginationResponse } from 'src/common/until/query-util';
import { Contact } from 'src/entity/contact.entity';
import { SearchContactDto } from 'src/module/contact/contact.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {
  public async getAll(filter: SearchContactDto) {
    const querry = this.createQueryBuilder('contact').where(
      `contact.flg_delete = 0`,
    );
    if (filter.name) {
      querry.andWhere(`contact.name like '%${filter.name.trim()}%'`);
    }

    querry.orderBy('contact.createdOnDate', 'DESC');
    return await toPaginationResponse(querry, filter.size, filter.page);
  }
}
