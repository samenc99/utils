import { AxiosRequestConfig } from 'axios';
import { ClassConstructor } from 'class-transformer';

export interface IBaseRequest<T> {
  url: string;
  token?: string;
  config?: AxiosRequestConfig;
  cls?: ClassConstructor<T>;
}

export interface IBaseInsertRequest<T> extends IBaseRequest<T> {
  data?: any;
}

export interface IBaseGetRequest<T, Q> extends IBaseRequest<T> {
  pagedEntity?: ClassConstructor<Q>;
}
