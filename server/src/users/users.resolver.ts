import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { HistoryInput } from 'src/schema-graphql';

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
      await this.usersService.getUserGamesHistory(user);
    const finalOffset = offset || 0;
    const finalLimit = limit || 3;
    const history = rawResult.reduce((acc: HistoryInput[], row) => {
      const {
        id,
        categoryName,
        questionName,
        isCorrectlyAnswered,
        opponentName,
      } = row;
      let game = acc.find((item) => item.id === id);
      if (!game) {
        game = {
          id,
          questions: [{ questionName, isCorrectlyAnswered }],
          categoryName,
          opponentName: opponentName ? opponentName : 'Solo game',
        };
        acc.push(game);
      } else {
        game.questions.push({ questionName, isCorrectlyAnswered });
      }
      return acc;
    }, []);

    return {
      history: history.slice(finalOffset, finalOffset + finalLimit),
      totalCount,
    };
  }
}
