import * as dotenv from 'dotenv';

import { TwitterConfig } from 'config/interfaces/twitter.interface';

dotenv.config();

const twitterConfig: TwitterConfig = {
  development: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret:
      process.env.TWITTER_CLIENT_SECRET,
    apiUrlRequest: process.env.API_URL_REQUEST || 'https://api.twitter.com/oauth',
  },
  production: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret:
      process.env.TWITTER_CLIENT_SECRET,
    apiUrlRequest: process.env.API_URL_REQUEST || 'https://api.twitter.com/oauth',
  },
  test: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret:
      process.env.TWITTER_CLIENT_SECRET,
    apiUrlRequest: process.env.API_URL_REQUEST || 'https://api.twitter.com/oauth',
  },
};

module.exports = twitterConfig;
