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
import { ApiProperty } from '@nestjs/swagger';

import { ArrayHasAnyValues } from 'src/validation/custom-class-validators/array-has-any-values';
import { ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from 'constants/roles';
import { BaseInputDto } from 'src/modules/base/dto/base-input.dto';

export class UpdateUserDto extends BaseInputDto {
  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly firstName?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly lastName?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsOptional()
  readonly login?: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @IsOptional()
  @Expose()
  readonly phone?: string;

  @ApiProperty()
  @Expose()
  @IsEmail({}, { message: 'Email is invalid' })
  @IsOptional()
  readonly email?: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Validate(ArrayHasAnyValues, [ROLE_ADMIN, ROLE_USER, ROLE_PREMIUM])
  readonly roles?: string[];

  @ApiProperty()
  @Expose()
  @IsOptional()
  readonly avatar?: string;
}
