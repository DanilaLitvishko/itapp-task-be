import { IsString, IsEmail, MinLength, IsOptional, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly firstName: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  @Expose()
  readonly phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly lastName: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @Expose()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;

  @IsOptional()
  @Expose()
  readonly isNew: boolean;
}
