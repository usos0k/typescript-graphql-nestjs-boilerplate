import { MAX_QUERY_SIZE } from '@/environments';
import { PageInfo, PaginationInput } from '@/graphql';
import { Repository, SelectQueryBuilder } from 'typeorm';

export const convertListDataToConnectionPagination = <T>({
  list,
  total,
  cursorAt,
  pagination,
}: {
  list: Array<T>;
  total: number;
  cursorAt: string;
  pagination: PaginationInput;
}) => {
  const edges = list.map((d) => ({
    node: { ...d },
    cursor: `${d[cursorAt]}`,
  }));

  const pageInfo: PageInfo = {
    endCursor: list[list.length - 1][cursorAt],
    startCursor: list[0][cursorAt],
    hasNextPage: false,
    hasPreviousPage: false,
  };

  if (total === list.length) {
    pageInfo.hasNextPage = false;
    pageInfo.hasPreviousPage = false;
  } else if (pagination.last) {
    pageInfo.hasPreviousPage = true;
    pageInfo.hasNextPage = false;
  } else {
    pageInfo.hasNextPage = true;
    pageInfo.hasPreviousPage = false;
  }

  return {
    edges,
    pageInfo,
    totalCount: total,
  };
};

export const connectionPaginationQueryBuilder = <Entity>({
  pagination,
  cursorAt,
  repository,
}: {
  pagination: PaginationInput;
  cursorAt: string;
  repository: Repository<Entity>;
}): SelectQueryBuilder<Entity> => {
  const { after, last, before, first } = pagination;

  const queryAlias = 'ALIAS';
  let queryBuilder = repository
    .createQueryBuilder(queryAlias)
    .orderBy(cursorAt, 'DESC');

  if (after) {
    queryBuilder = queryBuilder.andWhere(
      `${queryAlias}.${cursorAt} < ${after}`,
    );
  }
  if (before) {
    queryBuilder = queryBuilder.andWhere(
      `${queryAlias}.${cursorAt} > ${before}`,
    );
  }
  if (first) {
    queryBuilder.limit(first > MAX_QUERY_SIZE ? MAX_QUERY_SIZE : first);
  } else if (last) {
    queryBuilder
      .orderBy('ASC')
      .limit(last > MAX_QUERY_SIZE ? MAX_QUERY_SIZE : last)
      .orderBy('DESC');
  } else {
    queryBuilder.limit(MAX_QUERY_SIZE);
  }

  return queryBuilder;
};
