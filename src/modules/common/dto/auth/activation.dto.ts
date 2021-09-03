import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ActivationDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly activationCode: string;
}
