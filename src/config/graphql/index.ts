import { join } from 'path';

import {
  END_POINT,
  FE_URL,
  GRAPHQL_DEPTH_LIMIT,
  NODE_ENV,
  PRIMARY_COLOR,
} from '@/environments';
import { PaginationCursorAt } from '@/graphql';
import { Injectable, Logger } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import chalk from 'chalk';
import depthLimit from 'graphql-depth-limit';

export const CURSOR_AT_MAP: { [key in PaginationCursorAt]: string } = {
  ID: 'id',
  CREATED_AT: 'created_at',
};

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      resolvers: {
        // JSON: GraphQLJSON,
        // JSONObject: GraphQLJSONObject,
      },
      path: `/${END_POINT!}`,
      cors:
        NODE_ENV === 'production'
          ? {
              origin: FE_URL!,
              credentials: true, // <-- REQUIRED backend setting
            }
          : true,
      bodyParserConfig: { limit: '50mb' },
      onHealthCheck: () => {
        return new Promise((resolve, reject) => {
          // Replace the `true` in this conditional with more specific checks!
          if (true) {
            resolve();
          } else {
            reject();
          }
        });
      },
      validationRules: [
        depthLimit(
          GRAPHQL_DEPTH_LIMIT!,
          { ignore: [/_trusted$/, 'idontcare'] },
          (depths) => {
            if (depths[''] === GRAPHQL_DEPTH_LIMIT! - 1) {
              Logger.warn(
                `⚠️  You can only descend ${chalk
                  .hex(PRIMARY_COLOR!)
                  .bold(`${GRAPHQL_DEPTH_LIMIT!}`)} levels.`,
                'GraphQL',
                false,
              );
            }
          },
        ),
      ],
      introspection: true,
      playground: NODE_ENV !== 'production' && {
        settings: {
          'editor.cursorShape': 'underline', // possible values: 'line', 'block', 'underline'
          'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          'editor.fontSize': 14,
          'editor.reuseHeaders': true, // new tab reuses headers from last tab
          'editor.theme': 'dark', // possible values: 'dark', 'light'
          'general.betaUpdates': true,
          'queryPlan.hideQueryPlanResponse': false,
          'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
          'tracing.hideTracingResponse': false,
        },
      },
      tracing: NODE_ENV !== 'production',
      cacheControl: NODE_ENV === 'production' && {
        defaultMaxAge: 5,
        stripFormattedExtensions: false,
        calculateHttpHeaders: false,
      },
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        return {
          message: error.message,
          code: error.extensions && error.extensions.code,
          locations: error.locations,
          path: error.path,
        };
      },
      formatResponse: (response) => {
        // console.log(response)
        return response;
      },
      // uploads: {
      //   maxFieldSize: 2, // 1mb
      //   maxFileSize: 20, // 20mb
      //   maxFiles: 5,
      // },
    };
  }
}
