import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { GoogleUserDTO } from 'src/auth/dto/google-user.dto';
import { Game } from 'src/entities/game.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
  ) {}

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async addUser(userDto: RegisterUserDTO | GoogleUserDTO) {
    try {
      const user = new User();
      user.email = userDto.email;
      user.username = userDto.username;
      if (userDto.type === 'google') {
        user.password = '';
        user.avatarUrl = userDto.avatarUrl;
      } else {
        user.password = await hash(userDto.password, 10);
      }
      return await this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async updateRefreshToken(userID: number, refreshToken: string) {
    return await this.usersRepository.update(userID, { refreshToken });
  }

  async getUserGamesHistory(user: User) {
    const totalCount = await this.gamesRepository
      .createQueryBuilder('game')
      .select(['COUNT(game.id) as count'])
      .where(
        '(game.playerOneId = :id OR game.playerTwoId = :id) AND game.isFinished = :isFinished',
        {
          id: user.id,
          isFinished: true,
        },
      )
      .getRawOne();

    const soloGameIDs = await this.gamesRepository
      .createQueryBuilder('game')
      .select('game.id as id')
      .where('game.playerOneId = :id', { id: user.id })
      .andWhere('game.playerTwoId IS NULL')
      .andWhere('game.isFinished = :isFinished', { isFinished: true })
      .orderBy('game.id', 'DESC')
      .getRawMany();

    const multiplayerGameIDs = await this.gamesRepository
      .createQueryBuilder('game')
      .select('game.id as id')
      .where('game.playerOneId = :id AND game.playerTwoId IS NOT NULL', {
        id: user.id,
      })
      .orWhere('game.playerTwoId = :id AND game.playerOneId IS NOT NULL', {
        id: user.id,
      })
      .orderBy('game.id', 'DESC')
      .getRawMany();

    let soloGames: any[] | undefined;
    let multiplayerGames: any[] | undefined;

    if (soloGameIDs.length !== 0) {
      soloGames = await this.gamesRepository
        .createQueryBuilder('game')
        .leftJoin('game.category', 'category')
        .leftJoin('game.playerAnswers', 'soloGamePlayerAnswers')
        .leftJoin('soloGamePlayerAnswers.question', 'soloGameQuestion')
        .select([
          'game.id as id',
          'category.name as categoryName',
          'soloGameQuestion.name as questionName',
          'soloGamePlayerAnswers.isCorrect as isCorrectlyAnswered',
        ])
        .where('game.id IN (:...ids)', {
          ids: soloGameIDs.map((game) => game.id),
        })
        .orderBy('game.id', 'DESC')
        .getRawMany();
    }

    if (multiplayerGameIDs.length !== 0) {
      multiplayerGames = await this.gamesRepository
        .createQueryBuilder('game')
        .leftJoin('game.category', 'category')
        .leftJoin('game.playerAnswers', 'multiplayerGamePlayerAnswers')
        .leftJoin(
          'multiplayerGamePlayerAnswers.question',
          'multiplayerGameQuestion',
        )
        .leftJoin('game.playerOne', 'playerOne')
        .leftJoin('game.playerTwo', 'playerTwo')
        .select([
          'game.id as id',
          'category.name as categoryName',
          'multiplayerGameQuestion.name as questionName',
          'multiplayerGamePlayerAnswers.isCorrect as isCorrectlyAnswered',
          `CASE 
            WHEN playerOne.id = :id THEN playerTwo.username
            WHEN playerTwo.id = :id THEN playerOne.username END as opponentName`,
        ])
        .where('game.id IN (:...ids)', {
          ids: multiplayerGameIDs.map((game) => game.id),
        })
        .andWhere('(playerOne.id = :id OR playerTwo.id = :id)', { id: user.id })
        .andWhere('multiplayerGamePlayerAnswers.playerId = :id', {
          id: user.id,
        })
        .orderBy('game.id', 'DESC')
        .getRawMany();
    }

    return {
      rawResult: [...(soloGames || []), ...(multiplayerGames || [])].sort(
        (a, b) => b.id - a.id,
      ),
      totalCount: totalCount.count,
    };
  }
}
