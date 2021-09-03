import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  @Expose()
  readonly email: string;

  @ApiProperty({
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;
}
