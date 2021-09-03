export interface GoogleConfigAttributes {
  clientID: string;
  clientSecret: string;
}

export interface GoogleConfig {
  development: GoogleConfigAttributes;
  production: GoogleConfigAttributes;
  test: GoogleConfigAttributes;
}
