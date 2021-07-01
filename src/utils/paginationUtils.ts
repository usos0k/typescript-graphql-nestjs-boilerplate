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
    endCursor: list[list.length - 1]
      ? `${list[list.length - 1][cursorAt]}`
      : `0`,
    startCursor: list.length ? `${list[0][cursorAt]}` : `0`,
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
  where,
}: {
  pagination: PaginationInput;
  cursorAt: string;
  repository: Repository<Entity>;
  where?: object;
}): SelectQueryBuilder<Entity> => {
  const { after, last, before, first } = pagination;

  const queryAlias = 'ALIAS';
  let queryBuilder = repository.createQueryBuilder(queryAlias);
  // Be careful using where parameter
  if (where) {
    queryBuilder = Object.keys(where).reduce((acc, k) => {
      return acc.andWhere(`${queryAlias}.${k} = '${where[k]}'`);
    }, queryBuilder);
  }

  if (after) {
    queryBuilder = queryBuilder.andWhere(
      `${queryAlias}.${cursorAt} > '${after}'`,
    );
  }
  if (before) {
    queryBuilder = queryBuilder.andWhere(
      `${queryAlias}.${cursorAt} < '${before}'`,
    );
  }
  if (first || first === 0) {
    queryBuilder.take(first > MAX_QUERY_SIZE ? MAX_QUERY_SIZE : first);
  } else if (last || last === 0) {
    queryBuilder
      .orderBy(`${queryAlias}.${cursorAt}`, 'DESC')
      .take(last > MAX_QUERY_SIZE ? MAX_QUERY_SIZE : last);
  } else {
    queryBuilder.take(MAX_QUERY_SIZE);
  }

  return queryBuilder;
};
