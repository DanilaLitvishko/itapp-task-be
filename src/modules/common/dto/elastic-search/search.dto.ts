import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';

import { BaseInputDto } from '../../base/dto/base-input.dto';

export class SearchDto extends BaseInputDto {
  @Expose()
  @IsNotEmpty()
  readonly search: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  readonly from?: number;

  @IsOptional()
  @IsNumber()
  @Expose()
  readonly size?: number;
}
