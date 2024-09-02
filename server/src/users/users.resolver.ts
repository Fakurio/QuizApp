import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query('getUserGamesHistory')
  async getUserGamesHistory(@CurrentUser() user: User) {
    const rawResult = await this.usersService.getUserGamesHistory(user);
    const history = rawResult.reduce((acc, row) => {
      const { gameID, categoryName, questionName, isCorrectlyAnswered } = row;
      let game = acc.find((item) => item.id === gameID);
      if (!game) {
        game = { id: gameID, questions: [], categoryName };
        acc.push(game);
      } else {
        game.questions.push({ questionName, isCorrectlyAnswered });
      }
      return acc;
    }, []);
    return history;
  }
}
