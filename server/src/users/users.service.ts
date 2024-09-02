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
    return await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.gamesAsPlayerOne', 'soloGames')
      .leftJoin('soloGames.questions', 'soloGameQuestions')
      .leftJoin(
        'soloGameQuestions.playerAnswers',
        'soloGameQuestionsPlayerAnswers',
      )
      .leftJoin('soloGameQuestions.question', 'soloGameQuestionsQuestion')
      .leftJoin(
        'soloGameQuestionsQuestion.category',
        'soloGameQuestionsQuestionCategory',
      )
      .select([
        'soloGames.id as gameID',
        'soloGameQuestionsQuestionCategory.name as categoryName',
        'soloGameQuestionsQuestion.name as questionName',
        'soloGameQuestionsPlayerAnswers.isCorrect as isCorrectlyAnswered',
      ])
      .where('user.id = :id', { id: user.id })
      .andWhere('soloGames.isFinished = :isFinished', { isFinished: true })
      .getRawMany();
  }
}
