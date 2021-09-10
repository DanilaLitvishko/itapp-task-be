// import * as AWS from 'aws-sdk';
// import { S3 } from 'aws-sdk';
// import { S3_PROVIDER } from 'src/modules/common/constants/providers';
// import configuration from 'config/configuration';

// const config = configuration();

// export const s3connect = async (): Promise<S3> => {
//   await AWS.config.update(config.aws);
//   const s3 = new AWS.S3();

//   return s3;
// };

// export const s3Providers = [
//   {
//     provide: S3_PROVIDER,
//     useFactory: async () => s3connect(),
//   },
// ];
