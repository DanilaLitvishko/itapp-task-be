import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ActivationLinkDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;
}
