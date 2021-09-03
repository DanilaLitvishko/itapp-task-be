export interface SentryConfigAttributes {
  dsn: string;
  environment: string;
  debug: boolean;
}

export interface SentryConfig {
  development: SentryConfigAttributes;
  production: SentryConfigAttributes;
  test: SentryConfigAttributes;
}
