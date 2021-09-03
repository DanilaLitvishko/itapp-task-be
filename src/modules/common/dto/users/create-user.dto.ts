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
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ROLE_ADMIN, ROLE_PREMIUM, ROLE_USER } from 'constants/roles';
import { ArrayHasAnyValues } from 'src/validation/custom-class-validators/array-has-any-values';
import { BaseInputDto } from 'src/modules/base/dto/base-input.dto';

export class CreateUserDto extends BaseInputDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Expose()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(10)
  @Expose()
  readonly phone?: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  @Expose()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsOptional()
  @Expose()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Validate(ArrayHasAnyValues, [ROLE_ADMIN, ROLE_USER, ROLE_PREMIUM])
  @Expose()
  readonly roles?: string[];

  @ApiProperty()
  @IsOptional()
  @Expose()
  readonly isNew: boolean;
}
