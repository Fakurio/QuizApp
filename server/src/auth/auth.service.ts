import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDTO) {
    const user = await this.usersService.findByEmail(registerUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    try {
      await this.usersService.addUser(registerUserDto);
      return {
        message: 'User registered successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Couldn't register user");
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) {
      return null;
    }
    return user;
  }

  async validateJwtUser(userID: number) {
    const user = await this.usersService.findById(userID);
    if (!user) {
      return null;
    }
    return user;
  }

  async validateJwtRefreshUser(userID: number, refreshToken: string) {
    const user = await this.usersService.findById(userID);
    if (!user || user.refreshToken !== refreshToken) {
      return null;
    }
    return user;
  }

  async loginUser(user: any, response: Response) {
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
    await this.usersService.updateRefreshToken(user.id, refreshToken);
    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    return {
      username: user.username,
      accessToken,
    };
  }

  async me(user: any, response: Response) {
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
    await this.usersService.updateRefreshToken(user.id, refreshToken);
    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    return {
      username: user.username,
      accessToken,
    };
  }

  async logoutUser(user: any, response: Response) {
    await this.usersService.updateRefreshToken(user.id, null);
    response.clearCookie('refresh_token', { httpOnly: true });
    return {
      message: 'User logged out',
    };
  }

  async googleLogin(request: Request) {
    if (!request.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: request.user,
    };
  }
}
