import * as dotenv from 'dotenv';

import { FacebookConfig } from 'config/interfaces/facebook.interface';

dotenv.config();

const facebookConfig: FacebookConfig = {
  development: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  production: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
  test: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },
};

module.exports = facebookConfig;
