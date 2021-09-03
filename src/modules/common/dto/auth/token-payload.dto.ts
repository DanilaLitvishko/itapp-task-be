import { IsNumber } from 'class-validator';

export class TokenPayloadDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly iat: number;
}
