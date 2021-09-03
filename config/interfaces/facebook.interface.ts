export interface FacebookConfigAttributes {
  clientID: string;
  clientSecret: string;
}

export interface FacebookConfig {
  development: FacebookConfigAttributes;
  production: FacebookConfigAttributes;
  test: FacebookConfigAttributes;
}
