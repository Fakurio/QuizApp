import { Mutation, Resolver, Args, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Game')
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    @Inject('PUB_SUB')
    private pubSub: PubSub,
  ) {}

  @Mutation('createGame')
  async createGame(@Args('gameData') gameData: CreateGameDTO) {
    return this.gamesService.createGame(gameData);
  }

  @Mutation('stopGame')
  async stopGame(@Args('gameCode') gameCode: string) {
    return this.gamesService.stopGame(gameCode);
  }

  @Subscription('newQuestion', {
    filter: (payload, variables) => {
      return payload.newQuestion.gameCode === variables.gameCode;
    },
  })
  sendNewQuestion() {
    return this.pubSub.asyncIterator('newQuestion');
  }
}
