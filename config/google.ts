import * as dotenv from 'dotenv';

import { GoogleConfig } from 'config/interfaces/google.interface';

dotenv.config();

const googleConfig: GoogleConfig = {
  development: {
    clientID:
      process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  production: {
    clientID:
      process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  test: {
    clientID:
      process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

module.exports = googleConfig;
