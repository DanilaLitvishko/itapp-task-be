import * as dotenv from 'dotenv';

import * as jwtConfig from 'config/jwt';
import * as mailgunConfig from 'config/mailgun';
import * as pubnubConfig from 'config/pubnub';
import * as stripeConfig from 'config/stripe';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  frontendDomain: process.env.FRONTEND_URL || 'http://localhost:3001',
  jwt: jwtConfig[env],
  mailgun: mailgunConfig[env],
  pubnub: pubnubConfig[env],
  stripe: stripeConfig[env],
});
