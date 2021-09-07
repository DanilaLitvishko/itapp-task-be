import { IsEmail, IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginDto {
  @IsEmail({}, { message: 'Email is invalid' })
  @Expose()
  readonly email: string;
  
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;
}
