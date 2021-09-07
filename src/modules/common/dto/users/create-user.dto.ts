import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsArray,
  ArrayUnique,
  Validate,
  MaxLength,
} from 'class-validator';
import { Expose } from 'class-transformer';

import { ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from 'constants/roles';
import { ArrayHasAnyValues } from 'src/validation/custom-class-validators/array-has-any-values';
import { BaseInputDto } from 'src/modules/base/dto/base-input.dto';

export class CreateUserDto extends BaseInputDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @Expose()
  readonly phone?: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @Expose()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  @Expose()
  readonly password: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Validate(ArrayHasAnyValues, [ROLE_ADMIN, ROLE_USER, ROLE_PREMIUM])
  @Expose()
  readonly roles?: string[];

  @IsOptional()
  @Expose()
  readonly isNew: boolean;
}
