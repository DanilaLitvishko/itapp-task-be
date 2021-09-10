import {
  IsString,
  IsEmail,
  IsOptional,
  ArrayUnique,
  IsArray,
  Validate,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Expose } from 'class-transformer';

import { ArrayHasAnyValues } from 'src/validation/custom-class-validators/array-has-any-values';
import { ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from 'constants/roles';
import { BaseInputDto } from '../../base/dto/base-input.dto';

export class UpdateUserDto extends BaseInputDto {
  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly firstName?: string;

  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly lastName?: string;

  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly login?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  @Expose()
  readonly phone?: string;

  @Expose()
  @IsEmail({}, { message: 'Email is invalid' })
  @IsOptional()
  readonly email?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Validate(ArrayHasAnyValues, [ROLE_ADMIN, ROLE_USER, ROLE_PREMIUM])
  readonly roles?: string[];

  @Expose()
  @IsOptional()
  readonly avatar?: string;
}
