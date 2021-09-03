import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class RecoveryCodeDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  readonly recoveryCode: string;
}
