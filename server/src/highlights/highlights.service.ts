import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class HighlightsService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  async getHighlights(user: User, categoryName: string) {
    const games = await this.gamesRepository
      .createQueryBuilder('game')
      .innerJoin('game.category', 'category')
      .leftJoin('game.playerOne', 'playerOne')
      .leftJoin('game.playerTwo', 'playerTwo')
      .innerJoin('game.playerAnswers', 'playerAnswers')
      .innerJoin('playerAnswers.question', 'question')
      .innerJoin('question.difficulty', 'difficulty')
      .select([
        'category.name as categoryName',
        'difficulty.name as difficultyName',
        `ROUND(AVG(CASE
        WHEN playerOne.id = :id THEN game.playerOneScore
        WHEN playerTwo.id = :id THEN game.playerTwoScore
        END),2) as avgScore`,
      ])
      .where('category.name = :categoryName', { categoryName })
      .andWhere('game.isFinished = true')
      .andWhere('(playerOne.id = :id OR playerTwo.id = :id)', { id: user.id })
      .groupBy('difficulty.name')
      .addGroupBy('category.name')
      .getRawMany();
    return games;
  }
}
