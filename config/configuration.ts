import * as dotenv from 'dotenv';

import * as databaseConfig from 'config/database';
import * as jwtConfig from 'config/jwt';
import * as mailgunConfig from 'config/mailgun';
import * as pubnubConfig from 'config/pubnub';
import * as awsConfig from 'config/aws';
import * as twitterConfig from 'config/twitter';
import * as googleConfig from 'config/google';
import * as facebookConfig from 'config/facebook';
import * as stripeConfig from 'config/stripe';
import * as elasticSearchConfig from 'config/elastic-search';
import * as sentryConfig from 'config/sentry';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  frontendDomain: process.env.FRONTEND_URL || 'http://localhost:3001',
  sentryConfig: sentryConfig[env],
  database: databaseConfig[env],
  jwt: jwtConfig[env],
  twitter: twitterConfig[env],
  facebook: facebookConfig[env],
  google: googleConfig[env],
  mailgun: mailgunConfig[env],
  pubnub: pubnubConfig[env],
  aws: awsConfig[env],
  stripe: stripeConfig[env],
  elasticSearch: elasticSearchConfig[env],
});
