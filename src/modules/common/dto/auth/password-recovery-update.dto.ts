import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordRecoveryUpdateDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  readonly recoveryCode: string;

  @ApiProperty({
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;
}
