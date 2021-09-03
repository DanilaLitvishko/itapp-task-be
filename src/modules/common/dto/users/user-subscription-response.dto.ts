/* eslint-disable @typescript-eslint/camelcase */

import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import Stripe from 'stripe';

import { BaseOutputDto } from 'src/modules/base/dto/base-output.dto';
import { Product } from 'src/modules/ecommerce/entities/product/product.entity';
import { ProductResponseDto } from 'src/modules/ecommerce/dto/product/product-response.dto';

export class UserSubscriptionResponseDto extends BaseOutputDto {
  constructor(subscription: Stripe.Subscription, product: Product) {
    super();
    this.id = subscription.id;
    this.status = subscription.status;
    this.isCanceled = subscription.cancel_at_period_end;
    this.startedAt = new Date(subscription.current_period_start * 1000);
    this.expiredAt = new Date(subscription.current_period_end * 1000);
    this.product = new ProductResponseDto(product);
  }

  @ApiResponseProperty()
  readonly id: string;

  @ApiResponseProperty()
  readonly status: string;

  @ApiResponseProperty()
  readonly isCanceled: boolean;

  @ApiResponseProperty()
  readonly startedAt: Date;

  @ApiResponseProperty()
  readonly expiredAt: Date;

  @ApiProperty()
  readonly product: ProductResponseDto;
}
