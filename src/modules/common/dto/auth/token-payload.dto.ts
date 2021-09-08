import { IsNumber } from 'class-validator';

export class TokenPayloadDto {
  @IsNumber()
  readonly id: string;

  @IsNumber()
  readonly iat: number;
}
