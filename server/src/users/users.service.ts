import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDTO } from 'src/auth/dto/register-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

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

  async addUser(registerUserDto: RegisterUserDTO) {
    try {
      const user = new User();
      user.email = registerUserDto.email;
      user.username = registerUserDto.username;
      user.password = await hash(registerUserDto.password, 10);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async updateRefreshToken(userID: number, refreshToken: string) {
    return await this.usersRepository.update(userID, { refreshToken });
  }
}
