export interface MailgunConfigAttributes {
  apiKey: string;
  from: string;
  domain: string;
  host: string;
  testMode: string | boolean;
}

export interface MailgunConfig {
  development: MailgunConfigAttributes;
  production: MailgunConfigAttributes;
  test: MailgunConfigAttributes;
}
