import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BaseInputDto } from 'src/modules/base/dto/base-input.dto';

export class FindUserDto extends BaseInputDto {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  @Expose()
  readonly id?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  readonly firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  readonly lastName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  readonly login?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  readonly email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  readonly phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Expose()
  readonly roles?: string;
}
