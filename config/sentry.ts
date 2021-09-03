import { SentryConfig } from 'config/interfaces/sentry.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const defaultDsn = 'https://f8f3731900aa4e93affc21a56adfe19b@o404998.ingest.sentry.io/5269919';

const sentryConfig: SentryConfig = {
  development: {
    dsn: process.env.SENTRY_DSN || defaultDsn,
    environment: 'development',
    debug: true,
  },
  production: {
    dsn: process.env.SENTRY_DSN || defaultDsn,
    environment: 'production',
    debug: false,
  },
  test: {
    dsn: process.env.SENTRY_DSN || defaultDsn,
    environment: 'test',
    debug: true,
  },
};

module.exports = sentryConfig;
