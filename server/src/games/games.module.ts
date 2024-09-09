import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { CategoriesModule } from 'src/categories/categories.module';
import { PubSub } from 'graphql-subscriptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { PlayerAnswers } from 'src/entities/player-answers.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [
    GamesResolver,
    GamesService,
    { provide: 'PUB_SUB', useValue: new PubSub() },
  ],
  imports: [
    CategoriesModule,
    TypeOrmModule.forFeature([Game, PlayerAnswers]),
    UsersModule,
  ],
})
export class GamesModule {}
