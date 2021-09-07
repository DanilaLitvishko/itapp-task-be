/* eslint-disable no-console */
import { Client } from '@elastic/elasticsearch';

import configuration from 'config/configuration';
import { PingInterface } from 'src/modules/common/interfaces/elastic-search/elastic-search.interface';
import { ELASTIC_SEARCH_CLIENT_PROVIDER } from 'src/modules/common/constants/providers';

const config = configuration();

export const ESClient = (): any => {
  const client = new Client({ node: config.elasticSearch.url });
  const pingParams: PingInterface = {
    requestTimeout: 3000,
  };

  client.ping({}, pingParams, err => {
    if (err) {
      console.error('elastic search connection error: ', err.name);
    }
  });

  return client;
};

export const elasticSearchProviders = [
  {
    provide: ELASTIC_SEARCH_CLIENT_PROVIDER,
    useFactory: () => ESClient(),
  },
];
