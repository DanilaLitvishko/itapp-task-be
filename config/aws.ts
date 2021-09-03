import * as dotenv from 'dotenv';

import { AWSConfig } from 'config/interfaces/aws.interface';

dotenv.config();

const awsConfig: AWSConfig = {
  development: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
    region:
      process.env.AWS_DEFAULT_REGION,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  },
  production: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
    region:
      process.env.AWS_DEFAULT_REGION,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  },
  test: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
    region:
      process.env.AWS_DEFAULT_REGION,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  },
};

module.exports = awsConfig;
