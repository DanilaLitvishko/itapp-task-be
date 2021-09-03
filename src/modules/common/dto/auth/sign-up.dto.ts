import { IsString, IsEmail, MinLength, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignUpDto {
  @ApiProperty({
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly firstName: string;

  @ApiProperty({
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  @Expose()
  readonly phone: string;

  @ApiProperty({
    minLength: 2,
    maxLength: 30,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly lastName: string;

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

  @ApiProperty()
  @IsOptional()
  @Expose()
  readonly isNew: boolean;
}
