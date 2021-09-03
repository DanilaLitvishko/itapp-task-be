export interface PubnubConfigAttributes {
  subscribeKey: string;
  publishKey: string;
}

export interface PubnubConfig {
  development: PubnubConfigAttributes;
  production: PubnubConfigAttributes;
  test: PubnubConfigAttributes;
}
