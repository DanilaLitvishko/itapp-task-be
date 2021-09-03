export interface TwitterConfigAttributes {
  consumerKey: string;
  consumerSecret: string;
  apiUrlRequest: string;
}

export interface TwitterConfig {
  development: TwitterConfigAttributes;
  production: TwitterConfigAttributes;
  test: TwitterConfigAttributes;
}
