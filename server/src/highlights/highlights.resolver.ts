import { Args, Query, Resolver } from '@nestjs/graphql';
import { HighlightsService } from './highlights.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';

@Resolver('Highlight')
export class HighlightsResolver {
  constructor(private readonly highlightsService: HighlightsService) {}

  @UseGuards(GqlAuthGuard)
  @Query('getHighlights')
  async getHighlights(
    @CurrentUser() user: User,
    @Args('categoryName') categoryName: string,
  ) {
    return this.highlightsService.getHighlights(user, categoryName);
  }
}
