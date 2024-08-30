import { Mutation, Resolver, Args, Subscription } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDTO } from './dto/create-game.dto';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver('Game')
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    @Inject('PUB_SUB')
    private pubSub: PubSub,
  ) {}

  @Mutation('createGame')
  async createAnonimousGame(@Args('gameData') gameData: CreateGameDTO) {
    return this.gamesService.createGame(gameData, null);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createSoloGame')
  async createSoloGame(
    @Args('gameData') gameData: CreateGameDTO,
    @CurrentUser() user: User,
  ) {
    return this.gamesService.createGame(gameData, user);
  }

  @Mutation('stopGame')
  async stopGame(@Args('gameCode') gameCode: string) {
    return this.gamesService.stopGame(gameCode);
  }

  @Mutation('endRound')
  async endRound(@Args('gameCode') gameCode: string) {
    return this.gamesService.endRound(gameCode);
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
