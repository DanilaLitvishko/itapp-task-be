import { IsOptional, IsDefined } from 'class-validator';
import { Expose } from 'class-transformer';

import { BaseInputDto } from '../../base/dto/base-input.dto';

export class StripeTokenDto extends BaseInputDto {
  @Expose()
  @IsDefined()
  readonly id: string;

  @Expose()
  @IsDefined()
  readonly object: any;

  @Expose()
  @IsOptional()
  readonly bank_account?: any;

  @Expose()
  @IsDefined()
  readonly card: any;

  @Expose()
  @IsOptional()
  readonly client_ip?: string | null;

  @Expose()
  @IsOptional()
  readonly created?: number;

  @Expose()
  @IsOptional()
  readonly livemode?: boolean;

  @Expose()
  @IsOptional()
  readonly type?: string;

  @Expose()
  @IsOptional()
  readonly used?: boolean;
}
