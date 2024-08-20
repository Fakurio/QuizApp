import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { GameInput } from 'src/schema-graphql';
import { CreateGameDTO } from './dto/create-game.dto';

@Resolver('Game')
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation('createGame')
  async createGame(@Args('gameData') gameData: CreateGameDTO) {
    return this.gamesService.createGame(gameData);
  }
}
