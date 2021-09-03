export interface ElasticSearchAttributes {
  url: string;
}

export interface ElasticSearchConfig {
  development: ElasticSearchAttributes;
  production: ElasticSearchAttributes;
  test: ElasticSearchAttributes;
}
