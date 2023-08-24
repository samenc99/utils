import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AbstractApiException } from './abstract-api.exception';
import {
  IBaseGetRequest,
  IBaseInsertRequest,
  IBaseRequest,
} from './abstract-api.interface';
import { Paged } from '../../entity/paged';
import { TransformUtils } from '../../util/transform/transform.utils';

export abstract class ApiServiceAbstract {
  protected api: AxiosInstance;
  protected token?: string;

  protected constructor(
    baseURL: string,
    config?: AxiosRequestConfig,
    private exception = AbstractApiException,
  ) {
    this.api = axios.create({
      ...config,
      baseURL,
    });
  }

  protected async get<T, Q>({
    url,
    config,
    token = this.token,
    cls,
    pagedEntity,
  }: IBaseGetRequest<T, Q>): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.get(url, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      if (pagedEntity && cls) {
        const paged = TransformUtils.plainToInstance(
          cls,
          result.data,
        ) as Paged<Q>;
        paged.content = TransformUtils.plainToInstance(
          pagedEntity,
          result.data.content as [],
        );

        return {
          ...result,
          data: paged as T,
        };
      }

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err: any) {
      throw new this.exception(err.response.data, err.response.status);
    }
  }

  protected async post<T>({
    url,
    data,
    config,
    token = this.token,
    cls,
  }: IBaseInsertRequest<T>): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.post(url, data, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err: any) {
      throw new this.exception(err.response.data, err.response.status);
    }
  }

  protected async put<T>({
    url,
    data,
    config,
    token = this.token,
    cls,
  }: IBaseInsertRequest<T>): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.put(url, data, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err: any) {
      throw new this.exception(err.response.data, err.response.status);
    }
  }

  protected async delete<T>({
    url,
    config,
    token = this.token,
    cls,
  }: IBaseRequest<T>): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.delete(url, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err: any) {
      throw new this.exception(err.response.data, err.response.status);
    }
  }

  protected generateHeaders(token: string) {
    return {
      headers: {
        Authorization: 'Bearer ' + token.replace('Bearer ', ''),
      },
    };
  }

  setToken(token: string) {
    this.token = `Bearer ${token}`;
  }

  removeToken() {
    this.token = undefined;
  }
}
