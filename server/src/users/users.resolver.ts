import { Args, Query, Resolver } from '@nestjs/graphql';
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
  async getUserGamesHistory(
    @CurrentUser() user: User,
    @Args('offset') offset: number | undefined,
    @Args('limit') limit: number | undefined,
  ) {
    const { rawResult, totalCount } =
      await this.usersService.getUserGamesHistory(user, offset, limit);
    const history = rawResult.reduce((acc, row) => {
      const { id, categoryName, questionName, isCorrectlyAnswered } = row;
      let game = acc.find((item) => item.id === id);
      if (!game) {
        game = { id, questions: [], categoryName };
        acc.push(game);
      } else {
        game.questions.push({ questionName, isCorrectlyAnswered });
      }
      return acc;
    }, []);
    return { history, totalCount };
  }
}
