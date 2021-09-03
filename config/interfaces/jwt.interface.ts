export interface JWTConfigAttributes {
  secret: string;
  expiresIn: string;
}

export interface JWTConfig {
  development: JWTConfigAttributes;
  production: JWTConfigAttributes;
  test: JWTConfigAttributes;
}
