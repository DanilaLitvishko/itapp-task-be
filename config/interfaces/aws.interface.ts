export interface AWSConfigAttributes {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
}

export interface AWSConfig {
  development: AWSConfigAttributes;
  production: AWSConfigAttributes;
  test: AWSConfigAttributes;
}
