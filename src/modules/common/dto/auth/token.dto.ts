import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @Expose()
  @IsNotEmpty()
  readonly accessToken?: string;
}
