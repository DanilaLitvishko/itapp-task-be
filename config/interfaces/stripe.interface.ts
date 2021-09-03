export interface StripeAttributes {
  apiKey: string;
}

export interface StripeConfig {
  development: StripeAttributes;
  production: StripeAttributes;
  test: StripeAttributes;
}
