import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { RegisterUserDTO } from './dto/register-user.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDTO) {
    return this.authService.registerUser(registerUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.loginUser(request.user, response);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('/me')
  async me(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.me(request.user, response);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logoutUser(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logoutUser(request.user, response);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  async googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.googleLogin(request.user, response);
  }
}
