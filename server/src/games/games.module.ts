import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { CategoriesModule } from 'src/categories/categories.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    GamesResolver,
    GamesService,
    { provide: 'PUB_SUB', useValue: new PubSub() },
  ],
  imports: [CategoriesModule],
})
export class GamesModule {}
