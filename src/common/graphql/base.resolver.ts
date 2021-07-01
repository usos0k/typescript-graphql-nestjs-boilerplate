import { ProductsService } from '@/modules/products/products.service';
import { Logger, Type } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { BaseEntity, Entity } from 'typeorm/index';

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    private logger = new Logger(`${classRef.name}`, true);

    constructor(private readonly productsService: ProductsService) {}

    @Query((type) => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<BaseEntity[]> {
      this.logger.log(`findAll${classRef.name}`);

      return this.productsService.findProductsRaw();
    }
  }
  return BaseResolverHost;
}
