import * as dotenv from 'dotenv';

import { ElasticSearchConfig } from 'config/interfaces/elastic-search.interface';

dotenv.config();

const elasticSearchConfig: ElasticSearchConfig = {
  development: {
    url: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200',
  },
  production: {
    url: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200',
  },
  test: {
    url: process.env.ELASTIC_SEARCH_URL || 'http://localhost:9200',
  },
};

module.exports = elasticSearchConfig;
