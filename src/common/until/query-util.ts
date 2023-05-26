import { SelectQueryBuilder } from 'typeorm';
export class PaginationResponse<T> {
  content: Array<T>;
  total: number;
  page: number;
  size: number;
}
export class PaginationParam<T> {
  query: SelectQueryBuilder<T>;
  alias: string;
  size?: number;
  page?: number;
  sort?: string;
  defaultSort?: string = 'descend-createdOnDate';
}

export async function toPaginationResponse<T>(
  query: SelectQueryBuilder<T>,
  size?: number,
  page?: number,
) {
  const total = await query.getCount();
  page = page || 1;
  const take = size || 10;
  const skip = (page - 1) * take;

  if (!isNaN(take) && !isNaN(skip)) {
    query.take(take).skip(skip);
  }

  const content = await query.getMany();
  const result: PaginationResponse<T> = {
    content,
    total,
    page: Number(page),
    size: Number(size),
  };
  return result;
}
