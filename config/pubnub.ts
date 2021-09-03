import * as dotenv from 'dotenv';

import { PubnubConfig } from 'config/interfaces/pubnub.interface';

dotenv.config();

const pubnubConfig: PubnubConfig = {
  development: {
    subscribeKey:
      process.env.PUBNUB_SUBSCRIBE_KEY,
    publishKey:
      process.env.PUBNUB_PUBLISH_KEY,
  },
  production: {
    subscribeKey:
      process.env.PUBNUB_SUBSCRIBE_KEY,
    publishKey:
      process.env.PUBNUB_PUBLISH_KEY,
  },
  test: {
    subscribeKey:
      process.env.PUBNUB_SUBSCRIBE_KEY,
    publishKey:
      process.env.PUBNUB_PUBLISH_KEY,
  },
};

module.exports = pubnubConfig;
