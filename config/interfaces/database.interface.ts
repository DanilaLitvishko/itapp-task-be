export interface DatabaseConfigAttributes {
  type: string;
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  seederStorage: string;
  logging: boolean;
  define: { underscored: boolean };
}

export interface DatabaseConfig {
  development: DatabaseConfigAttributes;
  production: DatabaseConfigAttributes;
  test: DatabaseConfigAttributes;
}
