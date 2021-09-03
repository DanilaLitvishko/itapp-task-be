import * as dotenv from 'dotenv';

import { StripeConfig } from 'config/interfaces/stripe.interface';

dotenv.config();

const stripeConfig: StripeConfig = {
  development: {
    apiKey: process.env.STRIPE_API_KEY,
  },
  production: {
    apiKey: process.env.STRIPE_API_KEY,
  },
  test: {
    apiKey: process.env.STRIPE_API_KEY,
  },
};

module.exports = stripeConfig;
