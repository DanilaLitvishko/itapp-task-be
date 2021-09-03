import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BaseInputDto } from 'src/modules/base/dto/base-input.dto';

export class SearchDto extends BaseInputDto {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  readonly search: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Expose()
  readonly from?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  readonly size?: number;
}
