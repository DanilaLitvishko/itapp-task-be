import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  readonly accessToken?: string;
}
