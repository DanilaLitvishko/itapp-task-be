import { IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BaseInputDto } from 'src/modules/base/dto/base-input.dto';

export class UpdateUserPasswordDto extends BaseInputDto {
  @ApiProperty({
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;

  @ApiProperty({
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @Expose()
  readonly previousPassword: string;
}
