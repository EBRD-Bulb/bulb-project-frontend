import { AxiosRequestConfig } from 'axios';

import { createRequestConfig } from 'shared/utils';
import { gitHubApiConfig } from 'shared/config';

const resourcesApiConfig = {
  ...gitHubApiConfig,
  // @ToDo: rename path to `resources`
  path: 'info',
};

export const getResourcesConfig = (): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: resourcesApiConfig.baseUrl,
    method: 'get',
    path: `${resourcesApiConfig.branch}/${resourcesApiConfig.path}`,
  });
};

export const getResourceFileConfig = (fileName: string): AxiosRequestConfig => {
  return createRequestConfig({
    baseUrl: resourcesApiConfig.baseUrl,
    method: 'get',
    path: `${resourcesApiConfig.branch}/${resourcesApiConfig.path}/${fileName}.md`,
  });
};