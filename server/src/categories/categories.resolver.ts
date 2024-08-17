import { Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Query } from '@nestjs/graphql';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('categories')
  async getCategories() {
    return await this.categoriesService.getCategories();
  }
}
