import * as dotenv from 'dotenv';

import { MailgunConfig } from 'config/interfaces/mailgun.interface';

dotenv.config();

const mailgunConfig: MailgunConfig = {
  development: {
    apiKey: process.env.MAILGUN_API_KEY,
    from: process.env.MAILGUN_FROM,
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST,
    testMode: true,
  },
  production: {
    apiKey: process.env.MAILGUN_API_KEY,
    from: process.env.MAILGUN_FROM,
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST,
    testMode: process.env.MAILGUN_TEST_MODE || false,
  },
  test: {
    apiKey: process.env.MAILGUN_API_KEY,
    from: process.env.MAILGUN_FROM,
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST,
    testMode: true,
  },
};

module.exports = mailgunConfig;
