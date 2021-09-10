import { IsString, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { BaseInputDto } from '../../base/dto/base-input.dto';

export class UpdateUserPasswordDto extends BaseInputDto {
  @IsString()
  @MinLength(6)
  @Expose()
  readonly password: string;

  @IsString()
  @MinLength(6)
  @Expose()
  readonly previousPassword: string;
}
