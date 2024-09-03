import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { GoogleUserDTO } from 'src/auth/dto/google-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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
    const soloGames = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.gamesAsPlayerOne', 'soloGames')
      .leftJoin('soloGames.category', 'category')
      .leftJoin('soloGames.playerAnswers', 'soloGamePlayerAnswers')
      .leftJoin('soloGamePlayerAnswers.question', 'soloGameQuestion')
      .select([
        'soloGames.id as id',
        'category.name as categoryName',
        'soloGameQuestion.name as questionName',
        'soloGamePlayerAnswers.isCorrect as isCorrectlyAnswered',
      ])
      .where('user.id = :id', { id: user.id })
      .andWhere('soloGames.isFinished = :isFinished', { isFinished: true })
      .getRawMany();
    // const multiplayerGames = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .leftJoin('user.gamesAsPlayerTwo', 'multiGames')
    //   .innerJoin('multiGames.playerOne', 'playerOne')
    //   .leftJoin('multiGames.category', 'category')
    //   .leftJoin('multiGames.playerAnswers', 'multiGamePlayerAnswers')
    //   .leftJoin('multiGamePlayerAnswers.question', 'multiGameQuestion')
    //   .select([
    //     'multiGames.id as id',
    //     'category.name as categoryName',
    //     'multiGameQuestion.name as questionName',
    //     'multiGamePlayerAnswers.isCorrect as isCorrectlyAnswered',
    //     'playerOne.username as opponentUsername',
    //   ])
    //   .where('user.id = :id', { id: user.id })
    //   .andWhere('multiGames.isFinished = :isFinished', { isFinished: true })
    //   .getRawMany();

    // console.log(multiplayerGames);
    return soloGames;
  }
}
