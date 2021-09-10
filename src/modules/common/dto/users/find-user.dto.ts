import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { BaseInputDto } from '../../base/dto/base-input.dto';

export class FindUserDto extends BaseInputDto {
  @IsNumberString()
  @IsOptional()
  @Expose()
  readonly id?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly lastName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly login?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly phone?: string;

  @IsString()
  @IsOptional()
  @Expose()
  readonly roles?: string;
}
