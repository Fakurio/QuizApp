import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  providers: [GamesResolver, GamesService],
  imports: [CategoriesModule],
})
export class GamesModule {}
