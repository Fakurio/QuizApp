import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Length(6)
  password: string;
  @IsNotEmpty()
  @IsString()
  username: string;
}
