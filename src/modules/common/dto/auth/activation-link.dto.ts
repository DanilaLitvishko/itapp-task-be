import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ActivationLinkDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is invalid' })
  readonly email: string;
}
