import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { CategoriesModule } from 'src/categories/categories.module';
import { PubSub } from 'graphql-subscriptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { GameQuestions } from 'src/entities/game-questions.entity';

@Module({
  providers: [
    GamesResolver,
    GamesService,
    { provide: 'PUB_SUB', useValue: new PubSub() },
  ],
  imports: [CategoriesModule, TypeOrmModule.forFeature([Game, GameQuestions])],
})
export class GamesModule {}
